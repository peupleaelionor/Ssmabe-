"use client";

import { motion } from "framer-motion";

const DIFFERENCES = [
  {
    icon: "🎙",
    title: "Voix d'abord",
    description:
      "Pas de photos. Pas de profils filtrés. Juste la vraie personne, dans sa voix naturelle. C'est plus authentique que n'importe quelle appli photo.",
    highlight: true,
  },
  {
    icon: "🔒",
    title: "Numéro jamais partagé",
    description:
      "Contrairement à WhatsApp ou aux apps classiques, ton numéro ne passe jamais. Ni à la connexion, ni après. C'est une promesse technique.",
    highlight: false,
  },
  {
    icon: "🌍",
    title: "Congo d'abord",
    description:
      "Pensé pour Kinshasa, Brazzaville et la diaspora. Lingala natif, M-Pesa, Airtel Money. On comprend notre marché.",
    highlight: false,
  },
  {
    icon: "✂️",
    title: "Fin propre. Toujours.",
    description:
      "Le système de double consentement garantit qu'aucune info n'est échangée sans accord mutuel. Si une personne dit non, c'est non.",
    highlight: false,
  },
  {
    icon: "🛡️",
    title: "Sécurité intégrée",
    description:
      "Score de confiance, signalement en 1 tap, blocage immédiat, détection de scam. La modération est au cœur du produit.",
    highlight: false,
  },
  {
    icon: "⚡",
    title: "0 friction",
    description:
      "Pas de création de compte obligatoire pour commencer. Choisis un pseudo, ton pays, ta langue, et tu es dans l'appel en 30 secondes.",
    highlight: false,
  },
];

export function WhyDifferent() {
  return (
    <section className="py-20 px-4 bg-noir-light">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-blanc-chaud mb-3 tracking-tight">
            Pourquoi c&apos;est différent ?
          </h2>
          <p className="text-gris-texte text-sm leading-relaxed">
            Pas une autre appli de rencontre. Une expérience vocale pensée
            pour notre culture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {DIFFERENCES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`p-5 rounded-2xl border ${
                item.highlight
                  ? "border-vert-congo bg-vert-congo/10 shadow-congo-glow"
                  : "border-noir-border bg-noir-card"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    item.highlight ? "bg-vert-congo" : "bg-noir-light"
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-blanc-chaud mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gris-texte leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
