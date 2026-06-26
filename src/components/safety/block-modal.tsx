"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blockUser } from "@/lib/safety-shield";

interface BlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blockedUserId: string;
  blockedPseudo?: string;
  onBlocked?: () => void;
}

export function BlockModal({
  open,
  onOpenChange,
  blockedUserId,
  blockedPseudo = "cette personne",
  onBlocked,
}: BlockModalProps) {
  const [confirmed, setConfirmed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleBlock = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    blockUser("current_user", blockedUserId, "Bloqué depuis l'appel");

    setLoading(false);
    setConfirmed(true);

    setTimeout(() => {
      onOpenChange(false);
      onBlocked?.();
      setConfirmed(false);
    }, 1500);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-noir/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-noir-card border border-noir-border rounded-t-3xl p-6 pb-10"
          >
            {!confirmed ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Ban className="w-5 h-5 text-red-400" />
                    <Dialog.Title className="text-lg font-bold text-blanc-chaud">
                      Bloquer cette voix
                    </Dialog.Title>
                  </div>
                  <Dialog.Close asChild>
                    <button className="p-2 rounded-xl text-gris-texte hover:text-blanc-chaud hover:bg-noir-light transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-red-300 font-medium mb-1">
                    Bloquer {blockedPseudo}
                  </p>
                  <p className="text-xs text-gris-texte leading-relaxed">
                    Cette personne ne pourra plus jamais te contacter sur Songi Songi Mabé.
                    Le blocage est immédiat et permanent.
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gris-texte mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-vert-light shrink-0">✓</span>
                    <span>Aucun appel possible entre vous</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-vert-light shrink-0">✓</span>
                    <span>La personne ne sait pas qu&apos;elle est bloquée</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-vert-light shrink-0">✓</span>
                    <span>Tu peux débloquer à tout moment dans tes paramètres</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Dialog.Close asChild>
                    <Button variant="outline" className="flex-1" size="lg">
                      Annuler
                    </Button>
                  </Dialog.Close>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    size="lg"
                    onClick={handleBlock}
                    disabled={loading}
                  >
                    {loading ? "Blocage…" : "Bloquer"}
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-4">🚫</div>
                <h3 className="text-xl font-bold text-blanc-chaud mb-2">
                  Voix bloquée
                </h3>
                <p className="text-sm text-gris-texte">
                  Cette personne ne peut plus te contacter. Tu es en sécurité.
                </p>
              </motion.div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
