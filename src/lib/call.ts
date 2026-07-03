/** Génération lien d'appel — prêt, activé par config/contact. */
import { CONTACT, isCallReady } from "@/config/contact";

export function getCallHref(): string | null {
  if (!isCallReady()) return null;
  return `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`;
}
