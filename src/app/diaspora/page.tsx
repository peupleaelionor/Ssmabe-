import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { DIASPORA_MARKETS } from "@/config/markets";

export const metadata: Metadata = {
  title: "Diaspora",
  description: "France, Belgique, Canada, UK, USA : reste connecté à Kinshasa et à ta communauté, où que tu sois.",
};

export default function DiasporaPage() {
  return (
    <PageShell>
      <PageHero
        title="Le lien ne se coupe jamais."
        text="Tu vis à Paris, Bruxelles ou Montréal ? Ta communauté d'origine reste à portée de voix : nouvelles du pays, entraide, rencontres sérieuses, projets communs."
      />
      <div className="mx-auto max-w-3xl px-5 pb-16">
        <div className="grid gap-3 sm:grid-cols-2">
          {DIASPORA_MARKETS.map((m) => (
            <Link
              key={m.id}
              href={`/beta?type=diaspora&country=${encodeURIComponent(m.label)}&source=diaspora-page`}
              className="flex items-center justify-between rounded-2xl border border-olive/20 bg-white/[0.035] px-5 py-4 transition hover:border-terra/50"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl" aria-hidden>{m.flag}</span>
                <span className="font-display text-base font-semibold text-ivoire">Diaspora {m.label}</span>
              </span>
              <span className="text-sm text-terra">Rejoindre →</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gris-doux">
          Ta ville n&apos;est pas listée ? <Link href="/beta?type=diaspora&source=diaspora-page" className="text-terra underline underline-offset-2">Rejoins quand même</Link> — on ouvre selon la demande.
        </p>
      </div>
    </PageShell>
  );
}
