import { cn } from "@/lib/utils";

export interface VoiceWaveProps {
  bars?: number;
  className?: string;
  /** Couleur des barres (classe Tailwind bg-*). */
  barClassName?: string;
  active?: boolean;
}

/**
 * Onde vocale animée en CSS pur (pas de JS/framer → SSR-safe, légère).
 * Signature visuelle « voice-first ». Aucune donnée sensible.
 */
export function VoiceWave({ bars = 5, className, barClassName, active = true }: VoiceWaveProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-1", className)}
      role="img"
      aria-label="Onde vocale"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-1.5 rounded-full bg-vert-light",
            active ? `animate-wave-${(i % 5) + 1}` : "h-2",
            barClassName
          )}
          style={{ height: active ? "1.5rem" : undefined }}
        />
      ))}
    </div>
  );
}
