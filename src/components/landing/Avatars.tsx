"use client";

import { motion } from "framer-motion";

/**
 * Cartes avatars harmonisées : pas d'images IA hétérogènes —
 * médaillons typographiques or/vert, même format, même bordure.
 */
const AVATARS = [
  {
    initial: "M",
    name: "Mabé",
    text: "Aura vocale protégée.",
    ring: "from-vert-aura/60 to-vert-premium",
  },
  {
    initial: "D",
    name: "Diaspora",
    text: "Présence calme et élégante.",
    ring: "from-or-doux/40 to-vert-premium",
  },
  {
    initial: "L",
    name: "Légendaire",
    text: "Icône vocale premium.",
    ring: "from-or-doux/70 to-or-sombre/40",
  },
];

export function Avatars() {
  return (
    <section id="avatars" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
            Ton avatar parle pour toi.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            Choisis une présence vocale&nbsp;: discrète, élégante, drôle,
            mystérieuse ou légendaire.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {AVATARS.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col items-center rounded-2xl border border-or-doux/20 bg-white/[0.035] p-7 text-center"
            >
              <span
                className={`flex h-20 w-20 items-center justify-center rounded-full border border-or-doux/30 bg-gradient-to-br ${a.ring}`}
              >
                <span className="font-serif text-2xl font-semibold text-ivoire">
                  {a.initial}
                </span>
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-ivoire">
                {a.name}
              </h3>
              <p className="mt-1.5 text-sm text-gris-doux">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
