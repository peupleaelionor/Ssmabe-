/** Lien WhatsApp — prérempli bêta, activé par env var (config/contact). */
import { CONTACT, isWhatsAppReady, WHATSAPP_JOIN_MESSAGE } from "@/config/contact";

export function getWhatsAppHref(message: string = WHATSAPP_JOIN_MESSAGE): string | null {
  if (!isWhatsAppReady()) return null;
  const num = CONTACT.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
