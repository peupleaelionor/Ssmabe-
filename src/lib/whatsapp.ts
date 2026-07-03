/** Génération lien WhatsApp — prêt, activé par config/contact. */
import { CONTACT, isWhatsAppReady } from "@/config/contact";

export function getWhatsAppHref(message = "Bonjour Songi Songi Mabé 👋"): string | null {
  if (!isWhatsAppReady()) return null;
  const num = CONTACT.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
