import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PrimaryCTAProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full bg-vert-congo px-7 py-3.5 text-sm font-semibold text-blanc-chaud transition hover:bg-vert-light active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vert-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir";

/** CTA primaire (pill vert). Rendu en lien ou bouton. */
export function PrimaryCTA({ href, onClick, children, className, type = "button", disabled }: PrimaryCTAProps) {
  if (href) {
    return (
      <Link href={href} className={cn(BASE, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(BASE, className)}>
      {children}
    </button>
  );
}
