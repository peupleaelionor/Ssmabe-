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
