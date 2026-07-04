import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Tarifs — Songi Songi Mabé",
  description: "Modèle économique simple : gratuit pour rejoindre, payant pour organiser, créer, vendre et faire vivre une communauté.",
};

const plans = [
  {
    name: "Gratuit",
    price: "0 €",
    text: "Pour entrer, parler, écouter et rejoindre une première communauté.",
    items: ["Rejoindre la bêta", "Mode léger", "Appel / WhatsApp si configurés", "Numéro protégé"],
  },
  {
    name: "Créateur",
    price: "9,99 €/mois",
    text: "Pour artistes, animateurs, médias, podcasteurs, guides, coachs et voix publiques.",
    items: ["Profil créateur", "Cercle public", "Salon vocal futur", "Lien paiement futur"],
  },
  {
    name: "Association",
    price: "19 €/mois",
    text: "Pour diasporas, groupes étudiants, associations, communautés culturelles et entraide.",
    items: ["Cercle vérifié", "Annonces", "Membres", "QR code + page lite"],
  },
  {
    name: "Business local",
    price: "29 €/mois",
    text: "Pour commerces, événements, restaurants, salons, boutiques et services locaux.",
    items: ["Page business", "Annonces locales", "WhatsApp / appel", "Coupons et paiement futur"],
  },
];

const founderPacks = [
  { name: "Pack créateur fondateur", price: "49 €", text: "Préparer un profil et un cercle propre dès la première vague." },
  { name: "Pack communauté fondatrice", price: "99 €", text: "Configurer une association, diaspora, groupe, événement ou cercle local." },
  { name: "Pack business fondateur", price: "149 €", text: "Préparer une vitrine simple avec appel, WhatsApp, QR et page lite." },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />

      <section className="px-5 pb-12 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Financement autonome</p>
          <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.05] text-ivoire sm:text-6xl">
            Gratuit pour parler. Payant pour organiser.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gris-doux">
            Le public entre simplement. Les créateurs, associations, commerces et événements financent la plateforme en échange d’outils clairs, utiles et visibles.
          </p>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className="flex flex-col rounded-3xl border border-olive/15 bg-white/[0.035] p-5">
              <h2 className="font-display text-xl font-semibold text-ivoire">{plan.name}</h2>
              <p className="mt-2 text-2xl font-semibold text-terra">{plan.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-gris-doux">{plan.text}</p>
              <ul className="mt-5 space-y-2 text-sm text-gris-doux">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-terra">✓</span><span>{item}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-terra/20 bg-terra/10 p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Cash rapide sans perdre l’âme</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ivoire sm:text-4xl">Packs fondateurs</h2>
              <p className="mt-4 text-sm leading-relaxed text-gris-doux">
                Ces packs servent à financer la première version sans transformer la home en usine commerciale. La rencontre vocale reste le cœur ; les offres payantes restent dans une page dédiée.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {founderPacks.map((pack) => (
                <article key={pack.name} className="rounded-3xl border border-olive/15 bg-noir-abysse/50 p-5">
                  <h3 className="text-sm font-semibold text-ivoire">{pack.name}</h3>
                  <p className="mt-2 text-xl font-semibold text-terra">{pack.price}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gris-doux">{pack.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-semibold text-ivoire sm:text-4xl">Rester simple sur la home.</h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            Les paiements, statistiques, mobile money, commissions et événements sont importants, mais ils ne doivent pas dominer le premier écran. L’utilisateur vient pour parler. Les communautés paient pour organiser.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/beta?source=pricing" className="flex min-h-11 items-center justify-center rounded-full bg-terra px-7 py-3 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark">
              Rejoindre la bêta
            </Link>
            <Link href="/create" className="flex min-h-11 items-center justify-center rounded-full border border-olive/35 px-7 py-3 text-sm font-semibold text-ivoire transition hover:border-terra/60">
              Créer mon cercle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
