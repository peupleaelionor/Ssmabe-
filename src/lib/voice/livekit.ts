import { createHmac } from "crypto";
import { normalizeIdentity, normalizeRoomName, voiceEnv } from "./env";

function base64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function signJwt(payload: Record<string, unknown>, secret: string) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = createHmac("sha256", secret).update(data).digest();
  return `${data}.${base64Url(signature)}`;
}

export type VoiceRole = "host" | "speaker" | "listener";

export type LiveKitTokenRequest = {
  roomName?: string | null;
  identity?: string | null;
  displayName?: string | null;
  role?: VoiceRole | null;
  metadata?: Record<string, unknown> | null;
};

/**
 * Permissions MINIMALES par rôle (core loop) :
 * - listener : entre MUET, écoute seulement. Peut envoyer des messages data
 *   (lever la main). Ne peut pas publier d'audio tant qu'il n'est pas promu.
 * - speaker  : peut publier de l'audio.
 * - host     : speaker + roomAdmin (mute/retirer les autres).
 * Défaut = listener (le plus sûr : on entre sans pouvoir parler).
 */
const ROLE_GRANTS: Record<VoiceRole, Record<string, boolean>> = {
  listener: { canPublish: false, canSubscribe: true, canPublishData: true },
  speaker: { canPublish: true, canSubscribe: true, canPublishData: true },
  host: { canPublish: true, canSubscribe: true, canPublishData: true, roomAdmin: true },
};

function resolveRole(role?: VoiceRole | null): VoiceRole {
  return role === "host" || role === "speaker" || role === "listener" ? role : "listener";
}

export function createLiveKitToken(input: LiveKitTokenRequest) {
  const { apiKey, apiSecret, publicUrl } = voiceEnv.livekit;

  if (!apiKey || !apiSecret || !publicUrl) {
    throw new Error("LIVEKIT_NOT_CONFIGURED");
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 60 * 60;
  const roomName = normalizeRoomName(input.roomName);
  const identity = normalizeIdentity(input.identity);
  const role = resolveRole(input.role);

  const payload = {
    iss: apiKey,
    sub: identity,
    name: input.displayName?.slice(0, 80) || identity,
    nbf: now - 10,
    exp: now + expiresIn,
    metadata: JSON.stringify({
      app: "ssmabe",
      source: "web",
      role,
      ...(input.metadata ?? {}),
    }),
    video: {
      room: roomName,
      roomJoin: true,
      ...ROLE_GRANTS[role],
    },
  };

  return {
    provider: "livekit" as const,
    url: publicUrl,
    roomName,
    identity,
    role,
    token: signJwt(payload, apiSecret),
    expiresAt: new Date((now + expiresIn) * 1000).toISOString(),
  };
}
