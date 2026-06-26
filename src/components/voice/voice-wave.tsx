"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceWaveProps {
  active?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
  barCount?: number;
}

const BAR_HEIGHTS_IDLE = [30, 50, 70, 55, 80, 55, 70, 50, 30];
const BAR_HEIGHTS_ACTIVE = [40, 70, 100, 85, 110, 85, 100, 70, 40];

export function VoiceWave({
  active = false,
  size = "md",
  color,
  className,
  barCount = 9,
}: VoiceWaveProps) {
  const sizeConfig = {
    sm: { barWidth: 3, barGap: 2, containerHeight: 32 },
    md: { barWidth: 4, barGap: 3, containerHeight: 48 },
    lg: { barWidth: 5, barGap: 4, containerHeight: 64 },
    xl: { barWidth: 7, barGap: 5, containerHeight: 96 },
  };

  const { barWidth, barGap, containerHeight } = sizeConfig[size];

  const idleHeights = BAR_HEIGHTS_IDLE.slice(0, barCount);
  const activeHeights = BAR_HEIGHTS_ACTIVE.slice(0, barCount);

  const barColor = color ?? (active ? "#0F3D32" : "#6F6A63");
  const activeBarColor = color ?? "#0F3D32";

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        className
      )}
      style={{ height: containerHeight, gap: barGap }}
      aria-label={active ? "Appel en cours" : "En attente"}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const maxHeight = active
          ? (activeHeights[i] ?? 60) / 100
          : (idleHeights[i] ?? 40) / 100;

        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: barWidth,
              backgroundColor: active ? activeBarColor : barColor,
              borderRadius: barWidth / 2,
            }}
            animate={
              active
                ? {
                    height: [
                      containerHeight * 0.15,
                      containerHeight * maxHeight,
                      containerHeight * 0.15,
                    ],
                    opacity: [0.6, 1, 0.6],
                  }
                : {
                    height: [
                      containerHeight * 0.1,
                      containerHeight * maxHeight * 0.5,
                      containerHeight * 0.1,
                    ],
                    opacity: [0.3, 0.6, 0.3],
                  }
            }
            transition={{
              duration: active ? 0.6 + i * 0.05 : 1.5 + i * 0.1,
              delay: i * (active ? 0.05 : 0.1),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
