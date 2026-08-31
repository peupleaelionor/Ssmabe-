"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/content/provider";
import { SsmMark } from "@/components/brand/SsmMark";
import { haptic } from "@/lib/haptics";

/**
 * Action primaire persistante — anti « je me perds ».
 * Apparaît au milieu du scroll (une fois le hero passé) et s'efface dès qu'une
 * vraie CTA est à l'écran (hero, section bêta, footer) → zéro redondance.
 * Une seule action, toujours à portée de pouce. Respecte le mode éco (no motion).
 */
export function StickyEnter() {
  const c = useContent();
  const [show, setShow] = React.useState(false);
  const [saver, setSaver] = React.useState(false);

  React.useEffect(() => {
    setSaver(document.documentElement.dataset.saver === "on");
    const hero = document.getElementById("top");
    const beta = document.getElementById("beta");

    const update = () => {
      const vh = window.innerHeight;
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const betaTop = beta ? beta.getBoundingClientRect().top : Infinity;
      // Visible seulement au « milieu » : hero passé, avant que la CTA finale entre.
      setShow(heroBottom < vh * 0.4 && betaTop > vh - 20);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const pill = (
    <a
      href="/beta?source=sticky"
      onClick={() => haptic("tap")}
      aria-label={`${c.navCta} — Songi Songi Mabé`}
      className="glass pointer-events-auto flex items-center gap-2 rounded-full border border-terra/45 bg-noir-abysse/90 py-2 pl-2 pr-4 text-sm font-semibold text-ivoire shadow-[0_22px_55px_-20px_rgba(0,0,0,0.85)] transition hover:border-terra"
    >
      <SsmMark tile size={30} />
      <span>{c.navCta}</span>
      <span aria-hidden className="text-terra">›</span>
    </a>
  );

  const wrapClass =
    "fixed inset-x-0 bottom-4 z-[60] mx-auto flex w-fit justify-center px-4";
  const wrapStyle = { marginBottom: "env(safe-area-inset-bottom)" } as const;

  if (saver) {
    return show ? (
      <div className={wrapClass} style={wrapStyle}>
        {pill}
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={wrapClass}
          style={wrapStyle}
        >
          {pill}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
