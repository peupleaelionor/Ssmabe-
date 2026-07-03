import { VoiceWave } from "./VoiceWave";
import { cn } from "@/lib/utils";

export interface VoiceDemoCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/** Carte « démo voix » présentationnelle (accroche réseaux / landing). */
export function VoiceDemoCard({
  title = "Écoute une voix. Ressens. Choisis.",
  subtitle = "Pas de swipe. Pas de pression. Juste une voix.",
  className,
}: VoiceDemoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-3xl border border-noir-border bg-noir-card p-8 text-center",
        className
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-vert-congo text-2xl">🎧</span>
      <VoiceWave bars={7} />
      <h3 className="text-lg font-bold text-blanc-chaud">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-gris-texte">{subtitle}</p>
    </div>
  );
}
