import Image from "next/image";
import { cn } from "@/lib/utils";

type SecurityKind = "anonymous" | "security" | "diaspora" | "consent";

const ICON: Record<SecurityKind, string> = {
  anonymous: "/assets/songi/security/badge-anonymous.svg",
  security: "/assets/songi/security/badge-security.svg",
  diaspora: "/assets/songi/security/badge-diaspora.svg",
  consent: "/assets/songi/security/badge-consent.svg",
};

const DEFAULT_LABEL: Record<SecurityKind, string> = {
  anonymous: "Appel anonyme",
  security: "Sécurité",
  diaspora: "Diaspora",
  consent: "Double consentement",
};

export interface SecurityBadgeProps {
  kind: SecurityKind;
  label?: string;
  className?: string;
}

/** Badge sécurité illustré (icône SVG + label). */
export function SecurityBadge({ kind, label, className }: SecurityBadgeProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-creme">
        <Image src={ICON[kind]} alt="" width={36} height={36} aria-hidden />
      </span>
      <span className="text-xs font-medium text-gris-texte">{label ?? DEFAULT_LABEL[kind]}</span>
    </div>
  );
}
