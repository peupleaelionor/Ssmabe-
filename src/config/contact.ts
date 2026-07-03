/**
 * Contact — source unique, pilotée par variables d'environnement.
 * Renseigner les env vars active automatiquement appel/WhatsApp/SMS.
 * Ne JAMAIS coder un numéro en dur ailleurs.
 */
const PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER ?? "";
const WHATSAPP = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER ?? "";

export const CONTACT = {
  phone: PHONE,
  whatsapp: WHATSAPP,
  email: "hello@songisongi.app",
  callEnabled: PHONE.length > 5,
  whatsappEnabled: WHATSAPP.length > 5,
} as const;

export function isCallReady(): boolean {
  return CONTACT.callEnabled;
}
export function isWhatsAppReady(): boolean {
  return CONTACT.whatsappEnabled;
}

/** Message WhatsApp prérempli pour rejoindre la bêta. */
export const WHATSAPP_JOIN_MESSAGE =
  "Bonjour, je veux rejoindre la première vague Songi Songi Mabé. Mon prénom : … Ma ville : … Ma langue : …";

/** Corps SMS fallback. */
export const SMS_JOIN_BODY = "Je veux rejoindre Songi Songi Mabé";
