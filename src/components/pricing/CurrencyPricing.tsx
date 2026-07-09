"use client";

import * as React from "react";
import { haptic } from "@/lib/haptics";

/**
 * Affichage tarifaire multi-devises — PRÉSENTATION uniquement.
 * L'euro reste la devise de référence ; USD et FCFA sont des estimations
 * indicatives (taux fixes, arrondis). Aucune logique de paiement ici.
 */

type Currency = "EUR" | "USD" | "XOF";

// Taux de référence (1 € =) — statiques, volontairement approximatifs.
const RATE: Record<Currency, number> = { EUR: 1, USD: 1.09, XOF: 655.957 };
const LABEL: Record<Currency, string> = { EUR: "€ EUR", USD: "$ USD", XOF: "FCFA" };

/** Prix d'un plan exprimé en euros + suffixe (ex. « /mois »). */
export interface Priced {
  amountEUR: number;
  suffix?: string;
}

function format(amountEUR: number, currency: Currency): string {
  const value = amountEUR * RATE[currency];
  if (currency === "EUR") {
    const s = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(".", ",");
    return `${s} €`;
  }
  if (currency === "USD") {
    return `$${value.toFixed(2)}`;
  }
  // FCFA : pas de décimales, séparateur d'espace insécable, arrondi à la centaine.
  const rounded = Math.round(value / 100) * 100;
  return `${rounded.toLocaleString("fr-FR").replace(/ |,/g, " ")} FCFA`;
}

const CurrencyContext = React.createContext<Currency>("EUR");

/** Sélecteur global de devise + fournit le contexte aux <Price/>. */
export function CurrencyPricing({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = React.useState<Currency>("EUR");
  const currencies: Currency[] = ["EUR", "USD", "XOF"];

  return (
    <CurrencyContext.Provider value={currency}>
      <div className="mx-auto mb-8 flex max-w-5xl flex-col items-center gap-2">
        <div
          role="group"
          aria-label="Choisir la devise d'affichage"
          className="inline-flex rounded-full border border-olive/25 bg-white/[0.03] p-1"
        >
          {currencies.map((cur) => {
            const active = cur === currency;
            return (
              <button
                key={cur}
                type="button"
                aria-pressed={active}
                onClick={() => { setCurrency(cur); haptic("tap"); }}
                className={
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/60 " +
                  (active ? "bg-terra text-noir-abysse" : "text-gris-doux hover:text-ivoire")
                }
              >
                {LABEL[cur]}
              </button>
            );
          })}
        </div>
        {currency !== "EUR" && (
          <p className="text-[11px] text-gris-doux/70">
            Estimation indicative — facturation de référence en euros.
          </p>
        )}
      </div>
      {children}
    </CurrencyContext.Provider>
  );
}

/** Rend un montant dans la devise sélectionnée. */
export function Price({ amountEUR, suffix, className }: Priced & { className?: string }) {
  const currency = React.useContext(CurrencyContext);
  return (
    <span className={className}>
      {amountEUR === 0 ? format(0, currency) : format(amountEUR, currency)}
      {suffix ? <span className="text-base font-normal text-gris-doux">{suffix}</span> : null}
    </span>
  );
}
