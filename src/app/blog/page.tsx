import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/mvp/PageShell";

export const metadata: Metadata = {
  title: "Blog",
  description: "Nouvelles de la plateforme, histoires de communautés, coulisses de la construction.",
};

const POSTS = [
  { title: "Pourquoi on commence par la voix", date: "Bientôt", excerpt: "La photo triche, la voix beaucoup moins. Le raisonnement produit derrière notre choix fondateur." },
  { title: "Kinshasa d'abord : notre stratégie de lancement", date: "Bientôt", excerpt: "Une ville à la fois, une communauté à la fois. Comment on ouvre la bêta." },
];

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero title="Le journal de bord" text="Les premiers articles arrivent avec la bêta. Voici ce qu'on prépare." />
      <div className="mx-auto max-w-2xl space-y-4 px-5 pb-16">
        {POSTS.map((p) => (
          <article key={p.title} className="card-lift rounded-2xl border border-olive/20 bg-white/[0.035] p-6">
            <p className="text-[11px] uppercase tracking-wide text-terra">{p.date}</p>
            <h2 className="mt-1 font-display text-lg font-bold text-ivoire">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gris-doux">{p.excerpt}</p>
          </article>
        ))}
        <p className="pt-4 text-center text-sm text-gris-doux">
          Pour ne rien rater : <Link href="/beta?source=blog" className="text-terra underline underline-offset-2">rejoins la bêta</Link>.
        </p>
      </div>
    </PageShell>
  );
}
