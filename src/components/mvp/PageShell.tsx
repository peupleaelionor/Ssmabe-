import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

/** Coquille commune des sous-pages : header + fond ink + footer. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />
      <div className="pt-16">{children}</div>
      <Footer />
    </main>
  );
}

/** En-tête standard de sous-page. */
export function PageHero({ title, text }: { title: string; text?: string }) {
  return (
    <header className="px-5 pb-10 pt-14 text-center sm:pt-20">
      <h1 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-ivoire sm:text-5xl">{title}</h1>
      {text ? <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gris-doux sm:text-base">{text}</p> : null}
    </header>
  );
}
