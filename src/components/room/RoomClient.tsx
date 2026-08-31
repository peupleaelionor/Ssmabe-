"use client";

import * as React from "react";
import type { Room as LKRoom, RemoteTrack, RemoteParticipant, DataPacket_Kind } from "livekit-client";
import Link from "next/link";
import { BottomSheet } from "@/components/ds/BottomSheet";
import { SsmMark } from "@/components/brand/SsmMark";
import { haptic } from "@/lib/haptics";
import { analytics } from "@/lib/analytics";

type Conn = "connecting" | "connected" | "reconnecting" | "lost";
type MyRole = "listener" | "speaker" | "host";
type HandState = "idle" | "requested" | "approved" | "speaking";
type Phase = "onboarding" | "connecting" | "live" | "unavailable" | "left";

interface Pending { id: string; name: string }

type RoomData =
  | { t: "raise"; id: string; name: string }
  | { t: "approve"; id: string; token: string };

const PSEUDO_KEY = "ssmabe.pseudo";
const enc = new TextEncoder();
const dec = new TextDecoder();
const rand = () => Math.random().toString(36).slice(2, 8);

async function fetchToken(body: Record<string, unknown>) {
  const res = await fetch("/api/livekit/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: (await res.json()) as Record<string, unknown> };
}

/**
 * Room MVP vocal. Écoute d'abord (listener, sans micro), lève la main, parle
 * après acceptation de l'hôte. Permission micro JUST-IN-TIME. États en français
 * humain. Le titre/qui-parle passe avant les contrôles.
 */
export function RoomClient({ slug, title }: { slug: string; title: string }) {
  const wantHost = React.useMemo(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("host") === "1",
    []
  );

  const [phase, setPhase] = React.useState<Phase>("onboarding");
  const [pseudo, setPseudo] = React.useState("");
  const [draft, setDraft] = React.useState("");
  const [conn, setConn] = React.useState<Conn>("connecting");
  const [role, setRole] = React.useState<MyRole>(wantHost ? "host" : "listener");
  const [hand, setHand] = React.useState<HandState>("idle");
  const [micOn, setMicOn] = React.useState(false);
  const [micDenied, setMicDenied] = React.useState(false);
  const [speaking, setSpeaking] = React.useState<string | null>(null);
  const [hasRemoteAudio, setHasRemoteAudio] = React.useState(false);
  const [pending, setPending] = React.useState<Pending[]>([]);
  const [copied, setCopied] = React.useState(false);

  const roomRef = React.useRef<LKRoom | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const hostKeyRef = React.useRef<string | null>(null);
  const identityRef = React.useRef<string>("");
  const firstAudioRef = React.useRef(false);

  // Charge le pseudo existant ; si absent → onboarding sheet.
  React.useEffect(() => {
    analytics.roomView(slug); // t0 pour TIME TO FIRST VOICE
    let saved = "";
    try {
      saved = localStorage.getItem(PSEUDO_KEY) ?? "";
    } catch {
      /* ignore */
    }
    if (saved) {
      setPseudo(saved);
      setPhase("connecting");
    }
  }, [slug]);

  // Connexion dès qu'on a un pseudo.
  React.useEffect(() => {
    if (!pseudo || phase === "onboarding") return;
    let cancelled = false;
    const identity = `${pseudo}-${rand()}`;
    identityRef.current = identity;

    (async () => {
      const { status, data } = await fetchToken({
        roomName: slug,
        identity,
        displayName: pseudo,
        role: wantHost ? "host" : "listener",
      });
      if (cancelled) return;
      if (!data.ok) {
        // 503 = LiveKit pas encore configuré : état honnête, pas de faux live.
        setPhase("unavailable");
        return;
      }
      if (typeof data.key === "string") hostKeyRef.current = data.key;
      if (typeof data.role === "string") setRole(data.role as MyRole);
      await connectRoom(String(data.url), String(data.token));
    })();

    return () => {
      cancelled = true;
      roomRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pseudo, phase]);

  async function connectRoom(url: string, token: string) {
    const lk = await import("livekit-client");
    const { Room, RoomEvent, Track, ConnectionState } = lk;
    const room = new Room({ adaptiveStream: true, dynacast: true });
    roomRef.current = room;

    room.on(RoomEvent.ConnectionStateChanged, (state) => {
      if (state === ConnectionState.Connected) setConn("connected");
      else if (state === ConnectionState.Reconnecting) setConn("reconnecting");
      else if (state === ConnectionState.Connecting) setConn("connecting");
      else if (state === ConnectionState.Disconnected) setConn("lost");
    });

    room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
      if (track.kind === Track.Kind.Audio) {
        setHasRemoteAudio(true);
        if (audioRef.current) {
          track.attach(audioRef.current);
          audioRef.current.play().catch(() => {});
        }
        if (!firstAudioRef.current) {
          firstAudioRef.current = true;
          analytics.firstAudioReceived({ room: slug }); // inclut ttfv_ms
        }
      }
    });

    room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
      const remote = speakers.find((s) => s.identity !== identityRef.current);
      setSpeaking(remote ? remote.name || remote.identity : null);
    });

    const recomputeAudio = () => {
      const anyAudio = Array.from(room.remoteParticipants.values()).some((p: RemoteParticipant) =>
        Array.from(p.audioTrackPublications.values()).some((pub) => pub.isSubscribed)
      );
      setHasRemoteAudio(anyAudio);
    };
    room.on(RoomEvent.TrackUnsubscribed, recomputeAudio);
    room.on(RoomEvent.ParticipantDisconnected, recomputeAudio);

    room.on(RoomEvent.DataReceived, (payload: Uint8Array, _p, _k?: DataPacket_Kind) => {
      let msg: RoomData | null = null;
      try {
        msg = JSON.parse(dec.decode(payload)) as RoomData;
      } catch {
        return;
      }
      if (msg.t === "raise" && (roleRef.current === "host")) {
        setPending((prev) => (prev.some((x) => x.id === msg!.id) ? prev : [...prev, { id: msg!.id, name: msg!.name }]));
      } else if (msg.t === "approve" && msg.id === identityRef.current) {
        // Je suis promu speaker : je me reconnecte avec le token reçu.
        setHand("approved");
        void connectRoom(url, msg.token).then(() => {
          setRole("speaker");
        });
      }
    });

    await room.connect(url, token);
    setPhase("live");
    analytics.roomJoined({ room: slug, role: wantHost ? "host" : "listener" });
  }

  // Garde une réf du rôle pour les callbacks LiveKit.
  const roleRef = React.useRef<MyRole>(role);
  React.useEffect(() => {
    roleRef.current = role;
  }, [role]);

  function savePseudo() {
    const p = draft.trim().slice(0, 24);
    if (p.length < 2) return;
    try {
      localStorage.setItem(PSEUDO_KEY, p);
    } catch {
      /* ignore */
    }
    setPseudo(p);
    setPhase("connecting");
    haptic("tap");
  }

  async function raiseHand() {
    if (hand !== "idle" || !roomRef.current) return;
    setHand("requested");
    haptic("tap");
    analytics.speakerRequested();
    const payload = enc.encode(JSON.stringify({ t: "raise", id: identityRef.current, name: pseudo }));
    await roomRef.current.localParticipant.publishData(payload, { reliable: true });
  }

  async function approve(req: Pending) {
    if (!roomRef.current || !hostKeyRef.current) return;
    const { data } = await fetchToken({
      roomName: slug,
      identity: req.id,
      displayName: req.name,
      role: "speaker",
      key: hostKeyRef.current,
    });
    if (!data.ok || typeof data.token !== "string") return;
    const payload = enc.encode(JSON.stringify({ t: "approve", id: req.id, token: data.token }));
    await roomRef.current.localParticipant.publishData(payload, { reliable: true });
    setPending((prev) => prev.filter((x) => x.id !== req.id));
    haptic("success");
  }

  async function toggleMic() {
    const room = roomRef.current;
    if (!room) return;
    haptic("tap");
    if (!micOn) {
      try {
        await room.localParticipant.setMicrophoneEnabled(true); // permission JIT ici
        setMicOn(true);
        setMicDenied(false);
        setHand("speaking");
        analytics.speakerStarted();
      } catch {
        setMicDenied(true);
      }
    } else {
      await room.localParticipant.setMicrophoneEnabled(false);
      setMicOn(false);
    }
  }

  function leave() {
    analytics.roomLeft({ room: slug });
    roomRef.current?.disconnect();
    setPhase("left");
    haptic("tap");
  }

  async function share() {
    analytics.shareClicked({ where: "room" });
    const url = typeof window !== "undefined" ? `${window.location.origin}/r/${slug}` : "";
    const text = `On parle ici 🔊\n${title}\n${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
    } catch {
      /* annulé */
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  // ── Rendu ────────────────────────────────────────────────
  const connLabel: Record<Conn, string> = {
    connecting: "Connexion au direct…",
    connected: "",
    reconnecting: "Reconnexion…",
    lost: "Connexion perdue",
  };

  if (phase === "left") {
    return (
      <Shell title={title}>
        <p className="text-center text-lg font-semibold text-ivoire">Tu as quitté la conversation.</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link href={`/r/${slug}`} className="rounded-full bg-terra px-6 py-3.5 text-center text-sm font-semibold text-noir-abysse">Revenir</Link>
          <Link href="/" className="rounded-full border border-olive/25 px-6 py-3 text-center text-sm font-semibold text-gris-doux">Accueil</Link>
        </div>
      </Shell>
    );
  }

  if (phase === "unavailable") {
    return (
      <Shell title={title}>
        <p className="text-center text-lg font-semibold text-ivoire">Le direct n&apos;est pas encore ouvert.</p>
        <p className="mt-2 text-center text-sm text-gris-doux">
          Cette conversation n&apos;a pas encore démarré. Reviens un peu plus tard.
        </p>
        <Link href="/" className="mt-6 rounded-full border border-olive/25 px-6 py-3 text-center text-sm font-semibold text-gris-doux">Accueil</Link>
      </Shell>
    );
  }

  return (
    <Shell title={title}>
      {/* audio distant (invisible) */}
      <audio ref={audioRef} autoPlay playsInline className="hidden" />

      {/* SUJET → QUI PARLE → ÉCOUTER */}
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-olive/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
          {speaking ? (
            <span className="flex items-center gap-1.5 text-terra"><span className="h-2 w-2 animate-pulse rounded-full bg-terra" /> En direct</span>
          ) : (
            <span className="text-gris-doux">En écoute</span>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <span className="flex h-24 w-24 items-center justify-center rounded-full border border-olive/25 bg-vert-aura/15">
            <SsmMark size={44} />
          </span>
          <p className="text-xl font-semibold text-ivoire" aria-live="polite">
            {speaking ? `${speaking} parle` : hasRemoteAudio ? "Personne ne parle pour l'instant." : "Aucun son pour l'instant."}
          </p>
          {connLabel[conn] && <p className="text-sm text-gris-doux">{connLabel[conn]}</p>}
        </div>
      </div>

      {/* Demandes de parole (hôte) */}
      {role === "host" && pending.length > 0 && (
        <div className="mt-6 rounded-2xl border border-olive/20 bg-white/[0.03] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gris-doux">Demandes de parole</p>
          <ul className="flex flex-col gap-2">
            {pending.map((req) => (
              <li key={req.id} className="flex items-center justify-between gap-2">
                <span className="truncate text-sm text-ivoire">{req.name}</span>
                <button type="button" onClick={() => approve(req)} className="shrink-0 rounded-full bg-terra px-4 py-1.5 text-xs font-semibold text-noir-abysse">Accepter</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ACTION PRINCIPALE (pouce) */}
      <div className="mt-auto pt-8">
        {role === "listener" && (
          <button
            type="button"
            onClick={raiseHand}
            disabled={hand !== "idle"}
            className="w-full rounded-full bg-terra px-6 py-4 text-base font-semibold text-noir-abysse transition disabled:opacity-60"
          >
            {hand === "idle" ? "✋ Lever la main" : "Demande envoyée"}
          </button>
        )}

        {(role === "speaker" || role === "host") && (
          <button
            type="button"
            onClick={toggleMic}
            aria-pressed={micOn}
            aria-label={micOn ? "Micro ouvert, couper" : "Micro coupé, ouvrir"}
            className={
              "w-full rounded-full px-6 py-4 text-base font-bold transition " +
              (micOn ? "bg-terra text-noir-abysse" : "border-2 border-terra/60 text-ivoire")
            }
          >
            {micOn ? "🎙️ MICRO OUVERT — appuie pour couper" : "🔇 MICRO COUPÉ — appuie pour parler"}
          </button>
        )}

        {micDenied && (
          <p className="mt-2 text-center text-xs text-terra">Autorise le micro dans ton navigateur pour parler.</p>
        )}

        <div className="mt-3 flex items-center justify-center gap-3">
          <button type="button" onClick={share} className="rounded-full border border-olive/25 px-4 py-2 text-xs font-semibold text-gris-doux transition hover:text-ivoire">
            {copied ? "Lien copié ✓" : "Partager"}
          </button>
          <button type="button" onClick={leave} className="rounded-full border border-olive/25 px-4 py-2 text-xs font-semibold text-gris-doux transition hover:text-terra">
            Quitter
          </button>
        </div>
      </div>

      {/* Onboarding : pseudo */}
      <BottomSheet open={phase === "onboarding"} onClose={() => {}} title="Comment on t'appelle ?">
        <div className="mx-auto flex max-w-sm flex-col gap-3 pb-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && savePseudo()}
            placeholder="Ton pseudo"
            maxLength={24}
            autoFocus
            className="w-full rounded-xl border border-olive/25 bg-white/[0.04] px-4 py-3 text-center text-base text-ivoire placeholder:text-gris-doux/70 focus:outline-none focus:ring-2 focus:ring-terra/50"
          />
          <button type="button" onClick={savePseudo} className="w-full rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-noir-abysse">
            Entrer
          </button>
          <p className="text-center text-[11px] text-gris-doux/70">Aucun numéro, aucune photo. Juste un nom pour la conversation.</p>
        </div>
      </BottomSheet>
    </Shell>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main
      className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-noir-abysse px-5 pt-6 font-sans text-ivoire"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <header className="flex items-center gap-2 pb-2">
        <SsmMark tile size={28} />
        <h1 className="truncate font-display text-lg font-semibold text-ivoire">{title}</h1>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  );
}
