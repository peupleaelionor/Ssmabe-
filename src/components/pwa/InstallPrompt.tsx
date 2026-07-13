"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flag } from "@/config/flags";
import { haptic } from "@/lib/haptics";

/** L'event beforeinstallprompt n'est pas typé par la lib DOM standard. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "ssmabe.pwa.dismissed";

/**
 * Invite « Ajouter à l'écran d'accueil » — bannière sobre, dismissible.
 * Capture beforeinstallprompt (Android/Chrome), déclenche l'installation
 * native. Rejet mémorisé localement. No-op si pwaEnabled off ou non supporté.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!flag("pwaEnabled")) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* stockage bloqué : on tente quand même l'invite */
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    haptic("tap");
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") haptic("success");
    setDeferred(null);
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          role="dialog"
          aria-label="Installer l'application"
          className="glass fixed inset-x-3 bottom-3 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-olive/25 bg-noir-abysse/95 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/app-icon-192.png" alt="" width={40} height={40} className="shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ivoire">Installe Songi Songi Mabé</p>
            <p className="truncate text-[11px] text-gris-doux">Accès rapide, même en faible connexion.</p>
          </div>
          <button
            type="button"
            onClick={install}
            className="shrink-0 rounded-full bg-terra px-4 py-2 text-xs font-semibold text-noir-abysse transition hover:bg-terra-dark"
          >
            Installer
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fermer"
            className="shrink-0 rounded-full px-1.5 text-lg leading-none text-gris-doux transition hover:text-terra"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
