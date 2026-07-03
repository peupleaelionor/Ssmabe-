"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** RDC-first : villes du cœur + relais diaspora, en chips sobres. */
export function RdcFirst() {
  return (
    <section id="rdc" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.rdc.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">{c.rdc.text}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-olive/20 bg-white/[0.035] p-6 sm:p-8"
        >
          {/* Villes cœur */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {c.rdc.cities.map((city, i) => (
              <span
                key={city}
                className={
                  i === 0
                    ? "rounded-full bg-terra px-4 py-1.5 text-xs font-semibold text-noir-abysse"
                    : "rounded-full border border-olive/25 px-4 py-1.5 text-xs font-medium text-ivoire"
                }
              >
                {city}
              </span>
            ))}
          </div>

          {/* Ligne signal vers la diaspora */}
          <div className="mx-auto my-6 flex max-w-xs items-center gap-2" aria-hidden>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-olive/40 to-or-doux/40" />
            <span className="text-xs text-terra">✈</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-olive/40 to-or-doux/40" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gris-doux">
              {c.rdc.diasporaLabel}
            </span>
            {c.rdc.diaspora.map((d) => (
              <span
                key={d}
                className="rounded-full border border-cuivre/30 px-4 py-1.5 text-xs font-medium text-ivoire"
              >
                {d}
              </span>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gris-doux">{c.rdc.next}</p>
        </motion.div>
      </div>
    </section>
  );
}
