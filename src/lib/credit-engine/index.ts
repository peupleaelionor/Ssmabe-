import {
  CallMode,
  type CreditWallet,
  type CreditPack,
  type Transaction,
} from "@/lib/types";
import { MAX_FREE_CALLS_PER_DAY, CREDIT_COSTS } from "@/lib/constants/config";

// ── Credit packs ───────────────────────────────────────────

export const CREDIT_PACKS: { africa: CreditPack[]; diaspora: CreditPack[] } = {
  africa: [
    {
      id: "af_decouverte",
      name: "Découverte",
      label: "Pack Découverte",
      credits: 30,
      priceUSD: 1.5,
      priceLocal: 750,
      localCurrency: "CDF",
      bonus: 5,
      popular: false,
      targetRegion: "africa",
      description: "Pour commencer. 30 crédits + 5 bonus.",
    },
    {
      id: "af_mboka",
      name: "Mboka",
      label: "Pack Mboka",
      credits: 100,
      priceUSD: 4.0,
      priceLocal: 2000,
      localCurrency: "CDF",
      bonus: 20,
      popular: true,
      targetRegion: "africa",
      description: "Le plus populaire. 100 crédits + 20 bonus.",
    },
    {
      id: "af_serieux",
      name: "Sérieux",
      label: "Pack Sérieux",
      credits: 300,
      priceUSD: 10.0,
      priceLocal: 5000,
      localCurrency: "CDF",
      bonus: 80,
      popular: false,
      targetRegion: "africa",
      description: "Pour les rencontres sérieuses. 300 crédits + 80 bonus.",
    },
  ],
  diaspora: [
    {
      id: "dia_diaspora",
      name: "Diaspora",
      label: "Pack Diaspora",
      credits: 150,
      priceUSD: 9.99,
      bonus: 30,
      popular: true,
      targetRegion: "diaspora",
      description: "Connexion premium patrie-diaspora. 150 crédits + 30 bonus.",
    },
    {
      id: "dia_premium",
      name: "Premium",
      label: "Pack Premium",
      credits: 500,
      priceUSD: 29.99,
      bonus: 150,
      popular: false,
      targetRegion: "diaspora",
      description: "L'expérience complète. 500 crédits + 150 bonus.",
    },
  ],
};

// ── In-memory wallet store ─────────────────────────────────

const walletStore = new Map<string, CreditWallet>();
const transactionStore = new Map<string, Transaction[]>();

