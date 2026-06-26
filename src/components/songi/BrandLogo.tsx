import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "horizontal" | "horizontal-dark" | "compact" | "round";

const SRC: Record<LogoVariant, { src: string; w: number; h: number }> = {
  horizontal: { src: "/assets/songi/logo/logo-primary-horizontal.svg", w: 260, h: 70 },
  "horizontal-dark": { src: "/assets/songi/logo/logo-primary-horizontal-dark.svg", w: 260, h: 70 },
  compact: { src: "/assets/songi/logo/logo-compact-mabe.svg", w: 130, h: 70 },
  round: { src: "/assets/songi/logo/logo-round.svg", w: 56, h: 56 },
};

export interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

/** Logo officiel Songi Songi Mabé. Décliné horizontal / compact / rond. */
export function BrandLogo({ variant = "horizontal", className, priority }: BrandLogoProps) {
  const { src, w, h } = SRC[variant];
  return (
    <Image
      src={src}
      alt="Songi Songi Mabé"
      width={w}
      height={h}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}
