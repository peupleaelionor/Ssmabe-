import * as React from "react";

/**
 * Monogramme « Ssm » — lettermark minimaliste moderne (initiales de
 * Songi Songi Mabé). Composé avec la police de marque (Poppins ExtraBold)
 * pour rester net à toute taille, avec un point terracotta = étincelle vocale
 * (ADN voix/bulle). Sert de marque réduite : app icon, header compact, lockups.
 */
export interface SsmMarkProps {
  size?: number;
  className?: string;
  /** Rend la version tuile (fond sombre arrondi) pour usage icône. */
  tile?: boolean;
  title?: string;
}

export function SsmMark({ size = 28, className, tile = false, title = "Ssm" }: SsmMarkProps) {
  // Dans la tuile, on laisse une marge autour du monogramme.
  const fontSize = size * (tile ? 0.42 : 0.62);
  const dot = fontSize * 0.2;
  const glyph = (
    <span
      className="relative inline-flex select-none items-baseline font-display font-extrabold leading-none tracking-[-0.05em] text-ivoire"
      style={{ fontSize }}
      aria-hidden
    >
      ssm
      <span
        className="absolute rounded-full bg-terra"
        style={{ width: dot, height: dot, right: -dot * 0.15, top: fontSize * 0.12 }}
      />
    </span>
  );

  if (!tile) {
    return (
      <span role="img" aria-label={title} className={className} style={{ display: "inline-flex" }}>
        {glyph}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-flex items-center justify-center rounded-[26%] border border-olive/25 bg-noir-abysse ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {glyph}
    </span>
  );
}

/**
 * Lockup produit — « Ssm Chat », « Ssm Voice », etc.
 * Wordmark « Ssm » (initiales) + nom de brique en olive.
 */
export function SsmLockup({
  product,
  size = 20,
  className,
}: {
  product: string;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className ?? ""}`} style={{ fontSize: size }}>
      <span className="relative font-display font-extrabold leading-none tracking-[-0.04em] text-ivoire" aria-hidden>
        Ssm
        <span
          className="absolute rounded-full bg-terra"
          style={{ width: size * 0.16, height: size * 0.16, right: -size * 0.04, top: size * 0.04 }}
        />
      </span>
      <span
        className="font-display font-medium leading-none tracking-tight text-olive"
        style={{ fontSize: size * 0.92 }}
      >
        {product}
      </span>
      <span className="sr-only">Ssm {product}</span>
    </span>
  );
}
