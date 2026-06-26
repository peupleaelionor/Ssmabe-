"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { CreditBalance } from "@/components/wallet/credit-balance";
import { CreditPacks } from "@/components/wallet/credit-packs";
import { useAppStore } from "@/lib/store";
import { addCredits, getTransactionHistory } from "@/lib/credit-engine";
import { Separator } from "@/components/ui/separator";
import { formatDuration, timeAgo } from "@/lib/utils";
import type { CreditPack, Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, Coins } from "lucide-react";

export default function WalletPage() {
  const { wallet, addToWallet } = useAppStore();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [purchaseSuccess, setPurchaseSuccess] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<"packs" | "history">("packs");

  React.useEffect(() => {
    const txs = getTransactionHistory("current_user");
    setTransactions(txs);
  }, [wallet]);

  const handlePurchase = (pack: CreditPack) => {
    const totalCredits = pack.credits + (pack.bonus ?? 0);
    const tx = addCredits("current_user", totalCredits, pack.id);
    addToWallet(totalCredits);
    setTransactions((prev) => [tx, ...prev]);
    setPurchaseSuccess(pack.label);
    setTimeout(() => setPurchaseSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-noir">
      <Header title="Mon Wallet" showBack />

      <div className="px-4 pt-4 pb-24">
        {/* Success toast */}
        {purchaseSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 rounded-xl bg-vert-congo/20 border border-vert-congo/30 text-sm text-vert-light text-center"
          >
            ✅ {purchaseSuccess} acheté avec succès !
          </motion.div>
        )}

        {/* Balance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <CreditBalance wallet={wallet} />
        </motion.div>

        {/* No hidden fees notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6 p-3 rounded-xl border border-vert-congo/20 bg-vert-congo/5"
        >
          <span className="text-sm">💚</span>
          <p className="text-xs text-vert-light">
            Aucun paiement caché. Tu achètes des crédits et tu les utilises quand tu veux.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl bg-noir-light border border-noir-border">
          <button
            onClick={() => setTab("packs")}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              tab === "packs"
                ? "bg-vert-congo text-blanc-chaud"
                : "text-gris-texte hover:text-blanc-chaud"
            )}
          >
            Acheter des crédits
          </button>
          <button
            onClick={() => setTab("history")}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              tab === "history"
                ? "bg-vert-congo text-blanc-chaud"
                : "text-gris-texte hover:text-blanc-chaud"
            )}
          >
            Historique
          </button>
        </div>

        {tab === "packs" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CreditPacks onPurchase={handlePurchase} />
          </motion.div>
        )}

        {tab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">💳</div>
                <p className="text-gris-texte text-sm">
                  Aucune transaction pour le moment.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-noir-card border border-noir-border"
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                        tx.type === "purchase"
                          ? "bg-vert-congo/20"
                          : "bg-red-500/20"
                      )}
                    >
                      {tx.type === "purchase" ? (
                        <ArrowDownLeft className="w-4 h-4 text-vert-light" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blanc-chaud truncate">
                        {tx.description}
                      </p>
                      <p className="text-xs text-gris-texte">
                        {timeAgo(tx.createdAt)}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "text-sm font-bold tabular-nums",
                        tx.amount > 0 ? "text-vert-light" : "text-red-400"
                      )}
                    >
                      {tx.amount > 0 ? "+" : ""}{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Credit explanation */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-blanc-chaud flex items-center gap-2">
            <Coins className="w-4 h-4 text-cuivre" />
            Comment fonctionnent les crédits ?
          </h3>
          <div className="space-y-2 text-xs text-gris-texte">
            <div className="flex items-start gap-2">
              <span className="text-vert-light shrink-0">✓</span>
              <span>Modes gratuits (Mboka, Lingala) : 3 appels gratuits par jour</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-vert-light shrink-0">✓</span>
              <span>Modes payants : crédits déduits par minute d&apos;appel</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-vert-light shrink-0">✓</span>
              <span>Les crédits n&apos;expirent jamais</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-vert-light shrink-0">✓</span>
              <span>Remboursement disponible en cas de problème technique</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
