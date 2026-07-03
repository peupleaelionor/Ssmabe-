import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "À propos",
  description: "Songi Songi Mabé : une plateforme sociale communautaire née à Kinshasa, pensée pour toutes les communautés.",
};

export default function AProposPage() {
  return (
    <PageShell>
      <PageHero title="Né à Kinshasa. Pensé pour toutes les communautés." />
      <div className="mx-auto max-w-2xl space-y-6 px-5 pb-16 text-sm leading-relaxed text-gris-doux sm:text-base">
        <div className="flex justify-center"><Logo variant="stacked" withSlogan /></div>
        <p>
          Songi Songi Mabé est une plateforme sociale communautaire. Elle est née d&apos;un constat simple :
          les voix africaines sont dispersées sur des plateformes qui ne leur appartiennent pas — et pour se
          rencontrer, il faut trop souvent donner son numéro à des inconnus.
        </p>
        <p>
          On a choisi de construire autrement. Ici, la communauté passe d&apos;abord : ta ville, ta diaspora,
          tes créateurs, ton marché local. Et quand deux personnes veulent se parler, la <strong className="text-ivoire">voix vient
          d&apos;abord</strong> — le contact ne s&apos;échange qu&apos;après un consentement mutuel.
        </p>
        <p>
          Le cœur bat à Kinshasa. Les ondes portent jusqu&apos;à Bruxelles, Paris et Montréal — et au-delà.
          La plateforme est souveraine par conception : données minimales, modération responsable, paiement
          local à venir, langues africaines en première classe.
        </p>
        <p className="text-terra">La voix locale. La communauté mondiale.</p>
      </div>
    </PageShell>
  );
}
