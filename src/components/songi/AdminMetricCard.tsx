import { cn } from "@/lib/utils";

export interface AdminMetricCardProps {
  label: string;
  value: string | number;
  hint?: string;
  trend?: "up" | "down" | "flat";
  tone?: "default" | "success" | "danger" | "warning";
  className?: string;
}

const TONE: Record<NonNullable<AdminMetricCardProps["tone"]>, string> = {
  default: "text-blanc-chaud",
  success: "text-success",
  danger: "text-danger",
  warning: "text-cuivre",
};

const TREND_ICON = { up: "▲", down: "▼", flat: "■" } as const;

/** Carte métrique pour le dashboard admin. */
export function AdminMetricCard({ label, value, hint, trend, tone = "default", className }: AdminMetricCardProps) {
  return (
    <div className={cn("rounded-2xl border border-noir-border bg-noir-card p-5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-gris-texte">{label}</span>
        {trend ? (
          <span
            className={cn(
              "text-xs",
              trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-gris-texte"
            )}
          >
            {TREND_ICON[trend]}
          </span>
        ) : null}
      </div>
      <div className={cn("mt-2 text-2xl font-black", TONE[tone])}>{value}</div>
      {hint ? <p className="mt-1 text-xs text-gris-texte">{hint}</p> : null}
    </div>
  );
}
