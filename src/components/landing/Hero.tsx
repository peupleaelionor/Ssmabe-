"use client";

import { motion } from "framer-motion";
import { useContent } from "@/content/provider";
import { SsmMark } from "@/components/brand/SsmMark";
import { OrbitalGlobe, SoundWave } from "@/components/brand/TelechatAssets";
import { EnterSiteButton } from "@/components/mvp/ContactOptions";

/** Aperçu app compact — desktop uniquement, calme (sans flottement). */
function PhonePreview() {
  return (
    <div
      aria-hidden
      className="hidden w-[250px] shrink-0 rounded-[2.35rem] border border-olive/20 bg-vert-nuit p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] lg:block"
    >
      <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-terra/20" />
      <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-vert-premium to-noir-abysse p-5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-terra">Songi Songi Mabé</p>
        <div className="my-5 flex flex-col items-center gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-olive/25 bg-vert-aura/25">
            <SsmMark tile size={38} />
          </span>
          <p className="text-sm font-semibold text-ivoire">Voix protégée</p>
          <p className="text-[11px] text-gris-doux">Numéro masqué · consentement</p>
        </div>
        <SoundWave className="mx-auto h-10 w-24" />
        <div className="mt-5 rounded-3xl border border-olive/15 bg-white/[0.03] p-3">
          <OrbitalGlobe className="mx-auto h-28 w-28" />
        </div>
      </div>
    </div>
  );
}

/**
 * Hero — UNE seule action dominante.
 * Répond en quelques secondes : c'est quoi (Entre. Écoute. Parle.),
 * et comment j'entre ([ Entrer ]). Numéro privé rassure. Rien d'autre.
 */
export function Hero() {
  const c = useContent();
  return (
    <section id="top" className="hero-vignette relative overflow-hidden px-4 pb-16 pt-28 sm:px-5 sm:pb-24 sm:pt-36">
      <div
        aria-hidden
        className="ds-blur pointer-events-none absolute left-1/2 top-[-12%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-vert-aura/8 blur-[150px]"
      />

      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-olive/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-terra">
            <SsmMark size={18} /> Songi Songi Mabé
          </span>

          <h1 className="max-w-[14ch] text-balance font-display text-[clamp(3rem,12vw,5.25rem)] font-semibold leading-[0.97] tracking-[-0.02em] text-ivoire">
            {c.hero.title1}
            <br />
            <span className="text-terra">{c.hero.title2}</span>
          </h1>

          <p className="mt-5 max-w-[30rem] text-balance text-[1.05rem] leading-relaxed text-gris-doux sm:text-lg">
            {c.hero.subtitle}
          </p>

          <div className="mt-9 w-full max-w-[24rem]">
            <EnterSiteButton label={c.hero.ctaEnter} />
          </div>

          <p className="mt-5 max-w-[30rem] text-[11px] leading-relaxed tracking-wide text-gris-doux/80">
            {c.hero.trust}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <PhonePreview />
        </motion.div>
      </div>
    </section>
  );
}
