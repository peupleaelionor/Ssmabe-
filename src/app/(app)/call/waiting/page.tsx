"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceWave } from "@/components/voice/voice-wave";
import { useAppStore } from "@/lib/store";
import { findVoiceMatch, createCallSession, simulateWaitTime } from "@/lib/voice-match";
import { MODES } from "@/lib/constants/modes";
import { COUNTRIES } from "@/lib/country-brain/countries";
import { LANGUAGES } from "@/lib/language-brain/languages";
import { CallStatus } from "@/lib/types";

const SEARCH_PHRASES = [
  "Recherche d'une voix compatible…",
  "Connexion en cours…",
  "Voix trouvée ! Connexion sécurisée…",
];

export default function WaitingPage() {
  const router = useRouter();
  const {
    selectedCountry,
    selectedLanguage,
    selectedMode,
    setCallStatus,
    startCall,
    setMatchedUser,
    setIsSearching,
  } = useAppStore();

  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [dotCount, setDotCount] = React.useState(1);
  const [cancelled, setCancelled] = React.useState(false);

  const country = COUNTRIES[selectedCountry];
  const mode = MODES[selectedMode];
  const language = LANGUAGES[selectedLanguage];

  React.useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((d) => (d % 3) + 1);
    }, 500);

    return () => clearInterval(dotTimer);
  }, []);

  React.useEffect(() => {
    const phraseTimer = setTimeout(() => {
      setPhraseIndex(1);
    }, 1500);

    return () => clearTimeout(phraseTimer);
  }, []);

  React.useEffect(() => {
    if (cancelled) return;

    const preference = {
      userId: "current_user",
      countryCode: selectedCountry,
      languageCode: selectedLanguage,
      mode: selectedMode,
    };

    const waitMs = simulateWaitTime(preference);

    const matchTimer = setTimeout(() => {
      if (cancelled) return;

      setPhraseIndex(2);

      const result = findVoiceMatch(preference);

      setTimeout(() => {
        if (cancelled) return;

        if (result.success && result.candidate) {
          const session = createCallSession(result);
          startCall(session, result.candidate);
          setCallStatus(CallStatus.ACTIVE);
          setIsSearching(false);
          router.push("/call/live");
        } else {
          setCallStatus(CallStatus.FAILED);
          setIsSearching(false);
          router.push("/home");
        }
      }, 1200);
    }, Math.min(waitMs, 6000));

    return () => clearTimeout(matchTimer);
  }, [
    cancelled,
    selectedCountry,
    selectedLanguage,
    selectedMode,
    router,
    startCall,
    setCallStatus,
    setIsSearching,
  ]);

  const handleCancel = () => {
    setCancelled(true);
    setCallStatus(CallStatus.CANCELLED);
    setIsSearching(false);
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-noir flex flex-col items-center justify-between px-4 py-12">
      {/* Top area */}
      <div className="flex items-center justify-between w-full">
        <div className="text-sm font-medium text-gris-texte">
          Mode {mode.icon} {mode.label}
        </div>
        <button
          onClick={handleCancel}
          className="p-2 rounded-xl text-gris-texte hover:text-blanc-chaud hover:bg-noir-light transition-colors"
          aria-label="Annuler"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center */}
      <div className="flex flex-col items-center text-center flex-1 justify-center">
        {/* Animated outer rings */}
        <div className="relative mb-10">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 -m-12 rounded-full border border-vert-congo/30"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 -m-6 rounded-full border border-vert-congo/40"
          />
          <div className="relative z-10 w-24 h-24 rounded-full bg-vert-congo/20 border border-vert-congo/50 flex items-center justify-center">
            <VoiceWave active size="md" color="#0F3D32" barCount={7} />
          </div>
        </div>

        {/* Main text */}
        <motion.h1
          key={phraseIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-blanc-chaud mb-3 tracking-tight"
        >
          {SEARCH_PHRASES[phraseIndex]}
          {phraseIndex < 2 && ".".repeat(dotCount)}
        </motion.h1>

        {/* Context info */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm text-gris-texte">
            {country?.flag} {country?.name}
          </span>
          <span className="w-1 h-1 rounded-full bg-gris-texte" />
          <span className="text-sm text-gris-texte">
            {language?.nameLocal}
          </span>
          <span className="w-1 h-1 rounded-full bg-gris-texte" />
          <span className="text-sm text-gris-texte">
            {mode.icon} {mode.label}
          </span>
        </div>

        {/* Safety reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="px-5 py-3 rounded-2xl border border-vert-congo/30 bg-vert-congo/10 max-w-xs"
        >
          <p className="text-xs text-vert-light leading-relaxed">
            🔒 Ton numéro reste caché. La connexion est anonyme et sécurisée.
          </p>
        </motion.div>
      </div>

      {/* Cancel button */}
      <div className="w-full">
        <Button
          onClick={handleCancel}
          variant="outline"
          size="lg"
          className="w-full"
        >
          Annuler la recherche
        </Button>
      </div>
    </div>
  );
}
