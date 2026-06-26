"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#concept", label: "Concept" },
  { href: "#how", label: "Comment ça marche" },
  { href: "#modes", label: "Modes" },
  { href: "#safety", label: "Sécurité" },
  { href: "#beta", label: "Bêta" },
];

export function MarketingHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-noir/90 backdrop-blur-md border-b border-noir-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2" aria-label="Songi Songi Mabé — accueil">
          <div className="w-8 h-8 rounded-xl bg-vert-congo flex items-center justify-center">
            <span className="text-base" aria-hidden>
              🎙
            </span>
          </div>
          <span className="font-black text-blanc-chaud text-sm">
            Songi Songi Mabé
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-gris-texte hover:text-blanc-chaud transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#beta"
            className="bg-vert-congo text-blanc-chaud text-xs font-semibold px-4 py-2 rounded-xl hover:bg-vert-light transition-colors"
          >
            Rejoindre la bêta
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-noir-border text-blanc-chaud"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-noir-border bg-noir/95"
          >
            <div className="max-w-md mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-gris-texte hover:text-blanc-chaud transition-colors py-2.5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#beta"
                onClick={() => setOpen(false)}
                className="mt-2 text-center bg-vert-congo text-blanc-chaud text-sm font-semibold px-4 py-3 rounded-xl hover:bg-vert-light transition-colors"
              >
                Rejoindre la bêta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
