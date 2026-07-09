"use client";

import * as React from "react";
import { COMMUNITIES, type Community } from "@/config/communities";
import { CommunityCard } from "./CommunityCard";
import { CommunityPreviewSheet } from "@/components/social/CommunityPreviewSheet";
import { flag } from "@/config/flags";
import { useJoinedCircles } from "@/lib/social/circles";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/BrandMark";

const CATEGORIES = ["Toutes", ...Array.from(new Set(COMMUNITIES.map((c) => c.category)))];
const COUNTRIES = ["Tous", ...Array.from(new Set(COMMUNITIES.map((c) => c.country)))];

/** Liste des communautés avec filtres catégorie / pays + vue « Mes cercles ». */
export function CommunityBrowser() {
  const [cat, setCat] = React.useState("Toutes");
  const [country, setCountry] = React.useState("Tous");
  const [mine, setMine] = React.useState(false);
  const [selected, setSelected] = React.useState<Community | null>(null);
  const circles = flag("circlesEnabled");
  const joined = useJoinedCircles();

  const filtered = COMMUNITIES.filter(
    (c) => (cat === "Toutes" || c.category === cat) && (country === "Tous" || c.country === country)
  );
  // Mes cercles d'abord — puis, en vue « Mes cercles », seulement eux.
  const list = (mine ? filtered.filter((c) => joined.includes(c.id)) : filtered)
    .slice()
    .sort((a, b) => Number(joined.includes(b.id)) - Number(joined.includes(a.id)));

  const chip = (active: boolean) =>
    cn(
      "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
      active ? "bg-terra text-noir-abysse" : "border border-olive/30 text-gris-doux hover:text-ivoire"
    );

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16">
      <div className="flex flex-wrap justify-center gap-2">
        {circles && (
          <button
            type="button"
            onClick={() => setMine((m) => !m)}
            aria-pressed={mine}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              mine ? "bg-olive text-noir-abysse" : "border border-olive/40 text-olive hover:text-ivoire"
            )}
          >
            Mes cercles{joined.length > 0 ? ` · ${joined.length}` : ""}
          </button>
        )}
        {CATEGORIES.map((x) => (
          <button key={x} type="button" onClick={() => setCat(x)} className={chip(cat === x)}>{x}</button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {COUNTRIES.map((x) => (
          <button key={x} type="button" onClick={() => setCountry(x)} className={chip(country === x)}>{x}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <CommunityCard
            key={c.id}
            community={c}
            onOpen={circles ? () => setSelected(c) : undefined}
            joined={circles && joined.includes(c.id)}
          />
        ))}
      </div>
      {list.length === 0 && mine && (
        <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-4 rounded-[2rem] border border-olive/20 bg-white/[0.03] px-6 py-10 text-center">
          <span className="relative" aria-hidden>
            <span className="absolute -inset-3 rounded-full bg-terra/10 blur-xl" />
            <span className="relative inline-flex opacity-80"><BrandMark size={60} /></span>
          </span>
          <p className="font-display text-base font-semibold text-ivoire">Ton premier cercle t'attend</p>
          <p className="text-sm leading-relaxed text-gris-doux">
            Rejoins une communauté d'un tap — elle restera ici, sur ton appareil, prête pour le lancement.
          </p>
          <button
            type="button"
            onClick={() => setMine(false)}
            className="rounded-full bg-terra px-6 py-2.5 text-xs font-semibold text-noir-abysse transition hover:bg-terra-dark"
          >
            Explorer les communautés
          </button>
        </div>
      )}
      {list.length === 0 && !mine && (
        <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-4 rounded-[2rem] border border-olive/20 bg-white/[0.03] px-6 py-10 text-center">
          <span className="opacity-60"><BrandMark size={56} /></span>
          <p className="text-sm leading-relaxed text-gris-doux">
            Aucune communauté pour ce filtre — elle arrive peut-être bientôt.
          </p>
          <button
            type="button"
            onClick={() => { setCat("Toutes"); setCountry("Tous"); }}
            className="rounded-full border border-terra/40 px-5 py-2 text-xs font-semibold text-terra transition hover:bg-terra hover:text-noir-abysse"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
      {circles && <CommunityPreviewSheet community={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
