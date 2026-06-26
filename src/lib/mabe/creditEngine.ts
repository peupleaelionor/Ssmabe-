/**
 * Mabé Credit Engine — façade
 * --------------------------------------------------------------
 * Crédits d'appel, packs et wallet. Aucun paiement réel branché
 * en V1 — les types et fonctions sont prêts pour Stripe / mobile money.
 */
export {
  CREDIT_PACKS,
  getWalletBalance,
  deductCredits,
  addCredits,
  canMakeCall,
  getFreeCallsRemaining,
  useFreeCall,
  getTransactionHistory,
  getAllPacks,
  COUNTRY_PRICING,
  getPricingForCountry,
  formatPrice,
} from "@/lib/credit-engine";

export type { CountryPricing } from "@/lib/credit-engine";
