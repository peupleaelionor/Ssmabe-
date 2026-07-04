"use client";

import * as React from "react";
import { getContent } from "@/content";
import { BrandMark } from "@/components/brand/BrandMark";

const c = getContent("fr");

/**
 * Header sticky compact + menu mobile en overlay plein écran.
 * Le nom est visible dès mobile pour installer la marque.
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-olive/10 bg-noir-abysse/85 backdrop-blur-xl safe-area-top">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-5">
          <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="Songi Songi Mabé — accueil">
            <BrandMark size={36} className="shrink-0 drop-shadow-[0_8px_18px_rgba(224,105,74,0.18)]" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-display text-[1.05rem] font-extrabold tracking-tight text-ivoire sm:text-lg">
                {c.brand.name}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-terra/90 min-[380px]:block">
                {c.brand.tagline}
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-3">
            <nav className="hidden items-center gap-5 md:flex" aria-label="Navigation principale">
              {c.nav.slice(0, 4).map((l) => (
                <a key={l.href} href={l.href} className="text-xs text-gris-doux transition hover:text-terra">
                  {l.label}
                </a>
              ))}
              <a
                href="/beta"
                className="rounded-full bg-terra px-4 py-2 text-xs font-semibold text-noir-abysse transition hover:bg-terra-dark"
              >
                {c.navCta}
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-olive/30 bg-white/[0.025] text-ivoire transition hover:border-olive/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/60 md:hidden"
            >
              <span className="flex flex-col gap-[5px]" aria-hidden>
                <span className="block h-px w-5 bg-ivoire" />
                <span className="block h-px w-5 bg-ivoire" />
                <span className="block h-px w-5 bg-ivoire" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-noir-abysse/95 backdrop-blur-2xl animate-fade-in safe-area-top">
          <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-5">
            <span className="flex min-w-0 items-center gap-2.5">
              <BrandMark size={34} className="shrink-0" />
              <span className="truncate font-display text-lg font-extrabold text-ivoire">{c.brand.name}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-olive/30 text-ivoire transition hover:border-olive/60"
            >
              <span className="text-lg leading-none" aria-hidden>×</span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6" aria-label="Menu mobile">
            {c.nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-ivoire transition hover:text-terra"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/beta"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-terra px-8 py-3.5 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark"
            >
              {c.navCta}
            </a>
          </nav>

          <p className="pb-8 text-center text-xs text-gris-doux">{c.brand.signature}</p>
        </div>
      )}
    </>
  );
}
