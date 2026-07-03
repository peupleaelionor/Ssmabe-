"use client";

import { motion } from "framer-motion";

const RULES = [
  { icon: "🔒", title: "Aucun numéro affiché" },
  { icon: "🤝", title: "Double consentement" },
  { icon: "🚩", title: "Signalement rapide" },
  { icon: "🔞", title: "18+ uniquement" },
];

export function Security() {
  return (
    <section id="security" className="scroll-mt-20 border-y border-olive/10 bg-vert-nuit/40 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            Protégé dès le départ.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            La rencontre commence sans exposition directe. Le contact avance
            seulement quand il y a accord.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {RULES.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-olive/20 bg-white/[0.035] px-3 py-6 text-center"
            >
              <span className="text-xl" aria-hidden>{r.icon}</span>
              <span className="text-xs font-medium leading-snug text-ivoire sm:text-sm">
                {r.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
