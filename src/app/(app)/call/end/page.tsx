"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ConsentStatus } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, SkipForward, Ban, Flag, RefreshCw, Clock } from "lucide-react";
import { ReportModal } from "@/components/safety/report-modal";

const CONSENT_OPTIONS = [
  {
    id: ConsentStatus.YES,
    icon: Heart,
    iconColor: "#0F3D32",
    label: "Oui, continuer",
    description: "On s'entend bien, je veux continuer à parler.",
    className: "border-vert-congo/50 hover:bg-vert-congo/10",
    selectedClass: "border-vert-congo bg-vert-congo/15",
  },
  {
    id: ConsentStatus.EXTEND,
    icon: RefreshCw,
    iconColor: "#C76A2D",
    label: "Prolonger l'appel",
    description: "Encore un peu. On n'a pas fini.",
    className: "border-cuivre/50 hover:bg-cuivre/10",
    selectedClass: "border-cuivre bg-cuivre/15",
  },
  {
    id: ConsentStatus.SKIP,
    icon: SkipForward,
    iconColor: "#6F6A63",
    label: "Passer",
    description: "Pas de feeling, sans rancune.",
    className: "border-noir-border hover:border-gris-texte/30",
    selectedClass: "border-gris-texte bg-gris-texte/10",
  },
  {
    id: ConsentStatus.BLOCK,
    icon: Ban,
    iconColor: "#EF4444",
    label: "Bloquer",
    description: "Je ne veux plus jamais parler à cette personne.",
    className: "border-red-500/30 hover:bg-red-500/5",
    selectedClass: "border-red-500 bg-red-500/10",
  },
  {
    id: ConsentStatus.REPORT,
    icon: Flag,
    iconColor: "#F59E0B",
    label: "Signaler",
    description: "Comportement inapproprié ou suspect.",
    className: "border-yellow-500/30 hover:bg-yellow-500/5",
    selectedClass: "border-yellow-500 bg-yellow-500/10",
  },
];

export default function CallEndPage() {
  const router = useRouter();
  const { callDuration, userConsent, otherConsent, matchedUser, setUserConsent, setOtherConsent } = useAppStore();

  const [reportOpen, setReportOpen] = React.useState(false);
  const [resolving, setResolving] = React.useState(false);
  const [outcome, setOutcome] = React.useState<"both_yes" | "no_contact" | null>(null);

  // Simulate other person's consent after 2 seconds
  React.useEffect(() => {
    if (userConsent !== ConsentStatus.PENDING && !resolving) {
      setResolving(true);

      const timer = setTimeout(() => {
        // Simulate the other person's decision
        const randomConsent =
          userConsent === ConsentStatus.YES || userConsent === ConsentStatus.EXTEND
            ? Math.random() > 0.45
              ? ConsentStatus.YES
              : ConsentStatus.SKIP
            : ConsentStatus.SKIP;

        setOtherConsent(randomConsent);

        const bothYes =
          (userConsent === ConsentStatus.YES || userConsent === ConsentStatus.EXTEND) &&
          (randomConsent === ConsentStatus.YES);

        setOutcome(bothYes ? "both_yes" : "no_contact");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [userConsent, resolving, setOtherConsent]);

  const handleChoice = (consent: ConsentStatus) => {
    if (consent === ConsentStatus.REPORT) {
      setReportOpen(true);
      return;
    }
    setUserConsent(consent);
  };

  const handleContinue = () => {
    if (outcome === "both_yes") {
      router.push("/home");
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-noir flex flex-col px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-vert-congo/20 flex items-center justify-center">
          <Clock className="w-5 h-5 text-vert-light" />
        </div>
        <div>
          <h1 className="text-base font-bold text-blanc-chaud">
            Appel terminé
          </h1>
          <p className="text-xs text-gris-texte">
            Durée : {formatDuration(callDuration)}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {userConsent === ConsentStatus.PENDING ? (
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex-1"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-black text-blanc-chaud mb-2 tracking-tight">
                Le feeling passe ?
              </h2>
              <p className="text-sm text-gris-texte">
                Ta réponse est privée jusqu&apos;à ce que l&apos;autre personne choisisse aussi.
              </p>
            </div>

            <div className="space-y-3">
              {CONSENT_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all",
                      "text-left active:scale-[0.98]",
                      option.className
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${option.iconColor}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: option.iconColor }} />
                    </div>
                    <div>
                      <div className="font-semibold text-blanc-chaud text-sm">
                        {option.label}
                      </div>
                      <div className="text-xs text-gris-texte mt-0.5">
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : outcome === null ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-vert-congo border-t-transparent mb-6"
            />
            <h3 className="text-lg font-bold text-blanc-chaud mb-2">
              En attente de l&apos;autre voix…
            </h3>
            <p className="text-sm text-gris-texte">
              {matchedUser?.pseudo ?? "L'autre personne"} est en train de choisir.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="outcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            {outcome === "both_yes" ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="text-7xl mb-6"
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-black text-blanc-chaud mb-3 tracking-tight">
                  Double oui.
                </h2>
                <p className="text-gris-texte mb-2 leading-relaxed">
                  Vous pouvez continuer à vous parler.
                </p>
                <p className="text-sm text-gris-texte mb-8">
                  Retrouve {matchedUser?.pseudo} depuis l&apos;accueil.
                </p>
                <div className="w-full p-4 rounded-2xl border border-vert-congo/30 bg-vert-congo/10 mb-8">
                  <p className="text-sm text-vert-light font-medium">
                    🔒 Ton numéro n&apos;a pas été partagé. La connexion reste sécurisée.
                  </p>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="text-7xl mb-6"
                >
                  ✂️
                </motion.div>
                <h2 className="text-2xl font-black text-blanc-chaud mb-3 tracking-tight">
                  Fin propre.
                </h2>
                <p className="text-gris-texte mb-2 leading-relaxed">
                  Aucun contact n&apos;a été partagé.
                </p>
                <p className="text-sm text-gris-texte mb-8">
                  Ton numéro est resté invisible. C&apos;est notre promesse.
                </p>
                <div className="w-full p-4 rounded-2xl border border-noir-border bg-noir-card mb-8">
                  <p className="text-sm text-gris-texte">
                    🎙 Tu peux relancer une recherche pour rencontrer une nouvelle voix.
                  </p>
                </div>
              </>
            )}

            <Button onClick={handleContinue} size="lg" className="w-full">
              Retour à l&apos;accueil
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportedUserId={matchedUser?.id ?? "unknown"}
        onReported={() => {
          setReportOpen(false);
          setUserConsent(ConsentStatus.REPORT);
        }}
      />
    </div>
  );
}
