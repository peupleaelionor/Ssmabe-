/**
 * Contact — source unique. Ne jamais coder le numéro en dur ailleurs.
 * Renseigner phone/whatsapp ici active automatiquement les boutons.
 */
export const CONTACT = {
  phone: "",
  whatsapp: "",
  email: "hello@songisongi.app",
  callEnabled: false,
  whatsappEnabled: false,
} as const;

export function isCallReady(): boolean {
  return CONTACT.callEnabled && CONTACT.phone.length > 5;
}
export function isWhatsAppReady(): boolean {
  return CONTACT.whatsappEnabled && CONTACT.whatsapp.length > 5;
}
