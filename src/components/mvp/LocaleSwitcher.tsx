"use client";

import { useLocale, LOCALES, LOCALE_SHORT, LOCALE_LABELS } from "@/content/provider";
import { haptic } from "@/lib/haptics";

/** Sélecteur de langue d'interface (FR / Lingala / EN). */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Langue de l'interface"
      className={"inline-flex items-center gap-1 rounded-full border border-olive/25 p-1 " + (className ?? "")}
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            aria-label={LOCALE_LABELS[l]}
            onClick={() => { setLocale(l); haptic("tap"); }}
            className={
              "rounded-full px-2.5 py-1 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/50 " +
              (active ? "bg-terra text-noir-abysse" : "text-gris-doux hover:text-ivoire")
            }
          >
            {LOCALE_SHORT[l]}
          </button>
        );
      })}
    </div>
  );
}
