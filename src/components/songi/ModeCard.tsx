import { cn } from "@/lib/utils";

export interface ModeCardProps {
  name: string;
  description: string;
  icon?: string;
  free?: boolean;
  safetyTag?: string;
  className?: string;
}

/** Carte de mode d'ambiance (Mboka, Diaspora, Respect…). */
export function ModeCard({ name, description, icon, free, safetyTag, className }: ModeCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-3xl border border-noir-border bg-noir-card p-5 transition hover:border-vert-light",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl" aria-hidden>{icon}</span>
        {free ? (
          <span className="rounded-full bg-vert-congo/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-vert-light">
            Gratuit
          </span>
        ) : null}
      </div>
      <h3 className="text-base font-bold text-blanc-chaud">{name}</h3>
      <p className="text-sm leading-relaxed text-gris-texte">{description}</p>
      {safetyTag ? (
        <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-cuivre/30 px-2 py-0.5 text-[10px] font-medium text-cuivre">
          🛡 {safetyTag}
        </span>
      ) : null}
    </div>
  );
}
