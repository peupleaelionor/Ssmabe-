import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { getVoiceProviderStatus } from "@/lib/voice/provider";

export const metadata: Metadata = {
  title: "Voice readiness — Songi Songi Mabé",
  description: "Vérification interne des providers voix LiveKit et Agora.",
};

export default function VoiceReadinessPage() {
  const voice = getVoiceProviderStatus();

  const rows = [
    { label: "Provider actif", value: voice.activeProvider },
    { label: "Provider préféré", value: voice.preferredProvider },
    { label: "LiveKit configuré", value: voice.livekit.configured ? "oui" : "non" },
    { label: "LiveKit URL", value: voice.livekit.url ?? "absente" },
    { label: "Agora configuré", value: voice.agora.configured ? "oui" : "non" },
    { label: "Agora App ID", value: voice.agora.appId ? "présent" : "absent" },
    { label: "Agora token sécurisé", value: voice.agora.secureTokenConfigured ? "oui" : "non" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />
      <section className="px-4 pb-16 pt-28 sm:px-5 sm:pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Interne</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold text-ivoire sm:text-6xl">
            Voice readiness
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gris-doux sm:text-base">
            Cette page confirme que les variables LiveKit / Agora sont détectées côté serveur, sans révéler les secrets.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.label} className="rounded-3xl border border-olive/15 bg-white/[0.035] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gris-doux">{row.label}</p>
                <p className="mt-2 break-words font-semibold text-ivoire">{row.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-terra/20 bg-terra/10 p-5 sm:p-6">
            <h2 className="font-display text-2xl font-semibold text-ivoire">Routes API prêtes</h2>
            <div className="mt-4 grid gap-3 text-sm text-gris-doux sm:grid-cols-3">
              <code className="rounded-2xl border border-olive/15 bg-noir-abysse/60 p-3">GET /api/voice/config</code>
              <code className="rounded-2xl border border-olive/15 bg-noir-abysse/60 p-3">POST /api/livekit/token</code>
              <code className="rounded-2xl border border-olive/15 bg-noir-abysse/60 p-3">POST /api/agora/token</code>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
