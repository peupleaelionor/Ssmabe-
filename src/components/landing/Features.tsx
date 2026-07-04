"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";
import { TelechatIcon } from "@/components/brand/TelechatAssets";

const c = getContent("fr");

const iconNames = ["call", "wave", "whatsapp", "web", "circle", "lock", "globe", "language", "shield"] as const;

/** Grille de fonctionnalités — lisible sur 320px, dense seulement quand l'écran le permet. */
export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-olive/10 bg-vert-nuit/40 px-4 py-16 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-balance font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.features.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            {c.features.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {c.features.items.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="relative card-lift rounded-[1.65rem] border border-olive/15 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-5"
            >
              {"live" in f && f.live ? (
                <span className="absolute right-3 top-3 rounded-full bg-terra/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-terra">
                  Bêta
                </span>
              ) : null}
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] text-terra" aria-hidden>
                <TelechatIcon name={iconNames[i % iconNames.length]} />
              </span>
              <h3 className="mt-3 text-base font-semibold leading-tight text-ivoire">{f.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gris-doux">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
