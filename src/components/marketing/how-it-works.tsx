"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    icon: "🌍",
    title: "Choisis ton pays",
    description:
      "RDC, Congo-Brazzaville, France, Belgique, Canada… ta région te ressemble.",
  },
  {
    number: "02",
    icon: "🗣️",
    title: "Choisis ta langue",
    description:
      "Français, Lingala, Kikongo, Swahili, Tshiluba, Wolof, Créole.",
  },
  {
    number: "03",
    icon: "🎙",
    title: "Trouve une voix",
    description:
      "Une voix anonyme. Aucun numéro révélé. Tu parles, tu ressens, tu choisis.",
  },
  {
    number: "04",
    icon: "🤝",
    title: "Si les deux acceptent",
    description:
      "Le contact ne s'ouvre que si vous le voulez tous les deux.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-20 px-4 bg-noir-light">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-blanc-chaud mb-3 tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="text-gris-texte">Simple, sécurisé, pensé pour toi.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-vert-congo via-cuivre to-transparent" />

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="relative z-10 w-10 h-10 rounded-xl bg-vert-congo flex items-center justify-center shrink-0 shadow-congo-glow">
                  <span className="text-lg">{step.icon}</span>
                </div>
                <div className="pt-1 pb-4">
                  <div className="text-xs text-cuivre font-bold tracking-widest mb-1 uppercase">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-blanc-chaud mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gris-texte leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
