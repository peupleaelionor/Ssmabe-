"use client";

import * as React from "react";

const LINKS = [
  { href: "#concept", label: "Concept" },
  { href: "#how", label: "Comment ça marche" },
  { href: "#avatars", label: "Avatars" },
  { href: "#security", label: "Sécurité" },
  { href: "#beta", label: "Bêta" },
];

/**
 * Header sticky compact + menu mobile en overlay plein écran.
 * Blur léger, bordure or fine, fermeture au clic sur lien / échap.
 */
export function Header() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-or-doux/10 bg-noir-abysse/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <a href="#top" className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold tracking-wide text-ivoire">
              Songi Songi Mabé
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-or-doux/80">
              La voix d&apos;abord.
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-or-doux/30 text-ivoire transition hover:border-or-doux/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or-doux/60"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden>
              <span className="block h-px w-4 bg-ivoire" />
              <span className="block h-px w-4 bg-ivoire" />
              <span className="block h-px w-4 bg-ivoire" />
            </span>
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-noir-abysse/95 backdrop-blur-2xl animate-fade-in">
          <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
            <span className="font-serif text-lg font-semibold text-ivoire">
              Songi Songi Mabé
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-or-doux/30 text-ivoire transition hover:border-or-doux/60"
            >
              <span className="text-lg leading-none" aria-hidden>×</span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-7 px-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-ivoire transition hover:text-or-doux"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#beta"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-or-doux px-8 py-3.5 text-sm font-semibold text-noir-abysse transition hover:bg-or-sombre"
            >
              Rejoindre la bêta
            </a>
          </nav>

          <p className="pb-8 text-center text-xs text-gris-doux">
            La voix d&apos;abord. Le contact après.
          </p>
        </div>
      )}
    </>
  );
}
