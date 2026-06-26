"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { APP_NAME } from "@/lib/constants/config";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  showCredits?: boolean;
  showSafety?: boolean;
  transparent?: boolean;
  className?: string;
}

export function Header({
  title,
  showBack = false,
  backHref,
  showCredits = false,
  showSafety = false,
  transparent = false,
  className,
}: HeaderProps) {
  const router = useRouter();
  const { wallet } = useAppStore();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 px-4 py-3 flex items-center justify-between",
        !transparent && "bg-noir/90 backdrop-blur-md border-b border-noir-border",
        transparent && "bg-transparent",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className={cn(
              "p-2 rounded-xl transition-colors",
              "hover:bg-noir-light active:scale-95",
              "text-gris-texte hover:text-blanc-chaud"
            )}
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {title ? (
          <h1 className="text-base font-semibold text-blanc-chaud tracking-tight">
            {title}
          </h1>
        ) : (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-vert-congo flex items-center justify-center">
              <span className="text-sm">🎙</span>
            </div>
            <span className="text-sm font-bold text-blanc-chaud hidden xs:block">
              {APP_NAME}
            </span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showCredits && (
          <Link
            href="/wallet"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
              "bg-noir-light border border-noir-border",
              "text-xs font-medium text-blanc-chaud",
              "hover:border-cuivre/50 transition-colors"
            )}
          >
            <Coins className="w-3.5 h-3.5 text-cuivre" />
            <span>{wallet.balance}</span>
          </Link>
        )}

        {showSafety && (
          <Link
            href="/safety"
            className={cn(
              "p-2 rounded-xl transition-colors",
              "hover:bg-noir-light text-gris-texte hover:text-blanc-chaud"
            )}
            aria-label="Sécurité"
          >
            <Shield className="w-5 h-5" />
          </Link>
        )}
      </div>
    </header>
  );
}
