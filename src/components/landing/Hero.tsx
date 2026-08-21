"use client";

import { motion } from "framer-motion";
import { useContent } from "@/content/provider";
import { SsmMark } from "@/components/brand/SsmMark";
import { OrbitalGlobe, SoundWave } from "@/components/brand/TelechatAssets";
import { CallButton, CreateCircleButton, EnterSiteButton, WhatsAppButton } from "@/components/mvp/ContactOptions";


/** Aperçu app compact — desktop uniquement, calme (sans flottement). */
function PhonePreview() {
  return (
    <div
      aria-hidden
      className="hidden w-[250px] shrink-0 rounded-[2.35rem] border border-olive/20 bg-vert-nuit p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] lg:block"
    >
      <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-terra/20" />
      <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-vert-premium to-noir-abysse p-5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-terra">Téléchat moderne</p>
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

export function Hero() {
  const c = useContent();
  return (
    <section id="top" className="hero-vignette relative overflow-hidden px-4 pb-16 pt-24 sm:px-5 sm:pb-24 sm:pt-32">
      {/* Un seul halo, très doux et immobile — sobriété premium. */}
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
          <div className="mb-7 flex max-w-full flex-wrap items-center justify-center gap-2 lg:justify-start">
            {c.hero.badges.map((b, i) => (
              <span
                key={b}
                className={
                  i === 0
                    ? "rounded-full border border-olive/25 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-terra sm:text-[11px]"
                    : "rounded-full border border-olive/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-olive sm:text-[11px]"
                }
              >
                {b}
              </span>
            ))}
          </div>

          <h1 className="max-w-[12ch] text-balance font-display text-[clamp(3rem,12vw,5.25rem)] font-semibold leading-[0.97] tracking-[-0.02em] text-ivoire sm:max-w-[13ch] lg:max-w-none">
            {c.hero.title1}
            <br />
            <span className="text-terra">{c.hero.title2}</span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-balance text-[1.02rem] leading-relaxed text-gris-doux sm:text-lg lg:max-w-lg">
            {c.hero.subtitle}
          </p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            className="mt-10 grid w-full max-w-[31rem] gap-3"
          >
            {[
              <CallButton key="call" label={c.hero.ctaCall} />,
              <WhatsAppButton key="wa" label={c.hero.ctaWhatsApp} />,
              <EnterSiteButton key="web" label={c.hero.ctaEnter} />,
              <CreateCircleButton key="create" label={c.hero.ctaCreate} />,
            ].map((btn, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 26 } },
                }}
              >
                {btn}
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 grid w-full max-w-[31rem] grid-cols-2 gap-2 sm:grid-cols-4 lg:max-w-none">
            {c.hero.trustChips.map((chip) => (
              <span key={chip} className="rounded-2xl border border-olive/15 px-3 py-2 text-center text-[11px] leading-tight text-gris-doux">
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-[31rem] text-center text-[11px] leading-relaxed tracking-wide text-gris-doux/80 lg:text-left">{c.hero.trust}</p>
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
