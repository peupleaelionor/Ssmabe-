import { cn } from "@/lib/utils";

export type TelechatIconName =
  | "call"
  | "whatsapp"
  | "web"
  | "circle"
  | "lock"
  | "shield"
  | "globe"
  | "language"
  | "wave";

const STROKE = "currentColor";

/** Premium line icon set — inline SVG, no network request, old-phone friendly. */
export function TelechatIcon({ name, className }: { name: TelechatIconName; className?: string }) {
  const common = {
    className: cn("h-5 w-5 shrink-0", className),
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  if (name === "call") {
    return (
      <svg {...common}>
        <path d="M7.2 4.7 9 3.8c.8-.4 1.7-.1 2.1.7l1 2c.3.7.2 1.5-.4 2l-1.1 1c.8 1.7 2.1 3 3.9 3.9l1-1.1c.5-.6 1.3-.7 2-.4l2 1c.8.4 1.1 1.3.7 2.1l-.9 1.8c-.4.8-1.3 1.2-2.2 1C11 16.7 7.3 13 6.2 6.8c-.2-.8.2-1.7 1-2.1Z" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M5.5 19.2 6.4 16A7.5 7.5 0 1 1 9 18.1l-3.5 1.1Z" stroke={STROKE} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.2 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.4.5c-.1.2-.2.3 0 .6.3.5.8 1.1 1.3 1.5.6.5 1.2.8 1.6 1 .3.1.4.1.6-.1l.6-.7c.2-.2.4-.3.7-.2l1.5.7c.3.1.4.3.4.5 0 .5-.3 1.4-.7 1.8-.5.5-1.5.7-3.2.1-2.6-.9-5.1-3.2-6-5.7-.5-1.3.1-2 .4-2Z" stroke={STROKE} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "web" || name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.3" stroke={STROKE} strokeWidth="1.8" />
        <path d="M3.9 12h16.2M12 3.7c2.1 2.2 3.1 5 3.1 8.3 0 3.3-1 6.1-3.1 8.3M12 3.7c-2.1 2.2-3.1 5-3.1 8.3 0 3.3 1 6.1 3.1 8.3" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "circle") {
    return (
      <svg {...common}>
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 19.2c.2-3 1.7-4.7 4-4.7s3.8 1.7 4 4.7M12 19.2c.2-3 1.7-4.7 4-4.7s3.8 1.7 4 4.7" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg {...common}>
        <path d="M7.5 10V8a4.5 4.5 0 0 1 9 0v2" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
        <rect x="5" y="10" width="14" height="10" rx="2.5" stroke={STROKE} strokeWidth="1.8" />
        <path d="M12 14v2.5" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3.5 19 6v5.3c0 4.2-2.7 7.1-7 9.2-4.3-2.1-7-5-7-9.2V6l7-2.5Z" stroke={STROKE} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m8.8 12 2.1 2.1 4.5-4.6" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "language") {
    return (
      <svg {...common}>
        <path d="M4 5h9M8.5 5v2M6 17l4-10 4 10M7.2 14h5.6M14 9h6M17 9v1.5M15 20c2.3-1.4 4.1-3.8 4.5-6M20 20c-2.2-1.3-4.1-3.7-4.5-6" stroke={STROKE} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return <SoundWave className={className} />;
}

export function SoundWave({ className }: { className?: string }) {
  const bars = [12, 22, 32, 46, 58, 44, 34, 24, 14];
  return (
    <svg className={cn("h-12 w-28 text-terra", className)} viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {bars.map((height, index) => {
        const x = 28 + index * 13;
        const y = (72 - height) / 2;
        return <rect key={index} x={x} y={y} width="5" height={height} rx="2.5" fill="currentColor" opacity={0.45 + index * 0.055} />;
      })}
    </svg>
  );
}

/** Decorative Africa-first orb — CSS/SVG only, replaces heavy image assets. */
export function OrbitalGlobe({ className }: { className?: string }) {
  return (
    <svg className={cn("h-36 w-36 text-terra sm:h-44 sm:w-44", className)} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0694A" stopOpacity="0.55" />
          <stop offset="64%" stopColor="#E0694A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E0694A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="96" fill="url(#orbGlow)" />
      <circle cx="110" cy="110" r="58" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.5" />
      <ellipse cx="110" cy="110" rx="86" ry="27" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" transform="rotate(-13 110 110)" />
      <ellipse cx="110" cy="110" rx="82" ry="23" stroke="#A3AD7A" strokeOpacity="0.45" strokeWidth="1.2" transform="rotate(22 110 110)" />
      <path d="M94 61c9 15 12 31 8 49-3 16-11 29-23 41 18-3 31-12 39-28 8-17 7-34-2-51 20 12 33 30 36 53 2 16-2 31-12 45" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M66 109c18-8 35-9 51-3 16 6 29 17 39 34" stroke="#F4F2EC" strokeOpacity="0.28" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="56" cy="87" r="6" fill="#A3AD7A" />
      <circle cx="168" cy="134" r="7" fill="#E0694A" />
      <circle cx="129" cy="48" r="3" fill="#F4F2EC" opacity="0.7" />
      <circle cx="76" cy="160" r="3" fill="#F4F2EC" opacity="0.45" />
      <circle cx="110" cy="110" r="72" stroke="#F4F2EC" strokeOpacity="0.08" strokeDasharray="2 8" />
    </svg>
  );
}

export function PremiumDivider({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center gap-4 text-center">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-olive/25 to-olive/25" />
      <span className="text-terra" aria-hidden>✦</span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-olive">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-olive/25 to-olive/25" />
    </div>
  );
}
