"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PhoneOff, Flag, Ban } from "lucide-react";
import { VoiceWave } from "@/components/voice/voice-wave";
import { CallTimer } from "@/components/voice/call-timer";
import { ReportModal } from "@/components/safety/report-modal";
import { BlockModal } from "@/components/safety/block-modal";
import { useAppStore } from "@/lib/store";
import { MODES } from "@/lib/constants/modes";
import { COUNTRIES } from "@/lib/country-brain/countries";
import { CallStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function LiveCallPage() {
  const router = useRouter();
  const {
    currentCall,
    matchedUser,
    callDuration,
    setCallStatus,
    incrementCallDuration,
    endCall,
    selectedMode,
  } = useAppStore();

  const [reportOpen, setReportOpen] = React.useState(false);
  const [blockOpen, setBlockOpen] = React.useState(false);
  const [ending, setEnding] = React.useState(false);

  const mode = MODES[selectedMode];
  const matchCountry = matchedUser ? COUNTRIES[matchedUser.countryCode] : null;

  // Redirect if no active call
  React.useEffect(() => {
    if (!matchedUser && !currentCall) {
      router.replace("/home");
    }
  }, [matchedUser, currentCall, router]);

  const handleEndCall = () => {
    setEnding(true);
    setTimeout(() => {
      setCallStatus(CallStatus.ENDING);
      endCall();
      router.push("/call/end");
    }, 400);
  };

  const handleReported = () => {
    setReportOpen(false);
    handleEndCall();
  };

  const handleBlocked = () => {
    setBlockOpen(false);
    handleEndCall();
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-noir flex flex-col transition-opacity duration-300",
        ending && "opacity-0"
      )}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-vert-light animate-pulse" />
          <span className="text-sm font-medium text-gris-texte">
            Appel anonyme
          </span>
        </div>
        <Badge variant="default" className="text-xs">
          {mode.icon} {mode.label}
        </Badge>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Matched user info (anonymous) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mb-12"
        >
          {/* Avatar placeholder – no real photo */}
          <div className="relative mb-6">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 -m-4 rounded-full bg-vert-congo/20 blur-xl"
            />
            <div className="relative w-24 h-24 rounded-full bg-gradient-congo flex items-center justify-center border-2 border-vert-congo shadow-congo-glow">
              <span className="text-4xl">
                {matchCountry?.flag ?? "🎙"}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-blanc-chaud mb-1.5">
            {matchedUser?.pseudo ?? "Voix Anonyme"}
          </h2>

          <div className="flex items-center gap-2 text-xs text-gris-texte">
            <span>{matchCountry?.flag}</span>
            <span>{matchedUser?.city}</span>
            <span>·</span>
            <span>{matchedUser?.trustLevel === "vip" ? "⭐ VIP" : matchedUser?.trustLevel === "verified" ? "✓✓ Vérifié" : "✓ Fiable"}</span>
          </div>
        </motion.div>

        {/* Voice wave */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <VoiceWave active size="xl" barCount={9} color="#0F3D32" />
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <CallTimer
            seconds={callDuration}
            onTick={incrementCallDuration}
            running
            size="lg"
          />
        </motion.div>

        {/* Privacy notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gris-texte text-center"
        >
          🔒 Aucun numéro partagé · Canal sécurisé
        </motion.p>
      </div>

      {/* Bottom controls */}
      <div className="px-4 pb-10 pt-4 space-y-4">
        {/* Secondary actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setReportOpen(true)}
            className="flex flex-col items-center gap-1 p-3 rounded-2xl border border-noir-border hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all active:scale-95"
          >
            <Flag className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gris-texte">Signaler</span>
          </button>

          <button
            onClick={() => setBlockOpen(true)}
            className="flex flex-col items-center gap-1 p-3 rounded-2xl border border-noir-border hover:border-red-500/40 hover:bg-red-500/10 transition-all active:scale-95"
          >
            <Ban className="w-5 h-5 text-red-500" />
            <span className="text-xs text-gris-texte">Bloquer</span>
          </button>
        </div>

        {/* End call button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleEndCall}
          className={cn(
            "w-full h-16 rounded-2xl flex items-center justify-center gap-3",
            "bg-red-600 hover:bg-red-700 active:scale-95 transition-all",
            "font-bold text-white shadow-lg"
          )}
        >
          <PhoneOff className="w-6 h-6" />
          <span>Terminer l&apos;appel</span>
        </motion.button>
      </div>

      {/* Modals */}
      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportedUserId={matchedUser?.id ?? "unknown"}
        sessionId={currentCall?.id}
        onReported={handleReported}
      />

      <BlockModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        blockedUserId={matchedUser?.id ?? "unknown"}
        blockedPseudo={matchedUser?.pseudo}
        onBlocked={handleBlocked}
      />
    </div>
  );
}
