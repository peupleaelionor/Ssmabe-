import { cn } from "@/lib/utils";

export interface CountryBadgeProps {
  flag: string;
  name: string;
  code?: string;
  className?: string;
}

/** Pastille pays (drapeau + nom). N'expose aucune donnée utilisateur. */
export function CountryBadge({ flag, name, code, className }: CountryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-noir-border bg-noir-card px-3 py-1.5 text-xs font-medium text-blanc-chaud",
        className
      )}
    >
      <span aria-hidden className="text-base leading-none">{flag}</span>
      {name}
      {code ? <span className="text-gris-texte">· {code}</span> : null}
    </span>
  );
}
