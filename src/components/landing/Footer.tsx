export function Footer() {
  return (
    <footer className="border-t border-or-doux/10 px-5 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <p className="font-serif text-sm text-ivoire">
          Songi Songi Mabé — La voix d&apos;abord. Le contact après.
        </p>
        <nav className="flex items-center gap-2 text-xs text-gris-doux">
          <a href="#concept" className="transition hover:text-or-doux">Concept</a>
          <span aria-hidden>·</span>
          <a href="#security" className="transition hover:text-or-doux">Sécurité</a>
          <span aria-hidden>·</span>
          <a href="#beta" className="transition hover:text-or-doux">Bêta</a>
        </nav>
        <p className="text-[11px] text-gris-doux/60">
          © {new Date().getFullYear()} Songi Songi Mabé
        </p>
      </div>
    </footer>
  );
}
