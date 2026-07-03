import { cn } from "@/lib/utils";

export interface DoubleConsentCardProps {
  className?: string;
}

/**
 * Carte pédagogique du double consentement.
 * Le contact ne s'ouvre que si les DEUX personnes acceptent.
 */
export function DoubleConsentCard({ className }: DoubleConsentCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-noir-border bg-noir-card p-6 text-center",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vert-congo/20 text-lg">🙋</span>
        <span className="text-vert-light">+</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vert-congo/20 text-lg">🙋‍♀️</span>
        <span className="text-vert-light">=</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vert-congo text-lg">🤝</span>
      </div>
      <h3 className="text-base font-bold text-blanc-chaud">Le contact après. Si les deux veulent.</h3>
      <p className="mt-2 text-sm leading-relaxed text-gris-texte">
        Aucun contact n'est partagé pendant l'appel. Il ne s'ouvre que si
        <strong className="text-blanc-chaud"> les deux personnes acceptent</strong>.
        Sinon, la voix reste anonyme.
      </p>
    </div>
  );
}
