"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";
import { BrandMark } from "@/components/brand/BrandMark";
import { OrbitalGlobe, PremiumDivider, SoundWave } from "@/components/brand/TelechatAssets";
import { CallButton, CreateCircleButton, EnterSiteButton, WhatsAppButton } from "@/components/mvp/ContactOptions";

const c = getContent("fr");

/** Aperçu app compact — desktop uniquement (le mobile garde un hero ultra lisible). */
function PhonePreview() {
  return (
    <div
      aria-hidden
      className="animate-float hidden w-[250px] shrink-0 rounded-[2.35rem] border border-olive/25 bg-vert-nuit p-3 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.8)] lg:block"
    >
      <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-terra/20" />
      <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-vert-premium to-noir-abysse p-5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-terra">Téléchat moderne</p>
        <div className="my-5 flex flex-col items-center gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-olive/30 bg-vert-aura/30">
            <BrandMark size={38} />
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

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-5 sm:pb-16 sm:pt-32">
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-vert-aura/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-64 max-w-[560px] rounded-full bg-terra/8 blur-[90px]"
      />

      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
        >
          <div className="mb-6 flex max-w-full flex-wrap items-center justify-center gap-2 lg:justify-start">
            {c.hero.badges.map((b, i) => (
              <span
                key={b}
                className={
                  i === 0
                    ? "rounded-full border border-olive/30 bg-noir-abysse/40 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-terra shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:text-[11px]"
                    : "rounded-full border border-olive/20 bg-white/[0.035] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-olive sm:text-[11px]"
                }
              >
                {b}
              </span>
            ))}
          </div>

          <h1 className="max-w-[12ch] text-balance font-display text-[clamp(3.15rem,14vw,6rem)] font-semibold leading-[0.94] text-ivoire sm:max-w-[13ch] lg:max-w-none">
            {c.hero.title1}
            <br />
            <span className="text-terra">{c.hero.title2}</span>
          </h1>

          <p className="mt-5 max-w-[36rem] text-balance text-[1rem] leading-relaxed text-gris-doux sm:text-lg lg:max-w-lg">
            {c.hero.subtitle}
          </p>

          <SoundWave className="my-7 h-11 w-28" />

          <div className="grid w-full max-w-[31rem] gap-3 lg:pt-2">
            <CallButton label={c.hero.ctaCall} />
            <WhatsAppButton label={c.hero.ctaWhatsApp} />
            <EnterSiteButton label={c.hero.ctaEnter} />
            <CreateCircleButton label={c.hero.ctaCreate} />
          </div>

          <div className="mt-8 w-full max-w-[31rem]">
            <PremiumDivider label="Un espace fait pour toi" />
          </div>

          <div className="mt-6 grid w-full max-w-[31rem] grid-cols-2 gap-2 sm:grid-cols-4 lg:max-w-none">
            {c.hero.trustChips.map((chip) => (
              <span key={chip} className="rounded-2xl border border-olive/20 bg-white/[0.03] px-3 py-2 text-center text-[11px] leading-tight text-gris-doux">
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-[31rem] text-center text-[11px] leading-relaxed tracking-wide text-terra/90 lg:text-left">{c.hero.trust}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <PhonePreview />
        </motion.div>
      </div>
    </section>
  );
}
