"use client";

import * as React from "react";
import Link from "next/link";
import { classifyConnection, shouldSuggestLite } from "@/lib/robots/adaptiveRobot";

/**
 * Moteur adaptatif — monté une fois dans le layout.
 * Lit navigator.connection, marque <html data-conn>, et propose
 * discrètement le mode léger si la connexion est lente.
 */
export function AdaptiveEngine() {
  const [suggestLite, setSuggestLite] = React.useState(false);

  React.useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const signals = {
      saveData: nav.connection?.saveData,
      effectiveType: nav.connection?.effectiveType,
      deviceMemory: nav.deviceMemory,
    };
    document.documentElement.dataset.conn = classifyConnection(signals);
    if (shouldSuggestLite(signals) && window.location.pathname !== "/lite") {
      setSuggestLite(true);
    }
  }, []);

  if (!suggestLite) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-soleil/30 bg-noir-abysse/95 px-4 py-3 text-center backdrop-blur" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <p className="text-xs text-ivoire">
        Connexion lente détectée —{" "}
        <Link href="/lite" prefetch={false} className="font-semibold text-soleil underline underline-offset-2">
          passe en mode léger ⚡
        </Link>
        <button type="button" onClick={() => setSuggestLite(false)} className="ml-3 text-gris-doux" aria-label="Fermer">✕</button>
      </p>
    </div>
  );
}
