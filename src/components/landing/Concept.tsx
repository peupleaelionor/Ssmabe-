"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    icon: "🛡",
    title: "Numéro protégé",
    text: "Ton contact reste masqué jusqu'à accord mutuel.",
  },
  {
    icon: "🎙",
    title: "Rencontre vocale",
    text: "Tu découvres une présence avant une photo.",
  },
  {
    icon: "🤝",
    title: "Consentement mutuel",
    text: "Le contact n'avance que si les deux personnes sont d'accord.",
  },
];

export function Concept() {
  return (
    <section id="concept" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            Une voix avant l&apos;image.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            Songi Songi Mabé permet de rencontrer par la voix, sans afficher son
            numéro, sans pression et sans exposition immédiate.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-olive/20 bg-white/[0.035] p-6"
            >
              <span className="text-xl" aria-hidden>{c.icon}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ivoire">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gris-doux">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
