"use client";

import { CONTACT } from "@/config/contact";
import { getCallHref } from "@/lib/call";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const BTN = "flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition";

export function CallButton({ className }: { className?: string }) {
  const href = getCallHref();
  if (!href) {
    return (
      <span className={cn(BTN, "cursor-not-allowed border border-olive/25 text-gris-doux", className)} aria-disabled>
        📞 Numéro bientôt disponible
      </span>
    );
  }
  return (
    <a href={href} onClick={() => analytics.contactClick("call")} className={cn(BTN, "bg-terra text-noir-abysse hover:bg-terra-dark", className)}>
      📞 Appeler
    </a>
  );
}

export function WhatsAppButton({ className }: { className?: string }) {
  const href = getWhatsAppHref();
  if (!href) {
    return (
      <span className={cn(BTN, "cursor-not-allowed border border-olive/25 text-gris-doux", className)} aria-disabled>
        💬 WhatsApp bientôt disponible
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => analytics.contactClick("whatsapp")} className={cn(BTN, "bg-olive text-ivoire hover:bg-olive-dark", className)}>
      💬 WhatsApp
    </a>
  );
}

/** Bloc contact rapide : appel / WhatsApp / email / bêta. */
export function ContactOptions({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <CallButton />
      <WhatsAppButton />
      <a
        href={`mailto:${CONTACT.email}`}
        onClick={() => analytics.contactClick("email")}
        className={cn(BTN, "border border-olive/40 text-ivoire hover:border-terra/60 hover:text-terra")}
      >
        ✉️ {CONTACT.email}
      </a>
      <a href="/beta" className={cn(BTN, "border border-terra/40 text-terra hover:bg-terra hover:text-noir-abysse")}>
        ✦ Rejoindre la bêta
      </a>
    </div>
  );
}
