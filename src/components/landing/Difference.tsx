"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Comparaison subtile — ce qui rend Songi Songi différent, sans nommer personne. */
export function Difference() {
  return (
    <section id="difference" className="scroll-mt-20 border-y border-or-doux/10 bg-vert-nuit/40 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-serif text-3xl font-semibold text-ivoire sm:text-4xl"
        >
          {c.difference.title}
        </motion.h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {c.difference.points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="rounded-2xl border border-or-doux/20 bg-white/[0.035] p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-or-doux">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gris-doux">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
