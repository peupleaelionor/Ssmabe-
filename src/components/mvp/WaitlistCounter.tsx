"use client";

import * as React from "react";
import { getLocalWaitlistCount } from "@/lib/waitlist";

/**
 * Compteur waitlist — chiffre RÉEL (Supabase via /api/waitlist/count) +
 * inscriptions locales. Aucun nombre fabriqué (point 55). Copy honnête même
 * à 0 : « Sois la première voix ».
 */
export function WaitlistCounter({ className }: { className?: string }) {
  const [count, setCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    let alive = true;
    const local = getLocalWaitlistCount();
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d: { count: number | null }) => {
        if (!alive) return;
        setCount((typeof d.count === "number" ? d.count : 0) + local);
      })
      .catch(() => {
        if (alive) setCount(local);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (count === null) {
    return (
      <p className={className}>
        <span className="text-gris-doux">Rejoins la première vague…</span>
      </p>
    );
  }

  if (count <= 0) {
    return (
      <p className={className}>
        <span className="font-display font-bold text-terra">Sois la première voix</span>{" "}
        <span className="text-gris-doux">de la première vague</span>
      </p>
    );
  }

  return (
    <p className={className}>
      <span className="font-display font-bold text-terra">{count.toLocaleString("fr-FR")}</span>{" "}
      <span className="text-gris-doux">
        {count > 1 ? "personnes ont déjà rejoint" : "personne a déjà rejoint"} la première vague
      </span>
    </p>
  );
}
