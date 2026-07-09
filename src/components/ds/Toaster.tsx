"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscribeToasts, type ToastData } from "./toast-bus";

const VARIANT = {
  success: "border-olive/40 bg-[#141a14]/95 text-ivoire",
  error: "border-terra/50 bg-[#1c1210]/95 text-ivoire",
  info: "border-olive/25 bg-noir-abysse/95 text-ivoire",
} as const;

const DOT = { success: "bg-olive", error: "bg-terra", info: "bg-gris-doux" } as const;

/**
 * Toast viewport — mount once (root layout). Spring in, auto-dismiss,
 * swipe/tap to close, aria-live for screen readers, safe-area aware.
 */
export function Toaster() {
  const [items, setItems] = React.useState<ToastData[]>([]);

  React.useEffect(
    () =>
      subscribeToasts((t) => {
        setItems((prev) => [...prev.slice(-2), t]);
        const ttl = setTimeout(
          () => setItems((prev) => prev.filter((x) => x.id !== t.id)),
          4000
        );
        return () => clearTimeout(ttl);
      }),
    []
  );

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-3 z-[90] flex flex-col items-center gap-2 px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <AnimatePresence>
        {items.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y < -30) setItems((prev) => prev.filter((x) => x.id !== t.id));
            }}
            className={`glass pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 text-left shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] ${VARIANT[t.variant]}`}
          >
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[t.variant]}`} aria-hidden />
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug">{t.title}</span>
              {t.description ? (
                <span className="mt-0.5 block text-xs leading-relaxed text-gris-doux">{t.description}</span>
              ) : null}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
