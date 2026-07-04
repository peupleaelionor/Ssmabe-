"use client";

import * as React from "react";
import { COMMUNITIES } from "@/config/communities";
import { CommunityCard } from "./CommunityCard";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/BrandMark";

const CATEGORIES = ["Toutes", ...Array.from(new Set(COMMUNITIES.map((c) => c.category)))];
const COUNTRIES = ["Tous", ...Array.from(new Set(COMMUNITIES.map((c) => c.country)))];

/** Liste des communautés avec filtres catégorie / pays. */
export function CommunityBrowser() {
  const [cat, setCat] = React.useState("Toutes");
  const [country, setCountry] = React.useState("Tous");

  const list = COMMUNITIES.filter(
    (c) => (cat === "Toutes" || c.category === cat) && (country === "Tous" || c.country === country)
  );

  const chip = (active: boolean) =>
    cn(
      "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
      active ? "bg-terra text-noir-abysse" : "border border-olive/30 text-gris-doux hover:text-ivoire"
    );

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16">
      <div className="flex flex-wrap justify-center gap-2">
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
        {list.map((c) => <CommunityCard key={c.id} community={c} />)}
      </div>
      {list.length === 0 && (
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
    </div>
  );
}
