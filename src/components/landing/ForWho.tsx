"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Pour qui : 9 publics en chips, une phrase humaine, rien de plus. */
export function ForWho() {
  return (
    <section id="pourqui" className="scroll-mt-20 border-y border-or-doux/10 bg-vert-nuit/40 px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.forWho.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">{c.forWho.text}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {c.forWho.audiences.map((a) => (
            <span
              key={a}
              className="rounded-full border border-or-doux/20 bg-white/[0.035] px-4 py-2 text-xs font-medium text-ivoire"
            >
              {a}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
