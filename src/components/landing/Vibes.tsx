import { getContent } from "@/content";

const c = getContent("fr");

/** Ambiances — la couche simple qui garde l'ADN téléchat. */
export function Vibes() {
  return (
    <section id="ambiances" className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Entrée simple</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ivoire sm:text-4xl">
            {c.vibes.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            {c.vibes.text}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.vibes.items.map((item) => (
            <article key={item.name} className="rounded-3xl border border-olive/15 bg-white/[0.035] p-5 transition hover:border-terra/45">
              <span className="text-2xl" aria-hidden>{item.emoji}</span>
              <h3 className="mt-3 text-base font-semibold text-ivoire">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gris-doux">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
