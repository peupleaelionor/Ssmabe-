"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CallMode, type Mode } from "@/lib/types";
import { MODES_LIST } from "@/lib/constants/modes";
import { Check, Lock } from "lucide-react";

interface ModeSelectorProps {
  selected: CallMode;
  onSelect: (mode: CallMode) => void;
  availableModes?: CallMode[];
  className?: string;
}

export function ModeSelector({
  selected,
  onSelect,
  availableModes,
  className,
}: ModeSelectorProps) {
  const modes = availableModes
    ? MODES_LIST.filter((m) => availableModes.includes(m.id))
    : MODES_LIST;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {modes.map((mode, i) => (
        <ModeCard
          key={mode.id}
          mode={mode}
          selected={selected === mode.id}
          onSelect={onSelect}
          delay={i * 0.06}
        />
      ))}
    </div>
  );
}

interface ModeCardProps {
  mode: Mode;
  selected: boolean;
  onSelect: (mode: CallMode) => void;
  delay?: number;
}

function ModeCard({ mode, selected, onSelect, delay = 0 }: ModeCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={() => onSelect(mode.id)}
      className={cn(
        "relative w-full p-4 rounded-2xl border transition-all duration-200 text-left",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-vert-congo",
        "active:scale-[0.98]",
        selected
          ? "border-vert-congo bg-vert-congo/10 shadow-congo-glow"
          : "border-noir-border bg-noir-card hover:border-vert-congo/30"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{mode.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blanc-chaud text-sm">
                {mode.label}
              </span>
              {!mode.free && (
                <span className="flex items-center gap-0.5 text-xs text-gris-texte">
                  <Lock className="w-2.5 h-2.5" />
                  {mode.creditCost} cr/min
                </span>
              )}
              {mode.free && (
                <span className="text-xs text-vert-light font-medium bg-vert-congo/20 px-2 py-0.5 rounded-full">
                  Gratuit
                </span>
              )}
            </div>
            <p className="text-xs text-gris-texte mt-0.5 leading-relaxed">
              {mode.description}
            </p>
          </div>
        </div>

        {selected && (
          <div className="w-5 h-5 rounded-full bg-vert-congo flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-blanc-chaud" />
          </div>
        )}
      </div>

      {/* Safety indicator */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-xs text-gris-texte">Sécurité</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-1 rounded-full",
                i < mode.safetyLevel ? "bg-vert-congo" : "bg-noir-border"
              )}
            />
          ))}
        </div>
      </div>
    </motion.button>
  );
}
