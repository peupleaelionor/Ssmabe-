import Image from "next/image";

/**
 * Bande photographique « Un monde, une voix » — placée sous le hero
 * (hors LCP, images lazy). Art-direction : portrait sur mobile, paysage
 * sur desktop. Scrim fort pour garder le texte lisible.
 */
export function WorldBand() {
  return (
    <section
      aria-label="Une communauté née à Kinshasa, ouverte au monde"
      className="relative isolate overflow-hidden"
    >
      {/* Desktop / large */}
      <div className="relative hidden h-[420px] w-full sm:block lg:h-[480px]">
        <Image
          src="/brand/hero-landscape.webp"
          alt="Groupe d'amis connectés le soir, réseau lumineux reliant l'Afrique au monde"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
      </div>
      {/* Mobile */}
      <div className="relative block h-[520px] w-full sm:hidden">
        <Image
          src="/brand/hero-portrait.webp"
          alt="Voisins et diaspora échangeant par la voix, carte du monde lumineuse au-dessus de Kinshasa"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
      </div>

      {/* Scrim lisibilité + teinte de marque */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir-abysse via-noir-abysse/55 to-noir-abysse/30" />
      <div aria-hidden className="absolute inset-0 bg-noir-abysse/20 mix-blend-multiply" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-5xl px-5 pb-10 sm:pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terra">Né à Kinshasa · ouvert au monde</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-ivoire sm:text-4xl">
            Une voix d&apos;ici, entendue partout.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivoire/85 sm:text-base">
            Du quartier à la diaspora, un même fil relie les communautés&nbsp;:
            la parole, protégée, sans jamais montrer ton numéro.
          </p>
        </div>
      </div>
    </section>
  );
}
