"use client";

import { motion } from "framer-motion";

const CONCEPT_BADGES = [
  { icon: "🕶️", label: "Anonyme" },
  { icon: "🔒", label: "Numéro protégé" },
  { icon: "🌍", label: "Congo + diaspora" },
  { icon: "🕊️", label: "Sans pression" },
];

export function Concept() {
  return (
    <section id="concept" className="py-20 px-4">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-cuivre/20 border border-cuivre/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-bold text-cuivre uppercase tracking-wide">
              Le concept
            </span>
          </div>
          <h2 className="text-3xl font-black text-blanc-chaud mb-4 tracking-tight">
            La voix d&apos;abord.
            <br />
            <span className="text-cuivre">Le contact après.</span>
          </h2>
          <p className="text-gris-texte text-sm leading-relaxed mb-8">
            Pas de swipe. Pas de pression. Juste une voix. Songi Songi Mabé
            remet l&apos;écoute et l&apos;authenticité au cœur de la rencontre —
            anonyme, sécurisée, profondément humaine.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {CONCEPT_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-noir-card border border-noir-border"
            >
              <span className="text-lg">{badge.icon}</span>
              <span className="text-sm font-semibold text-blanc-chaud">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
