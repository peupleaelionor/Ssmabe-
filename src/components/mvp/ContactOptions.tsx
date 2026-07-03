"use client";

import { CONTACT } from "@/config/contact";
import { getCallHref, getSmsHref } from "@/lib/call";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const BTN = "flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-semibold transition";

type ButtonProps = { className?: string; label?: string };

export function CallButton({ className, label = "Appeler pour rejoindre" }: ButtonProps) {
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
      📞 {label}
    </a>
  );
}

export function SmsButton({ className, label = "Rejoindre par SMS" }: ButtonProps) {
  const href = getSmsHref();
  if (!href) return null; // le fallback SMS n'apparaît que si le numéro existe
  return (
    <a href={href} onClick={() => analytics.contactClick("sms")} className={cn(BTN, "border border-olive/40 text-ivoire hover:border-terra/60", className)}>
      ✉️ {label}
    </a>
  );
}

export function WhatsAppButton({ className, label = "Rejoindre par WhatsApp" }: ButtonProps) {
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
      💬 {label}
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
        ✦ Entrer sur le site
      </a>
      <SmsButton className="sm:col-span-2" />
      <p className="sm:col-span-2 text-center text-[11px] leading-relaxed text-gris-doux/80">
        Ton numéro ne sera jamais affiché publiquement · Contact uniquement pour la bêta · 18+ uniquement · Consentement obligatoire.
      </p>
    </div>
  );
}
