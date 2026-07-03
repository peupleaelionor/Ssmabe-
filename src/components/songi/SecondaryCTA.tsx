import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SecondaryCTAProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border border-noir-border bg-transparent px-7 py-3.5 text-sm font-semibold text-blanc-chaud transition hover:border-vert-light hover:text-vert-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vert-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir";

/** CTA secondaire (contour, fantôme). */
export function SecondaryCTA({ href, onClick, children, className, type = "button" }: SecondaryCTAProps) {
  if (href) {
    return (
      <Link href={href} className={cn(BASE, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(BASE, className)}>
      {children}
    </button>
  );
}
