"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CountryCode, type Country } from "@/lib/types";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { Check } from "lucide-react";

interface CountrySelectorProps {
  selected: CountryCode;
  onSelect: (code: CountryCode) => void;
  filterDiaspora?: boolean;
  className?: string;
}

export function CountrySelector({
  selected,
  onSelect,
  filterDiaspora,
  className,
}: CountrySelectorProps) {
  const countries =
    filterDiaspora !== undefined
      ? COUNTRIES_LIST.filter((c) => c.isDiaspora === filterDiaspora)
      : COUNTRIES_LIST;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3",
        className
      )}
    >
      {countries.map((country, i) => (
        <CountryCard
          key={country.code}
          country={country}
          selected={selected === country.code}
          onSelect={onSelect}
          delay={i * 0.05}
        />
      ))}
    </div>
  );
}

interface CountryCardProps {
  country: Country;
  selected: boolean;
  onSelect: (code: CountryCode) => void;
  delay?: number;
}

function CountryCard({ country, selected, onSelect, delay = 0 }: CountryCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={() => onSelect(country.code)}
      className={cn(
        "relative p-4 rounded-2xl border transition-all duration-200 text-left",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-vert-congo",
        "active:scale-95",
        selected
          ? "border-vert-congo bg-vert-congo/10 shadow-congo-glow"
          : "border-noir-border bg-noir-card hover:border-vert-congo/40"
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-vert-congo flex items-center justify-center">
          <Check className="w-3 h-3 text-blanc-chaud" />
        </div>
      )}
      <div className="text-3xl mb-2">{country.flag}</div>
      <div className="text-sm font-semibold text-blanc-chaud leading-tight">
        {country.name}
      </div>
      {country.isDiaspora && (
        <div className="text-xs text-cuivre mt-1 font-medium">Diaspora</div>
      )}
      <div className="text-xs text-gris-texte mt-0.5">
        {country.phonePrefix}
      </div>
    </motion.button>
  );
}
