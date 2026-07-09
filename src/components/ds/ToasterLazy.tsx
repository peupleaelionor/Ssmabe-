"use client";

import dynamic from "next/dynamic";

/** Defers framer-motion out of the critical bundle — toasts only hydrate client-side. */
export const ToasterLazy = dynamic(() => import("./Toaster").then((m) => m.Toaster), {
  ssr: false,
});
