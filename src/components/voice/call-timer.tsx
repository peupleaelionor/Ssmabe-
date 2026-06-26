"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";

interface CallTimerProps {
  seconds: number;
  onTick?: (seconds: number) => void;
  running?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CallTimer({
  seconds,
  onTick,
  running = true,
  className,
  size = "md",
}: CallTimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
      onTick?.(secondsRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, onTick]);

  const sizeClasses = {
    sm: "text-base font-mono font-medium",
    md: "text-2xl font-mono font-semibold",
    lg: "text-4xl font-mono font-bold tracking-widest",
  };

  return (
    <span
      className={cn(
        sizeClasses[size],
        "text-blanc-chaud tabular-nums",
        className
      )}
    >
      {formatDuration(seconds)}
    </span>
  );
}
