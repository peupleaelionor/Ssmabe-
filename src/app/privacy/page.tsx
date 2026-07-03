import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { SAFETY_PRINCIPLES, SAFETY_RULES_FORBIDDEN } from "@/config/safety";

export const metadata: Metadata = {
  title: "Confidentialité & sécurité",
  description: "Collecte minimale, numéro jamais affiché, contact après consentement. Sécurité & respect sur Songi Songi Mabé.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero title="Confidentialité" text="Version bêta — politique courte, honnête, sans jargon. La version juridique complète arrive à l'ouverture publique." />
      <div className="mx-auto max-w-2xl space-y-8 px-5 pb-16 text-sm leading-relaxed text-gris-doux">
        <section>
          <h2 className="font-display text-lg font-semibold text-ivoire">Ce qu'on collecte</h2>
          <p className="mt-2">Pour la bêta : prénom, email, pays, ville, langue, type de profil — et téléphone <strong className="text-ivoire">seulement si tu le donnes</strong>. Rien d'autre. Pas de trackers publicitaires.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ivoire">Ce qu'on n'en fait jamais</h2>
          <p className="mt-2">Vendre tes données. Afficher ton numéro publiquement. Transmettre ton contact sans ton accord explicite.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ivoire">Sécurité & respect</h2>
          <ul className="mt-2 space-y-1.5">
            {SAFETY_PRINCIPLES.map((p) => <li key={p}>✓ {p}</li>)}
          </ul>
          <ul className="mt-4 space-y-1.5">
            {SAFETY_RULES_FORBIDDEN.map((p) => <li key={p}>✕ {p}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ivoire">Tes droits</h2>
          <p className="mt-2">Accès, correction, suppression : écris à <a href="mailto:hello@songisongi.app" className="text-terra underline underline-offset-2">hello@songisongi.app</a> — on répond, y compris pendant la bêta.</p>
        </section>
      </div>
    </PageShell>
  );
}
