"use client";

import { motion } from "framer-motion";

/** Onde vocale or doux — décorative, légère, CSS pur. */
function GoldWave() {
  const heights = [10, 18, 26, 34, 26, 18, 10];
  return (
    <div className="flex h-10 items-center justify-center gap-1.5" role="img" aria-label="Onde vocale">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-or-doux/80 animate-wave-${(i % 5) + 1}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

/**
 * Hero mobile-first : tient sur le premier écran iPhone,
 * sans image lourde — typographie + onde or.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 sm:pt-36">
      {/* halo vert aura très subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-vert-aura/15 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-or-doux/30 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-or-doux">
            Téléchat vocal
          </span>
          <span className="rounded-full border border-or-doux/20 bg-white/[0.035] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-gris-doux">
            Aura vocale Mabé
          </span>
        </div>

        <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.08] text-ivoire sm:text-6xl">
          Rencontre par la voix.
          <br />
          <span className="text-or-doux">Numéro protégé.</span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-gris-doux">
          La voix d&apos;abord. Le contact après. Pas de swipe. Pas de pression.
          Juste une voix.
        </p>

        <div className="my-7">
          <GoldWave />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href="#beta"
            className="rounded-full bg-or-doux px-8 py-3.5 text-center text-sm font-semibold text-noir-abysse transition hover:bg-or-sombre"
          >
            Rejoindre la bêta
          </a>
          <a
            href="#how"
            className="rounded-full border border-or-doux/30 px-8 py-3.5 text-center text-sm font-semibold text-ivoire transition hover:border-or-doux/60"
          >
            Comment ça marche&nbsp;?
          </a>
        </div>

        <p className="mt-6 text-xs tracking-wide text-gris-doux">
          18+ uniquement · Double consentement · Numéro masqué
        </p>
      </motion.div>
    </section>
  );
}
