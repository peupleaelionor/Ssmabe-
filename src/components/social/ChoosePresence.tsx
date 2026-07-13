"use client";

import { motion } from "framer-motion";
import { AvatarPicker } from "./AvatarPicker";

/**
 * Section « Choisis ta présence » — remplace les anciens médaillons
 * typographiques par de vrais personas sélectionnables (config/avatars).
 */
export function ChoosePresence() {
  return (
    <section id="presences" className="cv-section scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Ta présence</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            Choisis le visage qui te parle.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            Une présence, pas ton numéro. Choisis celle qui te ressemble&nbsp;—
            elle t&apos;accompagnera dans tes cercles, sans jamais exposer qui tu es.
          </p>
        </motion.div>

        <div className="mt-10">
          <AvatarPicker />
        </div>
      </div>
    </section>
  );
}
