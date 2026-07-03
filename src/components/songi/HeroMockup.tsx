import { VoiceWave } from "./VoiceWave";
import { cn } from "@/lib/utils";

export interface HeroMockupProps {
  className?: string;
}

/**
 * Maquette de téléphone « Appel en cours / Voix anonyme ».
 * 100% composant (pas d'image), responsive. Aucun numéro affiché.
 */
export function HeroMockup({ className }: HeroMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[260px] rounded-[2.5rem] border border-noir-border bg-noir p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-noir-border" aria-hidden />
      <div className="rounded-3xl bg-gradient-to-b from-vert-dark to-noir p-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-vert-light">Appel en cours</p>
        <div className="my-6 flex flex-col items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-vert-congo text-2xl">🎙</span>
          <p className="text-sm font-bold text-blanc-chaud">Voix anonyme</p>
          <p className="text-xs text-gris-texte">Numéro protégé · 02:14</p>
        </div>
        <VoiceWave className="my-4" />
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-noir-card text-lg">🔇</span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger text-lg">⏹</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-noir-card text-lg">🚩</span>
        </div>
      </div>
    </div>
  );
}
