import { BrandMark } from "./BrandMark";
import { cn } from "@/lib/utils";

/**
 * Logo — lockups officiels Songi Songi Mabé.
 * - horizontal : symbole + nom (+ slogan optionnel) — header desktop
 * - stacked    : symbole au-dessus du nom — écrans d'accueil, OG
 * - mark       : symbole seul — nav mobile, avatars, favicon contexts
 * Thème dark (texte crème) par défaut ; light pour fonds clairs.
 */
export interface LogoProps {
  variant?: "horizontal" | "stacked" | "mark";
  theme?: "dark" | "light";
  withSlogan?: boolean;
  markSize?: number;
  className?: string;
}

const SLOGAN = "Né à Kinshasa. Pensé pour toutes les communautés.";

export function Logo({
  variant = "horizontal",
  theme = "dark",
  withSlogan = false,
  markSize,
  className,
}: LogoProps) {
  const nameColor = theme === "dark" ? "text-ivoire" : "text-noir-abysse";
  const sloganColor = theme === "dark" ? "text-gris-doux" : "text-noir-abysse/60";

  if (variant === "mark") {
    return <BrandMark size={markSize ?? 40} className={className} title="Songi Songi Mabé" />;
  }

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-3 text-center", className)}>
        <BrandMark size={markSize ?? 72} />
        <span className={cn("font-display text-xl font-extrabold tracking-tight", nameColor)}>
          Songi Songi Mabé
        </span>
        {withSlogan ? (
          <span className={cn("text-xs", sloganColor)}>{SLOGAN}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={markSize ?? 36} />
      <span className="flex flex-col leading-tight">
        <span className={cn("font-display text-base font-extrabold tracking-tight sm:text-lg", nameColor)}>
          Songi Songi Mabé
        </span>
        {withSlogan ? (
          <span className={cn("text-[10px]", sloganColor)}>{SLOGAN}</span>
        ) : null}
      </span>
    </span>
  );
}
