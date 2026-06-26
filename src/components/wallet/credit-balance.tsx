"use client";

import { motion } from "framer-motion";
import { Coins, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCredits } from "@/lib/utils";
import type { CreditWallet } from "@/lib/types";
import { MAX_FREE_CALLS_PER_DAY } from "@/lib/constants/config";

interface CreditBalanceProps {
  wallet: CreditWallet;
  className?: string;
  compact?: boolean;
}

export function CreditBalance({ wallet, className, compact = false }: CreditBalanceProps) {
  const freeCallsUsed = MAX_FREE_CALLS_PER_DAY - wallet.freeCallsRemaining;
  const freePercent = (wallet.freeCallsRemaining / MAX_FREE_CALLS_PER_DAY) * 100;

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl bg-noir-card border border-noir-border",
          className
        )}
      >
        <Coins className="w-4 h-4 text-cuivre" />
        <span className="text-sm font-semibold text-blanc-chaud">
          {wallet.balance}
        </span>
        <span className="text-xs text-gris-texte">crédits</span>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl overflow-hidden", className)}>
      {/* Main balance card */}
      <div className="bg-gradient-congo p-6 rounded-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-blanc-chaud/60 mb-1">Solde de crédits</p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-5xl font-bold text-blanc-chaud">
                {wallet.balance}
              </span>
              <span className="text-lg text-blanc-chaud/60">crédits</span>
            </motion.div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blanc-chaud/10 flex items-center justify-center">
            <Coins className="w-6 h-6 text-cuivre" />
          </div>
        </div>

        <div className="text-xs text-blanc-chaud/50">
          Total dépensé: {wallet.totalSpent} crédits
        </div>
      </div>

      {/* Free calls section */}
      <div className="mt-3 p-4 rounded-2xl bg-noir-card border border-noir-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blanc-chaud">Appels gratuits</span>
          <span className="text-sm text-gris-texte">
            {wallet.freeCallsRemaining}/{MAX_FREE_CALLS_PER_DAY} restants
          </span>
        </div>

        <div className="w-full h-2 bg-noir-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${freePercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-vert-congo rounded-full"
          />
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <RefreshCw className="w-3 h-3 text-gris-texte" />
          <p className="text-xs text-gris-texte">
            Renouvellement dans {Math.ceil((wallet.freeCallsResetAt.getTime() - Date.now()) / (1000 * 60 * 60))}h
          </p>
        </div>
      </div>
    </div>
  );
}
