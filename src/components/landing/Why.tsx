"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Pourquoi ça existe : problème / réponse, deux cartes face à face. */
export function Why() {
  const blocks = [
    { ...c.why.problem, accent: "border-cuivre/30", chip: "text-cuivre" },
    { ...c.why.solution, accent: "border-or-doux/30", chip: "text-or-doux" },
  ];

  return (
    <section id="vision" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-serif text-3xl font-semibold text-ivoire sm:text-4xl"
        >
          {c.why.title}
        </motion.h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`rounded-2xl border ${b.accent} bg-white/[0.035] p-6 sm:p-7`}
            >
              <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${b.chip}`}>
                {b.title}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ivoire/90 sm:text-base">
                {b.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
