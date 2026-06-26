"use client";

import { motion } from "framer-motion";
import { VoiceWave } from "@/components/voice/voice-wave";
import { Button } from "@/components/ui/button";

const TRUST_POINTS = [
  "18+ uniquement",
  "Numéro protégé",
  "Double consentement",
  "Aucun contact forcé",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir via-vert-congo/10 to-noir pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vert-congo/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-vert-congo/20 border border-vert-congo/30 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="text-sm">🇨🇩</span>
          <span className="text-xs font-semibold text-vert-light tracking-wide uppercase">
            Téléchat vocal né au Congo
          </span>
        </motion.div>

        {/* Voice wave */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <VoiceWave active size="xl" color="#0F3D32" barCount={9} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-black text-blanc-chaud leading-tight mb-5 tracking-tight"
        >
          Rencontre par la voix.
          <br />
          <span className="text-cuivre">Numéro protégé.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base text-gris-texte mb-10 leading-relaxed"
        >
          Songi Songi Mabé est le téléchat vocal né au Congo. Appelle
          anonymement, parle sans pression, et continue seulement si le feeling
          passe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col gap-3 mb-8"
        >
          <a href="#beta">
            <Button size="xl" className="w-full text-base glow-pulse">
              Rejoindre la bêta
            </Button>
          </a>
          <a href="#how">
            <Button variant="outline" size="lg" className="w-full">
              Comment ça marche ?
            </Button>
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gris-texte"
        >
          {TRUST_POINTS.map((point, i) => (
            <span key={point} className="flex items-center gap-2">
              {i > 0 && <span className="text-gris-texte/40">·</span>}
              <span>{point}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gris-texte">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-gris-texte to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
