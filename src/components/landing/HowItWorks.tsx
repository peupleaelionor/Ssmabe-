"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-olive/10 bg-vert-nuit/40 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-3xl font-semibold leading-snug text-ivoire sm:text-4xl"
        >
          {c.how.title}
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-gris-doux sm:text-base">
          {c.how.intro}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {c.how.steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex gap-4 card-lift rounded-2xl border border-olive/20 bg-white/[0.035] p-5"
            >
              <span className="font-display text-xl font-semibold text-terra/90">
                {s.num}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ivoire">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gris-doux">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
