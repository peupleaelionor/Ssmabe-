"use client";

import * as React from "react";
import { haptic } from "@/lib/haptics";

const KEY = "ssmabe.datasaver";

/**
 * Bascule « Mode économie de données » (point 13, Africa-first).
 * Pose html[data-saver=on|off] → la CSS coupe animations, halos et visuels
 * lourds. État initial posé avant peinture par le script inline du layout ;
 * ici on le lit, on l'affiche et on permet de le changer (persisté localement).
 */
export function DataSaverToggle({ className }: { className?: string }) {
  const [on, setOn] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setOn(document.documentElement.dataset.saver === "on");
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.saver = next ? "on" : "off";
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      /* stockage indisponible : effet gardé pour la session */
    }
    haptic("tap");
  };

  // Évite un flash d'état incorrect avant hydratation.
  const active = on === true;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      className={
        "inline-flex items-center gap-2 rounded-full border border-olive/25 px-3 py-1.5 text-[11px] font-medium text-gris-doux transition hover:border-terra/50 hover:text-ivoire focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/50 " +
        (className ?? "")
      }
    >
      <span
        aria-hidden
        className={
          "relative h-3.5 w-6 rounded-full transition-colors " + (active ? "bg-terra" : "bg-olive/30")
        }
      >
        <span
          className={
            "absolute top-0.5 h-2.5 w-2.5 rounded-full bg-ivoire transition-all " +
            (active ? "left-3" : "left-0.5")
          }
        />
      </span>
      Économie de données {active ? "· activée" : ""}
    </button>
  );
}
