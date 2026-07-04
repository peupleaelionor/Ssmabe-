"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Souveraineté & confiance : données, numéro, langue, argent — 6 points. */
export function Sovereignty() {
  return (
    <section id="souverainete" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.sovereignty.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            {c.sovereignty.text}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.sovereignty.points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="flex gap-3.5 card-lift rounded-2xl border border-olive/15 bg-white/[0.035] p-5"
            >
              <span className="text-lg" aria-hidden>{p.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-ivoire">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gris-doux">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
