"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMMUNITIES, type Community } from "@/config/communities";
import { CommunityCard } from "./CommunityCard";
import { CommunityPreviewSheet } from "@/components/social/CommunityPreviewSheet";
import { flag } from "@/config/flags";
import { useJoinedCircles } from "@/lib/social/circles";
import { getContent } from "@/content";

const c = getContent("fr");

/** Section homepage « Communautés en action » — 8 cartes + CTA vers /communautes. */
export function CommunitiesSection() {
  const [selected, setSelected] = React.useState<Community | null>(null);
  const circles = flag("circlesEnabled");
  const joined = useJoinedCircles();

  return (
    <section id="communautes" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.communitiesSection.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">{c.communitiesSection.text}</p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITIES.slice(0, 8).map((com) => (
            <CommunityCard
              key={com.id}
              community={com}
              onOpen={circles ? () => setSelected(com) : undefined}
              joined={circles && joined.includes(com.id)}
            />
          ))}
        </div>
        {circles && <CommunityPreviewSheet community={selected} onClose={() => setSelected(null)} />}

        <div className="mt-8 text-center">
          <Link
            href="/communautes"
            className="inline-block rounded-full border border-olive/40 px-8 py-3.5 text-sm font-semibold text-ivoire transition hover:border-terra/60 hover:text-terra"
          >
            {c.communitiesSection.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
