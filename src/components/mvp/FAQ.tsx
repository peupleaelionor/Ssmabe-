import { getContent } from "@/content";

const c = getContent("fr");

/** FAQ accordéon natif (details/summary — zéro JS). */
export function FAQ() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <h2 className="text-center font-display text-2xl font-semibold text-ivoire sm:text-3xl">
        Questions fréquentes
      </h2>
      <div className="mt-8 space-y-3">
        {c.faq.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-olive/20 bg-white/[0.035] px-5 py-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-ivoire marker:content-none">
              <span className="mr-2 text-terra transition group-open:rotate-45 inline-block">+</span>
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-gris-doux">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
