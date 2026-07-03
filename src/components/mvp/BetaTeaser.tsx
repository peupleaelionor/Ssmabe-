"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WaitlistCounter } from "./WaitlistCounter";
import { ContactOptions } from "./ContactOptions";
import { getContent } from "@/content";
import { analytics } from "@/lib/analytics";

const c = getContent("fr");

/** Section bêta homepage : teaser + compteur + CTA vers /beta + contact rapide. */
export function BetaTeaser() {
  return (
    <section id="beta" className="scroll-mt-20 border-t border-olive/15 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">{c.beta.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">{c.beta.text}</p>
          <WaitlistCounter className="mt-5 text-sm" />
          <Link
            href="/beta?source=home-beta"
            onClick={() => analytics.heroCta("home-beta")}
            className="mt-7 inline-block rounded-full bg-terra px-10 py-4 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark"
          >
            {c.beta.submit} →
          </Link>
          <p className="mt-4 text-[11px] text-gris-doux/80">{c.beta.note}</p>
        </motion.div>

        <div className="mt-14 border-t border-olive/15 pt-10 text-left">
          <h3 className="text-center font-display text-xl font-semibold text-ivoire">{c.contactSection.title}</h3>
          <p className="mt-2 text-center text-sm text-gris-doux">{c.contactSection.text}</p>
          <ContactOptions className="mt-6" />
        </div>
      </div>
    </section>
  );
}
