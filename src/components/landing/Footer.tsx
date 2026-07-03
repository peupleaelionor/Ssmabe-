import { getContent } from "@/content";

const c = getContent("fr");

/** Footer sérieux : statut bêta, contact, pays, version de build. */
export function Footer() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";

  return (
    <footer className="border-t border-or-doux/10 px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <p className="font-serif text-sm text-ivoire">{c.footer.signature}</p>

        <nav className="flex items-center gap-2 text-xs text-gris-doux" aria-label="Pied de page">
          {c.footer.links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>·</span>}
              <a href={l.href} className="transition hover:text-or-doux">{l.label}</a>
            </span>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-gris-doux">
          <span className="rounded-full border border-or-doux/20 px-3 py-1">{c.footer.status}</span>
          <a href={`mailto:${c.footer.contact}`} className="transition hover:text-or-doux">
            {c.footer.contact}
          </a>
          <span aria-label="Pays ciblés">{c.footer.countries}</span>
        </div>

        <p className="text-[11px] text-gris-doux/60">{c.footer.legal}</p>
        <p className="text-[10px] text-gris-doux/50">
          © {new Date().getFullYear()} Songi Songi Mabé · build {sha} ·{" "}
          <a href="https://ssmabe.vercel.app" className="underline-offset-2 transition hover:text-or-doux hover:underline">
            ssmabe.vercel.app
          </a>
        </p>
      </div>
    </footer>
  );
}
