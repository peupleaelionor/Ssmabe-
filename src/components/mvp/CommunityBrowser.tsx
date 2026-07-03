"use client";

import * as React from "react";
import { COMMUNITIES } from "@/config/communities";
import { CommunityCard } from "./CommunityCard";
import { cn } from "@/lib/utils";

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
        <p className="mt-10 text-center text-sm text-gris-doux">Aucune communauté pour ce filtre — elle arrive peut-être bientôt.</p>
      )}
    </div>
  );
}