function getOrCreateWallet(userId: string): CreditWallet {
  const existing = walletStore.get(userId);
  if (existing) return existing;

  const wallet: CreditWallet = {
    id: `wallet_${userId}`,
    userId,
    balance: 0,
    freeCallsRemaining: MAX_FREE_CALLS_PER_DAY,
    freeCallsResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    totalSpent: 0,
    totalPurchased: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  walletStore.set(userId, wallet);
  return wallet;
}

// ── Public API ─────────────────────────────────────────────

export function getWalletBalance(userId: string): CreditWallet {
  return getOrCreateWallet(userId);
}

export function deductCredits(userId: string, amount: number): boolean {
  const wallet = getOrCreateWallet(userId);

  if (wallet.balance < amount) return false;

  const before = wallet.balance;
  wallet.balance -= amount;
  wallet.totalSpent += amount;
  wallet.updatedAt = new Date();
  walletStore.set(userId, wallet);

  const tx: Transaction = {
    id: `tx_${Date.now()}`,
    userId,
    type: "deduct",
    amount: -amount,
    balanceBefore: before,
    balanceAfter: wallet.balance,
    description: `Appel vocal – ${amount} crédit(s)`,
    createdAt: new Date(),
  };
  const txList = transactionStore.get(userId) ?? [];
  transactionStore.set(userId, [tx, ...txList]);

  return true;
}

export function addCredits(userId: string, amount: number, packId: string): Transaction {
  const wallet = getOrCreateWallet(userId);
  const before = wallet.balance;
  wallet.balance += amount;
  wallet.totalPurchased += amount;
  wallet.updatedAt = new Date();
  walletStore.set(userId, wallet);

  const tx: Transaction = {
    id: `tx_${Date.now()}`,
    userId,
    type: "purchase",
    amount,
    balanceBefore: before,
    balanceAfter: wallet.balance,
    description: `Achat pack ${packId} – ${amount} crédits`,
    metadata: { packId },
    createdAt: new Date(),
  };
  const txList = transactionStore.get(userId) ?? [];
  transactionStore.set(userId, [tx, ...txList]);

  return tx;
}

export function canMakeCall(userId: string, mode: CallMode): boolean {
  const wallet = getOrCreateWallet(userId);
  const cost = CREDIT_COSTS[mode];

  // Free modes – check daily free calls
  if (cost === 0) {
    resetFreeCallsIfNeeded(userId, wallet);
    return wallet.freeCallsRemaining > 0;
  }

  // Paid modes – check balance
  return wallet.balance >= cost;
}

export function getFreeCallsRemaining(userId: string): number {
  const wallet = getOrCreateWallet(userId);
  resetFreeCallsIfNeeded(userId, wallet);
  return wallet.freeCallsRemaining;
}

export function useFreeCall(userId: string): boolean {
  const wallet = getOrCreateWallet(userId);
  resetFreeCallsIfNeeded(userId, wallet);

  if (wallet.freeCallsRemaining <= 0) return false;

  wallet.freeCallsRemaining -= 1;
  wallet.updatedAt = new Date();
  walletStore.set(userId, wallet);
  return true;
}

function resetFreeCallsIfNeeded(userId: string, wallet: CreditWallet): void {
  if (new Date() >= wallet.freeCallsResetAt) {
    wallet.freeCallsRemaining = MAX_FREE_CALLS_PER_DAY;
    wallet.freeCallsResetAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    wallet.updatedAt = new Date();
    walletStore.set(userId, wallet);
  }
}

export function getTransactionHistory(userId: string): Transaction[] {
  return transactionStore.get(userId) ?? [];
}

export function getAllPacks(): CreditPack[] {
  return [...CREDIT_PACKS.africa, ...CREDIT_PACKS.diaspora];
}

// ── Country Pricing ────────────────────────────────────────

export interface CountryPricing {
  countryCode: string;
  currency: string;
  freeCallsPerDay: number;
  creditCostPerMinute: number; // en unités locales
  packs: {
    id: string;
    name: string;
    credits: number;
    price: number;
    currency: string;
    popular?: boolean;
  }[];
  paymentMethods: string[];
}

export const COUNTRY_PRICING: Record<string, CountryPricing> = {
  CD: {
    countryCode: "CD",
    currency: "CDF",
    freeCallsPerDay: 3,
    creditCostPerMinute: 50,
    packs: [
      { id: "cd_decouverte", name: "Découverte", credits: 30, price: 750, currency: "CDF" },
      { id: "cd_mboka", name: "Mboka", credits: 100, price: 2000, currency: "CDF", popular: true },
      { id: "cd_serieux", name: "Sérieux", credits: 300, price: 5000, currency: "CDF" },
    ],
    paymentMethods: ["mpesa", "airtel_money", "orange_money"],
  },
  CG: {
    countryCode: "CG",
    currency: "XAF",
    freeCallsPerDay: 3,
    creditCostPerMinute: 30,
    packs: [
      { id: "cg_decouverte", name: "Découverte", credits: 30, price: 500, currency: "XAF" },
      { id: "cg_mboka", name: "Mboka", credits: 100, price: 1500, currency: "XAF", popular: true },
      { id: "cg_serieux", name: "Sérieux", credits: 300, price: 4000, currency: "XAF" },
    ],
    paymentMethods: ["airtel_money", "mtn_money", "orange_money"],
  },
  FR: {
    countryCode: "FR",
    currency: "EUR",
    freeCallsPerDay: 1,
    creditCostPerMinute: 0.05,
    packs: [
      { id: "fr_decouverte", name: "Découverte", credits: 30, price: 1.99, currency: "EUR" },
      { id: "fr_diaspora", name: "Diaspora", credits: 150, price: 9.99, currency: "EUR", popular: true },
      { id: "fr_premium", name: "Premium", credits: 500, price: 29.99, currency: "EUR" },
    ],
    paymentMethods: ["stripe", "paypal", "paylib"],
  },
  BE: {
    countryCode: "BE",
    currency: "EUR",
    freeCallsPerDay: 1,
    creditCostPerMinute: 0.05,
    packs: [
      { id: "be_decouverte", name: "Découverte", credits: 30, price: 1.99, currency: "EUR" },
      { id: "be_diaspora", name: "Diaspora", credits: 150, price: 9.99, currency: "EUR", popular: true },
      { id: "be_premium", name: "Premium", credits: 500, price: 29.99, currency: "EUR" },
    ],
    paymentMethods: ["stripe", "paypal", "paylib"],
  },
  CA: {
    countryCode: "CA",
    currency: "CAD",
    freeCallsPerDay: 1,
    creditCostPerMinute: 0.07,
    packs: [
      { id: "ca_decouverte", name: "Découverte", credits: 30, price: 2.49, currency: "CAD" },
      { id: "ca_diaspora", name: "Diaspora", credits: 150, price: 12.99, currency: "CAD", popular: true },
      { id: "ca_premium", name: "Premium", credits: 500, price: 34.99, currency: "CAD" },
    ],
    paymentMethods: ["stripe", "paypal", "interac"],
  },
  CI: {
    countryCode: "CI",
    currency: "XOF",
    freeCallsPerDay: 3,
    creditCostPerMinute: 25,
    packs: [
      { id: "ci_decouverte", name: "Découverte", credits: 30, price: 500, currency: "XOF" },
      { id: "ci_mboka", name: "Mboka", credits: 100, price: 1500, currency: "XOF", popular: true },
      { id: "ci_serieux", name: "Sérieux", credits: 300, price: 4000, currency: "XOF" },
    ],
    paymentMethods: ["orange_money", "mtn_money", "wave"],
  },
  CM: {
    countryCode: "CM",
    currency: "XAF",
    freeCallsPerDay: 3,
    creditCostPerMinute: 30,
    packs: [
      { id: "cm_decouverte", name: "Découverte", credits: 30, price: 500, currency: "XAF" },
      { id: "cm_mboka", name: "Mboka", credits: 100, price: 1500, currency: "XAF", popular: true },
      { id: "cm_serieux", name: "Sérieux", credits: 300, price: 4000, currency: "XAF" },
    ],
    paymentMethods: ["mtn_money", "orange_money"],
  },
  SN: {
    countryCode: "SN",
    currency: "XOF",
    freeCallsPerDay: 3,
    creditCostPerMinute: 25,
    packs: [
      { id: "sn_decouverte", name: "Découverte", credits: 30, price: 500, currency: "XOF" },
      { id: "sn_dakar", name: "Dakar", credits: 100, price: 1500, currency: "XOF", popular: true },
      { id: "sn_serieux", name: "Sérieux", credits: 300, price: 4000, currency: "XOF" },
    ],
    paymentMethods: ["orange_money", "wave", "paypal"],
  },
  MA: {
    countryCode: "MA",
    currency: "MAD",
    freeCallsPerDay: 2,
    creditCostPerMinute: 0.5,
    packs: [
      { id: "ma_decouverte", name: "Découverte", credits: 30, price: 10, currency: "MAD" },
      { id: "ma_maroc", name: "Maroc", credits: 100, price: 30, currency: "MAD", popular: true },
      { id: "ma_premium", name: "Premium", credits: 300, price: 80, currency: "MAD" },
    ],
    paymentMethods: ["stripe", "paypal"],
  },
  DZ: {
    countryCode: "DZ",
    currency: "DZD",
    freeCallsPerDay: 2,
    creditCostPerMinute: 5,
    packs: [
      { id: "dz_decouverte", name: "Découverte", credits: 30, price: 100, currency: "DZD" },
      { id: "dz_algerie", name: "Algérie", credits: 100, price: 300, currency: "DZD", popular: true },
      { id: "dz_premium", name: "Premium", credits: 300, price: 800, currency: "DZD" },
    ],
    paymentMethods: ["stripe", "paypal"],
  },
  NG: {
    countryCode: "NG",
    currency: "NGN",
    freeCallsPerDay: 2,
    creditCostPerMinute: 10,
    packs: [
      { id: "ng_decouverte", name: "Découverte", credits: 30, price: 200, currency: "NGN" },
      { id: "ng_naija", name: "Naija", credits: 100, price: 600, currency: "NGN", popular: true },
      { id: "ng_premium", name: "Premium", credits: 300, price: 1500, currency: "NGN" },
    ],
    paymentMethods: ["paystack", "flutterwave", "stripe"],
  },
  KE: {
    countryCode: "KE",
    currency: "KES",
    freeCallsPerDay: 2,
    creditCostPerMinute: 2,
    packs: [
      { id: "ke_decouverte", name: "Découverte", credits: 30, price: 50, currency: "KES" },
      { id: "ke_nairobi", name: "Nairobi", credits: 100, price: 150, currency: "KES", popular: true },
      { id: "ke_premium", name: "Premium", credits: 300, price: 400, currency: "KES" },
    ],
    paymentMethods: ["mpesa_ke", "stripe", "paypal"],
  },
};

export function getPricingForCountry(countryCode: string): CountryPricing {
  return COUNTRY_PRICING[countryCode] ?? COUNTRY_PRICING["FR"];
}

/**
 * Formate un montant dans une devise locale.
 * Exemples : "1 500 CDF", "1,99 €", "500 NGN"
 */
export function formatPrice(amount: number, currency: string): string {
  const euroCurrencies = ["EUR"];
  const isEuro = euroCurrencies.includes(currency);

  if (isEuro) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // Pour les devises non-euro : afficher "1 500 CDF"
  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} ${currency}`;
}
