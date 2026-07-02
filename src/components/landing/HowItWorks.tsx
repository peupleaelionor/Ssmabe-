"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Choisis ton pays",
    text: "Congo, France, Belgique, Canada… ton point de départ te ressemble.",
  },
  {
    num: "02",
    title: "Choisis ta langue",
    text: "Français, Lingala et autres langues pour parler naturellement.",
  },
  {
    num: "03",
    title: "Trouve une voix",
    text: "Tu écoutes, tu ressens, tu choisis sans pression.",
  },
  {
    num: "04",
    title: "Contact après accord",
    text: "Le numéro reste protégé jusqu'au consentement mutuel.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-or-doux/10 bg-vert-nuit/40 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-serif text-3xl font-semibold leading-snug text-ivoire sm:text-4xl"
        >
          Quatre gestes.
          <br className="sm:hidden" /> Une rencontre vraie.
        </motion.h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-or-doux/20 bg-white/[0.035] p-5"
            >
              <span className="font-serif text-xl font-semibold text-or-doux/90">
                {s.num}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-ivoire">
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
