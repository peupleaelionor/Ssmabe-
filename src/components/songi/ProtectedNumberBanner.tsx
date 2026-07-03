import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProtectedNumberBannerProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Bandeau « Numéro protégé » — argument de marque central.
 * Présentationnel, aucun numéro réel n'est jamais rendu ici.
 */
export function ProtectedNumberBanner({
  className,
  title = "Numéro protégé",
  subtitle = "Ton numéro reste confidentiel. Toujours.",
}: ProtectedNumberBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-3xl border border-vert-congo/40 bg-vert-congo/10 p-5",
        className
      )}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-creme">
        <Image src="/assets/songi/security/badge-security.svg" alt="" width={30} height={30} aria-hidden />
      </span>
      <div>
        <p className="text-sm font-bold text-blanc-chaud">{title}</p>
        <p className="text-xs text-gris-texte">{subtitle}</p>
      </div>
    </div>
  );
}
