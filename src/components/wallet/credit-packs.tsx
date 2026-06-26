"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CREDIT_PACKS } from "@/lib/credit-engine";
import type { CreditPack } from "@/lib/types";

interface CreditPacksProps {
  region?: "africa" | "diaspora" | "both";
  onPurchase?: (pack: CreditPack) => void;
  className?: string;
}

export function CreditPacks({
  region = "both",
  onPurchase,
  className,
}: CreditPacksProps) {
  const [purchasing, setPurchasing] = React.useState<string | null>(null);

  const packs =
    region === "africa"
      ? CREDIT_PACKS.africa
      : region === "diaspora"
      ? CREDIT_PACKS.diaspora
      : [...CREDIT_PACKS.africa, ...CREDIT_PACKS.diaspora];

  const handlePurchase = async (pack: CreditPack) => {
    setPurchasing(pack.id);
    await new Promise((r) => setTimeout(r, 1000));
    onPurchase?.(pack);
    setPurchasing(null);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {region === "both" && (
        <>
          <SectionHeader title="Packs Afrique" subtitle="M-Pesa · Airtel Money · Orange Money" />
          <div className="space-y-3">
            {CREDIT_PACKS.africa.map((pack, i) => (
              <PackCard
                key={pack.id}
                pack={pack}
                delay={i * 0.05}
                onPurchase={handlePurchase}
                purchasing={purchasing === pack.id}
              />
            ))}
          </div>

          <SectionHeader title="Packs Diaspora" subtitle="Carte bancaire · PayPal · Interac" className="mt-6" />
          <div className="space-y-3">
            {CREDIT_PACKS.diaspora.map((pack, i) => (
              <PackCard
                key={pack.id}
                pack={pack}
                delay={i * 0.05}
                onPurchase={handlePurchase}
                purchasing={purchasing === pack.id}
              />
            ))}
          </div>
        </>
      )}

      {region !== "both" &&
        packs.map((pack, i) => (
          <PackCard
            key={pack.id}
            pack={pack}
            delay={i * 0.05}
            onPurchase={handlePurchase}
            purchasing={purchasing === pack.id}
          />
        ))}
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={cn("pt-2", className)}>
      <h3 className="text-sm font-bold text-blanc-chaud">{title}</h3>
      <p className="text-xs text-gris-texte mt-0.5">{subtitle}</p>
    </div>
  );
}

function PackCard({
  pack,
  delay,
  onPurchase,
  purchasing,
}: {
  pack: CreditPack;
  delay: number;
  onPurchase: (pack: CreditPack) => void;
  purchasing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "relative p-4 rounded-2xl border transition-all",
        pack.popular
          ? "border-cuivre/40 bg-cuivre/5"
          : "border-noir-border bg-noir-card"
      )}
    >
      {pack.popular && (
        <div className="absolute -top-2.5 left-4">
          <span className="flex items-center gap-1 bg-cuivre text-blanc-chaud text-xs font-bold px-3 py-0.5 rounded-full">
            <Star className="w-3 h-3" fill="currentColor" />
            Populaire
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-blanc-chaud">{pack.label}</span>
          </div>
          <p className="text-xs text-gris-texte mt-0.5">{pack.description}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-blanc-chaud">
              {pack.credits}
            </span>
            <span className="text-sm text-gris-texte">crédits</span>
            {pack.bonus && (
              <span className="flex items-center gap-0.5 text-xs text-vert-light bg-vert-congo/20 px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                +{pack.bonus} bonus
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-xl font-bold text-blanc-chaud">
            {pack.priceLocal
              ? `${pack.priceLocal} ${pack.localCurrency}`
              : `$${pack.priceUSD}`}
          </span>
          <Button
            size="sm"
            variant={pack.popular ? "cuivre" : "default"}
            onClick={() => onPurchase(pack)}
            disabled={purchasing}
            className="min-w-[90px]"
          >
            {purchasing ? "…" : "Acheter"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
