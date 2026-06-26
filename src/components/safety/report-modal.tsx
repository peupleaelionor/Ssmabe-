"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportReasons, reportUser } from "@/lib/safety-shield";
import { cn } from "@/lib/utils";
import type { ReportReason, ReportSeverity } from "@/lib/types";

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportedUserId: string;
  sessionId?: string;
  onReported?: () => void;
}

export function ReportModal({
  open,
  onOpenChange,
  reportedUserId,
  sessionId,
  onReported,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = React.useState<ReportReason | null>(null);
  const [description, setDescription] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;
    setLoading(true);

    const severityMap: Record<ReportReason, ReportSeverity> = {
      harassment: "high",
      spam: "medium",
      scam: "critical",
      underage: "critical",
      offensive: "medium",
      inappropriate: "medium",
      fake: "low",
      other: "low",
    };

    await new Promise((r) => setTimeout(r, 800));

    reportUser(
      "current_user",
      reportedUserId,
      selectedReason,
      severityMap[selectedReason],
      description,
      sessionId
    );

    setSubmitted(true);
    setLoading(false);

    setTimeout(() => {
      onOpenChange(false);
      onReported?.();
      setSubmitted(false);
      setSelectedReason(null);
      setDescription("");
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
            {!submitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Flag className="w-5 h-5 text-red-400" />
                    <Dialog.Title className="text-lg font-bold text-blanc-chaud">
                      Signaler cette voix
                    </Dialog.Title>
                  </div>
                  <Dialog.Close asChild>
                    <button className="p-2 rounded-xl text-gris-texte hover:text-blanc-chaud hover:bg-noir-light transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <p className="text-sm text-gris-texte mb-5">
                  Ton signalement est anonyme. Notre équipe traitera ta demande sous 24h.
                </p>

                <div className="space-y-2 mb-5">
                  {reportReasons.map((reason) => (
                    <button
                      key={reason.value}
                      onClick={() => setSelectedReason(reason.value)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border text-left",
                        "transition-all duration-200 active:scale-[0.98]",
                        selectedReason === reason.value
                          ? "border-red-500/50 bg-red-500/10"
                          : "border-noir-border hover:border-rouge/30"
                      )}
                    >
                      <span className="text-lg">{reason.icon}</span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          selectedReason === reason.value
                            ? "text-red-300"
                            : "text-blanc-chaud"
                        )}
                      >
                        {reason.label}
                      </span>
                    </button>
                  ))}
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Détails supplémentaires (optionnel)…"
                  rows={2}
                  className={cn(
                    "w-full bg-noir-light border border-noir-border rounded-xl",
                    "px-4 py-3 text-sm text-blanc-chaud placeholder:text-gris-texte",
                    "focus:outline-none focus:border-vert-congo resize-none mb-4"
                  )}
                />

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedReason || loading}
                  variant="destructive"
                  className="w-full"
                  size="lg"
                >
                  {loading ? "Envoi en cours…" : "Envoyer le signalement"}
                </Button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-blanc-chaud mb-2">
                  Signalement reçu
                </h3>
                <p className="text-sm text-gris-texte">
                  Notre équipe va examiner ta demande. Merci de contribuer à la sécurité de la communauté.
                </p>
              </motion.div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
