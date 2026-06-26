"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Shield, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/home",
    label: "Accueil",
    icon: Home,
  },
  {
    href: "/wallet",
    label: "Crédits",
    icon: Wallet,
  },
  {
    href: "/safety",
    label: "Sécurité",
    icon: Shield,
  },
  {
    href: "/admin",
    label: "Admin",
    icon: Settings,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-noir/95 backdrop-blur-md border-t border-noir-border safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl",
                "transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-blanc-chaud"
                  : "text-gris-texte hover:text-blanc-chaud/70"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  isActive && "bg-vert-congo/20"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-vert-light" : "text-gris-texte"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-blanc-chaud" : "text-gris-texte"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
