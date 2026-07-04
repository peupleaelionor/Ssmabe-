"use client";

import * as React from "react";
import { getLocalWaitlistCount } from "@/lib/waitlist";

/** Compteur waitlist — base mockée + inscriptions locales réelles. */
const BASE_COUNT = 1284;

export function WaitlistCounter({ className }: { className?: string }) {
  const [count, setCount] = React.useState(BASE_COUNT);
  React.useEffect(() => {
    setCount(BASE_COUNT + getLocalWaitlistCount());
  }, []);
  return (
    <p className={className}>
      <span className="font-display font-bold text-soleil">{count.toLocaleString("fr-FR")}</span>{" "}
      <span className="text-gris-doux">personnes déjà dans la première vague</span>
    </p>
  );
}
