"use client";

import { motion } from "framer-motion";
import { getContent } from "@/content";

const c = getContent("fr");

/** Roadmap verticale sobre — la phase active en or. */
export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-3xl font-semibold text-ivoire sm:text-4xl"
        >
          {c.roadmap.title}
        </motion.h2>

        <ol className="relative mt-10 space-y-6 border-l border-olive/20 pl-6">
          {c.roadmap.phases.map((p, i) => {
            const active = "active" in p && p.active;
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                <span
                  aria-hidden
                  className={`absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full ${
                    active ? "bg-terra ring-4 ring-terra/20" : "bg-terra/30"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    active ? "text-terra" : "text-gris-doux"
                  }`}
                >
                  {p.tag}
                </span>
                <h3 className="mt-0.5 font-display text-lg font-semibold text-ivoire">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gris-doux">{p.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
