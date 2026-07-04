import { Suspense } from "react";
import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { BetaFormPro } from "@/components/mvp/BetaFormPro";
import { WaitlistCounter } from "@/components/mvp/WaitlistCounter";
import { FAQ } from "@/components/mvp/FAQ";

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
        <Suspense fallback={<p className="text-center text-sm text-gris-doux">Chargement du formulaire…</p>}>
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
