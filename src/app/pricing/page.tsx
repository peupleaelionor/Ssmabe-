import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { PLANS, EVENT_NOTE, PRICING_NOTE } from "@/config/pricing";
import { PricingTracker } from "@/components/mvp/PricingTracker";

export const metadata: Metadata = {
  title: "Offres — créateurs, assos & commerces",
  description: "Gratuit pour tous en bêta. Offres créateur, association et business local. Stripe Europe + mobile money Afrique à venir.",
};

export default function PricingPage() {
  return (
    <PageShell>
      <PricingTracker />
      <PageHero
        title="Pour les créateurs, les assos et les commerces."
        text="Rejoindre et participer est gratuit. Les espaces pro arrivent avec des outils dédiés."
      />
      <div className="mx-auto max-w-5xl px-5 pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.highlight ? "border-terra bg-terra/[0.06]" : "border-olive/20 bg-white/[0.035]"
              }`}
            >
              {plan.highlight ? (
                <span className="mb-2 w-fit rounded-full bg-terra px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-noir-abysse">
                  Populaire
                </span>
              ) : null}
              <h3 className="font-display text-lg font-bold text-ivoire">{plan.name}</h3>
              <p className="mt-1 text-xs text-gris-doux">{plan.audience}</p>
              <p className="mt-3">
                <span className="font-display text-2xl font-extrabold text-soleil">{plan.price}</span>
                {plan.period ? <span className="text-xs text-gris-doux"> {plan.period}</span> : null}
              </p>
              <ul className="mt-4 flex-1 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs leading-relaxed text-gris-doux">✓ {f}</li>
                ))}
              </ul>
              <Link
                href={plan.id === "gratuit" ? "/beta?source=pricing" : plan.id === "createur" ? "/beta?type=createur&source=pricing" : "/contact?source=pricing"}
                className={`mt-5 rounded-full px-5 py-2.5 text-center text-xs font-semibold transition ${
                  plan.highlight ? "bg-terra text-noir-abysse hover:bg-terra-dark" : "border border-olive/40 text-ivoire hover:border-terra/60 hover:text-terra"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-gris-doux">{EVENT_NOTE}</p>
        <p className="mt-2 text-center text-[11px] text-gris-doux/70">{PRICING_NOTE}</p>
      </div>
    </PageShell>
  );
}
