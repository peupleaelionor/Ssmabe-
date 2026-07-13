"use client";

import dynamic from "next/dynamic";

/** Chargé hors bundle critique (framer-motion) — comme le Toaster. */
export const InstallPromptLazy = dynamic(
  () => import("./InstallPrompt").then((m) => m.InstallPrompt),
  { ssr: false }
);
