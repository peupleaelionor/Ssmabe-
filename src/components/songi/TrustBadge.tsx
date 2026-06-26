import { cn } from "@/lib/utils";

export interface TrustBadgeProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

/** Pastille de confiance discrète (ex. « Numéro protégé »). */
export function TrustBadge({ label, icon, className }: TrustBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-vert-congo/40 bg-vert-congo/10 px-3 py-1 text-xs font-medium text-blanc-chaud",
        className
      )}
    >
      {icon ?? <span className="h-1.5 w-1.5 rounded-full bg-vert-light" aria-hidden />}
      {label}
    </span>
  );
}
