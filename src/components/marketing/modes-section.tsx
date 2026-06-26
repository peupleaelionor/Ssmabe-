"use client";

import { motion } from "framer-motion";

type ModeCard = {
  icon: string;
  title: string;
  tagline: string;
  safety?: string;
};

const MODE_CARDS: ModeCard[] = [
  {
    icon: "🏙️",
    title: "Mode Mboka",
    tagline: "Les voix de ta ville. Même cité, même vibration.",
  },
  {
    icon: "🎵",
    title: "Mode Lingala",
    tagline: "La culture congo dans le cœur. On parle, on rit, on vit.",
  },
  {
    icon: "✈️",
    title: "Mode Diaspora",
    tagline: "Un pont entre la diaspora et la patrie, en un appel.",
  },
  {
    icon: "💍",
    title: "Mode Sérieux",
    tagline: "Intentions claires, voix qui respectent. Pas de jeu.",
    safety: "Sécurité renforcée",
  },
  {
    icon: "🕊️",
    title: "Mode Respect",
    tagline: "On prend le temps. Écoute active, zéro pression.",
    safety: "Anti-harcèlement",
  },
  {
    icon: "🌍",
    title: "Mode Monde",
    tagline: "Découvre d'autres pays. Pas de frontières, juste des humains.",
  },
  {
    icon: "🌙",
    title: "Mode Nuit",
    tagline: "Les vraies conversations naissent la nuit. 21h–5h.",
    safety: "Sécurité nocturne",
  },
];

export function ModesSection() {
  return (
    <section id="modes" className="py-20 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-vert-congo/20 border border-vert-congo/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-bold text-vert-light uppercase tracking-wide">
              Les ambiances
            </span>
          </div>
          <h2 className="text-3xl font-black text-blanc-chaud mb-3 tracking-tight">
            Choisis ton ambiance.
          </h2>
          <p className="text-gris-texte text-sm leading-relaxed">
            Chaque mode change le ton de la rencontre. Tu choisis le feeling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {MODE_CARDS.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-noir-card border border-noir-border hover:border-vert-congo/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-noir-light flex items-center justify-center text-xl shrink-0">
                {mode.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h3 className="font-bold text-blanc-chaud">{mode.title}</h3>
                  {mode.safety && (
                    <span className="text-[10px] font-semibold text-cuivre bg-cuivre/15 border border-cuivre/30 rounded-full px-2 py-0.5">
                      🛡️ {mode.safety}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gris-texte leading-relaxed">
                  {mode.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
