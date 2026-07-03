"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Grille de fonctionnalités — compacte, 2 colonnes mobile, badge « bêta » sur le live. */
export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-or-doux/10 bg-vert-nuit/40 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.features.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            {c.features.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {c.features.items.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="relative rounded-2xl border border-or-doux/15 bg-white/[0.035] p-4"
            >
              {"live" in f && f.live ? (
                <span className="absolute right-3 top-3 rounded-full bg-or-doux/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-or-doux">
                  Bêta
                </span>
              ) : null}
              <span className="text-lg" aria-hidden>{f.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ivoire">{f.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gris-doux">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
