import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation de la bêta Songi Songi Mabé.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero title="Conditions d'utilisation" text="Version bêta — les règles essentielles, clairement. La version complète arrive à l'ouverture publique." />
      <div className="mx-auto max-w-2xl space-y-6 px-5 pb-16 text-sm leading-relaxed text-gris-doux">
        <p><strong className="text-ivoire">1. Le service.</strong> Songi Songi Mabé est en bêta : les fonctionnalités évoluent, certaines sont simulées ou limitées. On te prévient quand ça change.</p>
        <p><strong className="text-ivoire">2. Ton compte bêta.</strong> Une inscription = une personne réelle. Les espaces rencontre sont réservés aux 18 ans et plus.</p>
        <p><strong className="text-ivoire">3. Respect.</strong> Pas d'insulte, pas d'arnaque, pas de harcèlement, pas d'usurpation, pas de contenu illégal. Les comptes qui abusent sont retirés.</p>
        <p><strong className="text-ivoire">4. Ton numéro.</strong> Jamais affiché publiquement. Le contact ne s'échange qu'après consentement mutuel des deux personnes.</p>
        <p><strong className="text-ivoire">5. Gratuité bêta.</strong> La bêta est gratuite. Toute fonction payante future sera annoncée clairement avant activation.</p>
        <p><strong className="text-ivoire">6. Contact.</strong> Questions : <a href="mailto:hello@songisongi.app" className="text-terra underline underline-offset-2">hello@songisongi.app</a>.</p>
      </div>
    </PageShell>
  );
}
