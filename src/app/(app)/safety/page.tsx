"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Flag, Ban } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ReportModal } from "@/components/safety/report-modal";
import { BlockModal } from "@/components/safety/block-modal";
import { Button } from "@/components/ui/button";
import { SAFETY_RULES } from "@/lib/constants/config";
import { useAppStore } from "@/lib/store";

export default function SafetyPage() {
  const { matchedUser } = useAppStore();
  const [reportOpen, setReportOpen] = React.useState(false);
  const [blockOpen, setBlockOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-noir">
      <Header title="Sécurité" showBack />

      <div className="px-4 pt-4 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-vert-congo/20 border border-vert-congo/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-vert-light" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-blanc-chaud text-center mb-2 tracking-tight">
            Ta voix est libre.
          </h1>
          <h2 className="text-xl font-bold text-vert-light text-center mb-3">
            Ton numéro reste protégé.
          </h2>
          <p className="text-sm text-gris-texte text-center leading-relaxed">
            La sécurité est au cœur de Songi Songi Mabé. Pas un ajout tardif.
            Une promesse technique et humaine.
          </p>
        </motion.div>

        {/* Safety rules */}
        <div className="space-y-3 mb-8">
          {SAFETY_RULES.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="flex items-start gap-4 p-4 rounded-2xl border border-noir-border bg-noir-card"
            >
              <div className="w-10 h-10 rounded-xl bg-vert-congo/15 flex items-center justify-center text-xl shrink-0">
                {rule.icon}
              </div>
              <div>
                <h3 className="font-semibold text-blanc-chaud text-sm mb-0.5">
                  {rule.title}
                </h3>
                <p className="text-xs text-gris-texte leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-sm font-bold text-blanc-chaud mb-3">
            Actions rapides
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4"
              onClick={() => setReportOpen(true)}
            >
              <Flag className="w-5 h-5 text-yellow-500" />
              <span className="text-xs">Signaler une voix</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4"
              onClick={() => setBlockOpen(true)}
            >
              <Ban className="w-5 h-5 text-red-500" />
              <span className="text-xs">Bloquer une voix</span>
            </Button>
          </div>
        </motion.div>

        {/* Community rules */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl border border-cuivre/20 bg-cuivre/5"
        >
          <h3 className="font-bold text-blanc-chaud mb-3 flex items-center gap-2">
            <span>📜</span>
            Règles de la communauté
          </h3>
          <div className="space-y-2 text-xs text-gris-texte">
            <div className="flex items-start gap-2">
              <span className="text-red-400 shrink-0 font-bold">✗</span>
              <span>Aucun partage de numéro, email ou réseaux sociaux</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 shrink-0 font-bold">✗</span>
              <span>Zéro harcèlement, insulte ou comportement agressif</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 shrink-0 font-bold">✗</span>
              <span>Pas d'arnaque, de scam ou de demande d'argent</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 shrink-0 font-bold">✗</span>
              <span>Aucun mineur (18+ strict)</span>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-noir-border mt-2">
              <span className="text-vert-light shrink-0 font-bold">✓</span>
              <span>La violation de ces règles entraîne un ban permanent</span>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-gris-texte">
            Problème urgent ? Écris-nous à{" "}
            <a
              href="mailto:safety@songisongi.app"
              className="text-vert-light hover:underline"
            >
              safety@songisongi.app
            </a>
          </p>
        </motion.div>
      </div>

      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportedUserId="unknown"
      />
      <BlockModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        blockedUserId="unknown"
        blockedPseudo="cette voix"
      />
    </div>
  );
}
