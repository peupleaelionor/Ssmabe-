import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/mvp/PageShell";

export const metadata: Metadata = {
  title: "Discussions & salons",
  description: "Des salons par ville et par thème : on s'écoute, on échange, on se respecte.",
};

const SALONS = [
  { name: "Kin la nuit 🌙", desc: "Le salon du soir : musique, débats, détente.", tag: "Kinshasa" },
  { name: "Business & opportunités", desc: "Idées, marchés, conseils entre entrepreneurs.", tag: "Entrepreneurs" },
  { name: "Nouvelles du pays", desc: "L'actualité locale racontée par ceux qui y sont.", tag: "Alertes" },
  { name: "Rencontres sérieuses 🕊", desc: "La voix d'abord, le contact après consentement.", tag: "18+" },
  { name: "Diaspora questions", desc: "Papiers, retours au pays, transferts, vie ailleurs.", tag: "Diaspora" },
  { name: "Studio créateurs", desc: "Feedback entre créateurs, collabs, lives à venir.", tag: "Créateurs" },
];

export default function DiscussionsPage() {
  return (
    <PageShell>
      <PageHero
        title="Des salons qui parlent vrai."
        text="Un salon = un espace de parole par ville ou par thème, modéré, respectueux. La voix y tient une place centrale : on s'écoute avant de s'écrire."
      />
      <div className="mx-auto max-w-4xl px-5 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SALONS.map((s) => (
            <div key={s.name} className="card-lift rounded-2xl border border-olive/20 bg-white/[0.035] p-5">
              <span className="rounded-full bg-terra/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-terra">{s.tag}</span>
              <h3 className="mt-3 font-display text-base font-bold text-ivoire">{s.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gris-doux">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/beta?goal=salon&source=discussions-page" className="rounded-full bg-terra px-8 py-3.5 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark">
            Créer un salon →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
