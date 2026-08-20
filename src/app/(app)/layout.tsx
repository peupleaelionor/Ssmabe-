import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { flag } from "@/config/flags";

/**
 * Layout du groupe applicatif (home/call/wallet/admin/onboarding/demo).
 * Ces écrans sont encore mockés → NON exposés en prod tant que le vrai produit
 * n'est pas prêt (point 55). Gate unique via FLAGS.appEnabled (défaut OFF).
 * Ferme notamment /admin qui n'avait aucune garde.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  if (!flag("appEnabled")) notFound();

  return (
    <div className="min-h-screen bg-noir">
      <main className="max-w-md mx-auto pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
