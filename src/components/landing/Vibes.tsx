import { getContent } from "@/content";
import { OrbitalGlobe, PremiumDivider, TelechatIcon } from "@/components/brand/TelechatAssets";

const c = getContent("fr");

/** Ambiances — la couche simple qui garde l'ADN téléchat. */
export function Vibes() {
  return (
    <section id="ambiances" className="px-4 py-14 sm:px-5 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Entrée simple</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-ivoire sm:text-4xl">
              {c.vibes.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
              {c.vibes.text}
            </p>
          </div>

          <article className="premium-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="relative z-10 max-w-[15rem]">
              <h3 className="font-display text-2xl font-semibold text-ivoire">Ambiances</h3>
              <p className="mt-2 text-sm leading-relaxed text-gris-doux">
                Des communautés vivantes par ville, intérêt ou culture.
              </p>
              <a href="/communautes" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-terra/50 px-5 py-2.5 text-sm font-semibold text-terra transition hover:bg-terra hover:text-noir-abysse">
                Explorer <span aria-hidden>›</span>
              </a>
            </div>
            <OrbitalGlobe className="absolute -bottom-8 -right-5 opacity-95 sm:-bottom-10 sm:right-4" />
          </article>
        </div>

        <div className="my-8 sm:my-10">
          <PremiumDivider label="Choisis ton énergie" />
        </div>

        <div className="grid gap-3 min-[380px]:grid-cols-2 lg:grid-cols-4">
          {c.vibes.items.map((item, index) => {
            const icons = ["web", "circle", "globe", "language", "shield", "wave", "lock", "call"] as const;
            return (
              <article key={item.name} className="rounded-[1.6rem] border border-olive/15 bg-white/[0.035] p-4 transition hover:border-terra/45 sm:p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] text-terra" aria-hidden>
                  <TelechatIcon name={icons[index % icons.length]} />
                </span>
                <h3 className="mt-3 text-base font-semibold text-ivoire">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gris-doux">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
