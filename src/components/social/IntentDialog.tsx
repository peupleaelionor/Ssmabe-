"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { haptic } from "@/lib/haptics";
import { analytics } from "@/lib/analytics";

// Formulaire lourd (liste pays) chargé uniquement à l'ouverture — hors bundle Hero.
const IntentForm = dynamic(() => import("./IntentForm").then((m) => m.IntentForm), {
  ssr: false,
  loading: () => <p className="mt-4 text-center text-sm text-gris-doux">Chargement…</p>,
});

/**
 * Micro-modal « bientôt disponible » — capture d'intention.
 * Le canal (appel / WhatsApp) n'est pas encore actif : au lieu d'un cul-de-sac,
 * on propose de rejoindre la bêta avec une source dédiée (?source=<intent>).
 * Radix Dialog = focus-trap, Escape, aria-modal gérés nativement.
 */
export interface IntentDialogProps {
  /** Étiquette de source pour /beta (ex. "call_intent"). */
  intent: string;
  title: string;
  description: string;
  /** Élément déclencheur (le bouton d'apparence désactivée). */
  children: React.ReactNode;
}

export function IntentDialog({ intent, title, description, children }: IntentDialogProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      haptic("tap");
      analytics.contactClick(intent);
    }
  }, [open, intent]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-noir-abysse/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby="intent-desc">
              {/* Centrage via les valeurs framer (x/y en %) : framer écrit le
                  transform inline et écraserait des classes -translate-*. */}
              <motion.div
                initial={{ opacity: 0, x: "-50%", y: "-46%", scale: 0.98 }}
                animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
                exit={{ opacity: 0, x: "-50%", y: "-46%", scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="glass fixed left-1/2 top-1/2 z-[91] w-[min(92vw,26rem)] rounded-[1.75rem] border border-olive/25 bg-noir-abysse/95 p-6 text-center shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-terra/15 text-2xl" aria-hidden>
                  ✦
                </span>
                <Dialog.Title className="mt-4 font-display text-xl font-semibold text-ivoire">{title}</Dialog.Title>
                <Dialog.Description id="intent-desc" className="mt-2 text-sm leading-relaxed text-gris-doux">
                  {description}
                </Dialog.Description>
                <div className="mt-5">
                  <IntentForm source={intent} onDone={() => setOpen(false)} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
