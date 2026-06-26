import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  suffix?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "#0F3D32",
  className,
  suffix,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl border border-noir-border bg-noir-card",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-gris-texte uppercase tracking-wide">
          {title}
        </span>
        {Icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${iconColor}20` }}
          >
            <Icon className="w-4 h-4" style={{ color: iconColor }} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-blanc-chaud tabular-nums">
          {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
        </span>
        {suffix && (
          <span className="text-sm text-gris-texte">{suffix}</span>
        )}
      </div>

      {change && (
        <p
          className={cn(
            "text-xs mt-1.5 font-medium",
            changeType === "positive" && "text-vert-light",
            changeType === "negative" && "text-red-400",
            changeType === "neutral" && "text-gris-texte"
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}
