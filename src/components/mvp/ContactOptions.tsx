"use client";

import { CONTACT } from "@/config/contact";
import { TelechatIcon, type TelechatIconName } from "@/components/brand/TelechatAssets";
import { getCallHref, getSmsHref } from "@/lib/call";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const BTN = "group flex min-h-[3.75rem] w-full items-center justify-between gap-3 rounded-[1.65rem] border px-4 py-3.5 text-left text-sm font-semibold transition active:scale-[0.99] sm:min-h-14 sm:px-5";
const DISABLED = "cursor-not-allowed border-olive/20 bg-white/[0.025] text-gris-doux/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
const BADGE = "ml-auto shrink-0 rounded-full bg-olive/18 px-2.5 py-1 text-[10px] font-semibold text-olive sm:text-[11px]";

type ButtonProps = { className?: string; label?: string };
type Tone = "terra" | "olive" | "disabled" | "ghost";

function ButtonShell({ icon, label, tone, badge, className }: { icon: TelechatIconName; label: string; tone: Tone; badge?: string; className?: string }) {
  const toneClass = {
    terra: "border-terra/55 text-ivoire hover:border-terra hover:bg-terra/10",
    olive: "border-olive/55 text-ivoire hover:border-olive hover:bg-olive/10",
    disabled: DISABLED,
    ghost: "border-olive/30 text-ivoire hover:border-terra/50 hover:text-terra",
  }[tone];
  const iconClass = {
    terra: "text-terra",
    olive: "text-olive",
    disabled: "text-gris-doux/60",
    ghost: "text-terra",
  }[tone];

  return (
    <span className={cn(BTN, toneClass, className)}>
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.035]">
          <TelechatIcon name={icon} className={iconClass} />
        </span>
        <span className="truncate text-[0.95rem] leading-none sm:text-sm">{label}</span>
      </span>
      {badge ? <span className={BADGE}>{badge}</span> : <span className="text-xl leading-none opacity-60">›</span>}
    </span>
  );
}

export function CallButton({ className, label = "Appeler pour rejoindre" }: ButtonProps) {
  const href = getCallHref();
  if (!href) {
    return <ButtonShell icon="call" label={label} tone="disabled" badge="Bientôt disponible" className={className} />;
  }
  return (
    <a href={href} onClick={() => analytics.contactClick("call")}>
      <ButtonShell icon="call" label={label} tone="terra" className={className} />
    </a>
  );
}

export function SmsButton({ className, label = "Rejoindre par SMS" }: ButtonProps) {
  const href = getSmsHref();
  if (!href) return null;
  return (
    <a href={href} onClick={() => analytics.contactClick("sms")}>
      <ButtonShell icon="language" label={label} tone="ghost" className={className} />
    </a>
  );
}

export function WhatsAppButton({ className, label = "Rejoindre par WhatsApp" }: ButtonProps) {
  const href = getWhatsAppHref();
  if (!href) {
    return <ButtonShell icon="whatsapp" label={label} tone="disabled" badge="Bientôt disponible" className={className} />;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => analytics.contactClick("whatsapp")}>
      <ButtonShell icon="whatsapp" label={label} tone="olive" className={className} />
    </a>
  );
}

export function EnterSiteButton({ className, label = "Entrer sur le site" }: ButtonProps) {
  return (
    <a href="/beta?source=hero">
      <ButtonShell icon="web" label={label} tone="terra" className={className} />
    </a>
  );
}

export function CreateCircleButton({ className, label = "Créer mon cercle" }: ButtonProps) {
  return (
    <a href="/create">
      <ButtonShell icon="circle" label={label} tone="olive" className={className} />
    </a>
  );
}

export function ContactOptions({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <CallButton />
      <WhatsAppButton />
      <a href={`mailto:${CONTACT.email}`} onClick={() => analytics.contactClick("email")}>
        <ButtonShell icon="language" label={CONTACT.email} tone="ghost" />
      </a>
      <EnterSiteButton />
      <SmsButton className="sm:col-span-2" />
      <p className="sm:col-span-2 text-center text-[11px] leading-relaxed text-gris-doux/80">
        Ton numéro ne sera jamais affiché publiquement · Contact uniquement pour la bêta · 18+ uniquement · Consentement obligatoire.
      </p>
    </div>
  );
}
