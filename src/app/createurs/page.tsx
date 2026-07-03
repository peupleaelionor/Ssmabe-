import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { CREATORS } from "@/config/creators";
import { FLAGS } from "@/config/flags";

export const metadata: Metadata = {
  title: "Créateurs",
  description: "Ta voix peut devenir ton travail. Les créateurs lancent leurs espaces sur Songi Songi Mabé.",
};

export default function CreateursPage() {
  return (
    <PageShell>
      <PageHero
        title="Ta voix peut devenir ton travail."
        text="Musique, humour, cuisine, tech, transmission : les premiers créateurs préparent leurs espaces."
      />
      <div className="mx-auto max-w-5xl px-5 pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREATORS.map((cr) => (
            <div key={cr.id} className="flex items-center gap-4 rounded-2xl border border-olive/20 bg-white/[0.035] p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terra/70 to-olive/60 font-display text-lg font-bold text-ivoire">
                {cr.initial}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-display text-base font-bold text-ivoire">{cr.name}</h3>
                <p className="truncate text-xs text-gris-doux">{cr.role} · {cr.city}</p>
                <p className="mt-1 text-xs text-terra">👥 {cr.followers}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <span className="rounded-full border border-olive/25 px-6 py-3 text-sm text-gris-doux">
            {FLAGS.creatorSupportEnabled ? "Soutenir un créateur" : "💛 Soutien créateur bientôt disponible"}
          </span>
          <Link
            href="/beta?type=createur&source=creators-page"
            className="rounded-full bg-terra px-8 py-3 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark"
          >
            Rejoindre comme créateur →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
