"use client";

import * as React from "react";
import { flag } from "@/config/flags";

/**
 * Enregistre le service worker en production si pwaEnabled.
 * Kill-switch : si le flag est off, désenregistre tout SW existant et purge
 * les caches → basculer NEXT_PUBLIC_FLAG_PWA=0 + redeploy récupère proprement.
 */
export function PwaRegister() {
  React.useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const enabled = flag("pwaEnabled") && process.env.NODE_ENV === "production";

    if (enabled) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    } else {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {});
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
      }
    }
  }, []);

  return null;
}
