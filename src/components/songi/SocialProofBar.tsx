import { cn } from "@/lib/utils";

export interface SocialProofItem {
  value: string;
  label: string;
}

export interface SocialProofBarProps {
  items?: SocialProofItem[];
  className?: string;
}

const DEFAULT_ITEMS: SocialProofItem[] = [
  { value: "12", label: "pays" },
  { value: "8", label: "langues" },
  { value: "0", label: "numéro exposé" },
  { value: "18+", label: "uniquement" },
];

/** Barre de réassurance (chiffres clés). Données non personnelles. */
export function SocialProofBar({ items = DEFAULT_ITEMS, className }: SocialProofBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-noir-border bg-noir-card px-6 py-4",
        className
      )}
    >
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="text-xl font-black text-vert-light">{it.value}</div>
          <div className="text-[11px] uppercase tracking-wide text-gris-texte">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
