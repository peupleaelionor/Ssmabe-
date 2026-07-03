import { Logo } from "@/components/brand/Logo";
import { BrandMark } from "@/components/brand/BrandMark";

type LogoVariant = "horizontal" | "horizontal-dark" | "compact" | "round";

export interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

/**
 * @deprecated Utiliser @/components/brand/Logo directement.
 * Façade de compatibilité vers le système de marque validé (bulles).
 */
export function BrandLogo({ variant = "horizontal", className }: BrandLogoProps) {
  if (variant === "round" || variant === "compact") {
    return <BrandMark size={variant === "round" ? 56 : 40} className={className} title="Songi Songi Mabé" />;
  }
  return <Logo variant="horizontal" theme={variant === "horizontal-dark" ? "dark" : "light"} className={className} />;
}
