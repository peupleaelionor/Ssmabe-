import { Suspense } from "react";
import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { BetaFormPro } from "@/components/mvp/BetaFormPro";
import { WaitlistCounter } from "@/components/mvp/WaitlistCounter";
import { FAQ } from "@/components/mvp/FAQ";
import { BetaFormSkeleton } from "@/components/mvp/Skeleton";

export const metadata: Metadata = {
  title: "Rejoindre la bêta",
  description: "Entre dans la première vague de Songi Songi Mabé. Numéro optionnel, jamais affiché publiquement.",
};

export default function BetaPage() {
  return (
    <PageShell>
      <PageHero
        title="Entre dans la première vague."
        text="Une minute pour t'inscrire. Les premiers testeurs façonnent la plateforme avec nous."
      />
      <div className="mx-auto max-w-xl px-5">
        <WaitlistCounter className="mb-6 text-center text-sm" />

        {/* Fallback no-JS : formulaire natif POST + accès mode léger */}
        <noscript>
          <form
            action="/api/waitlist"
            method="POST"
            className="flex flex-col gap-3 rounded-2xl border border-olive/20 bg-white/[0.035] p-5"
          >
            <p className="text-sm text-gris-doux">
              JavaScript est désactivé. Formulaire simplifié — ou utilise le{" "}
              <a href="/lite" className="text-terra underline">mode léger</a> (appel / WhatsApp).
            </p>
            <input name="firstName" placeholder="Prénom *" required
              className="rounded-xl border border-olive/25 bg-noir-abysse px-4 py-3 text-sm text-ivoire" />
            <input name="email" type="email" placeholder="Email *" required
              className="rounded-xl border border-olive/25 bg-noir-abysse px-4 py-3 text-sm text-ivoire" />
            <input name="country" placeholder="Pays *" required
              className="rounded-xl border border-olive/25 bg-noir-abysse px-4 py-3 text-sm text-ivoire" />
            <input name="language" placeholder="Langue *" required defaultValue="fr"
              className="rounded-xl border border-olive/25 bg-noir-abysse px-4 py-3 text-sm text-ivoire" />
            <input name="profileType" placeholder="Profil *" required defaultValue="autre"
              className="rounded-xl border border-olive/25 bg-noir-abysse px-4 py-3 text-sm text-ivoire" />
            <input type="hidden" name="source" value="web-nojs" />
            <label className="flex items-center gap-2 text-xs text-gris-doux">
              <input type="checkbox" name="consent" value="true" required /> J&apos;accepte d&apos;être contacté pour la bêta.
            </label>
            <button type="submit" className="rounded-full bg-terra px-6 py-3 text-sm font-semibold text-noir-abysse">
              Rejoindre la bêta
            </button>
          </form>
        </noscript>

        <Suspense fallback={<BetaFormSkeleton />}>
          <BetaFormPro />
        </Suspense>
        <p className="mt-6 text-center text-xs text-gris-doux">
          🔒 Sécurité : numéro jamais affiché publiquement · contact après consentement mutuel · 18+ pour les espaces rencontre.
        </p>
      </div>
      <FAQ />
    </PageShell>
  );
}
