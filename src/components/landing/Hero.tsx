"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Onde vocale or doux — décorative, légère, CSS pur. */
function GoldWave() {
  const heights = [10, 18, 26, 34, 26, 18, 10];
  return (
    <div className="flex h-10 items-center justify-center gap-1.5" role="img" aria-label="Onde vocale">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-terra/80 animate-wave-${(i % 5) + 1}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

/** Aperçu app compact — desktop uniquement (le mobile garde un hero d'un écran). */
function PhonePreview() {
  return (
    <div
      aria-hidden
      className="hidden w-[230px] shrink-0 rounded-[2.2rem] border border-olive/25 bg-vert-nuit p-3 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.8)] lg:block"
    >
      <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-terra/20" />
      <div className="rounded-[1.6rem] bg-gradient-to-b from-vert-premium to-noir-abysse p-5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-terra">Appel en cours</p>
        <div className="my-5 flex flex-col items-center gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-olive/30 bg-vert-aura/30 text-xl">🎙</span>
          <p className="text-sm font-semibold text-ivoire">Voix anonyme</p>
          <p className="text-[11px] text-gris-doux">Numéro masqué · 02:14</p>
        </div>
        <GoldWave />
        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-sm">🔇</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terra text-sm">⏹</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-sm">🚩</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-vert-aura/15 blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
        >
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {c.hero.badges.map((b, i) => (
              <span
                key={b}
                className={
                  i === 0
                    ? "rounded-full border border-olive/30 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-terra"
                    : "rounded-full border border-olive/20 bg-white/[0.035] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-gris-doux"
                }
              >
                {b}
              </span>
            ))}
          </div>

          <h1 className="font-display text-[2.5rem] font-semibold leading-[1.1] text-ivoire sm:text-6xl">
            {c.hero.title1}
            <br />
            <span className="text-terra">{c.hero.title2}</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-gris-doux">
            {c.hero.subtitle}
          </p>

          <div className="my-7 lg:hidden">
            <GoldWave />
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start lg:pt-7">
            <a
              href="/beta?source=hero"
              className="rounded-full bg-terra px-8 py-3.5 text-center text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark"
            >
              {c.hero.ctaPrimary}
            </a>
            <a
              href="#vision"
              className="rounded-full border border-olive/30 px-8 py-3.5 text-center text-sm font-semibold text-ivoire transition hover:border-olive/60"
            >
              {c.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {c.hero.trustChips.map((chip) => (
              <span key={chip} className="rounded-full border border-olive/25 bg-white/[0.03] px-3 py-1 text-[11px] text-gris-doux">
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs tracking-wide text-terra/90">La voix d&apos;abord. Le contact après.</p>
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
