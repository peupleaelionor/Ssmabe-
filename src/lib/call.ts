/** Liens appel & SMS — prêts, activés par les env vars (config/contact). */
import { CONTACT, isCallReady, SMS_JOIN_BODY } from "@/config/contact";

const clean = (n: string) => n.replace(/[^+\d]/g, "");

export function getCallHref(): string | null {
  if (!isCallReady()) return null;
  return `tel:${clean(CONTACT.phone)}`;
}

export function getSmsHref(): string | null {
  if (!isCallReady()) return null;
  return `sms:${clean(CONTACT.phone)}?body=${encodeURIComponent(SMS_JOIN_BODY)}`;
}
