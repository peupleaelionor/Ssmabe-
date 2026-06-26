"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield, Coins, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { VoiceWave } from "@/components/voice/voice-wave";
import { VoiceFilters } from "@/components/voice/voice-filters";
import { useAppStore } from "@/lib/store";
import { MODES } from "@/lib/constants/modes";
import { COUNTRIES } from "@/lib/country-brain/countries";
import { CallStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const {
    selectedCountry,
    selectedLanguage,
    selectedMode,
    wallet,
    callStatus,
    setCallStatus,
    setIsSearching,
  } = useAppStore();

  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const country = COUNTRIES[selectedCountry];
  const mode = MODES[selectedMode];

  const handleFindVoice = () => {
    setCallStatus(CallStatus.SEARCHING);
    setIsSearching(true);
    router.push("/call/waiting");
  };

  const canCall = mode.free
    ? wallet.freeCallsRemaining > 0
    : wallet.balance >= mode.creditCost;

  return (
    <div className="min-h-screen bg-noir">
      <Header
        showCredits
        showSafety
      />

      <div className="px-4 pt-6 pb-24">
        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-black text-blanc-chaud mb-1.5 tracking-tight">
            Quelle voix veux-tu rencontrer ?
          </h1>
          <p className="text-sm text-gris-texte">
            {country?.localTexts.tagline}
          </p>
        </motion.div>

        {/* Mode badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 mb-6"
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium"
            style={{
              borderColor: `${mode.color}40`,
              backgroundColor: `${mode.color}10`,
              color: "#F8F3EA",
            }}
          >
            <span>{mode.icon}</span>
            <span>Mode {mode.label}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-noir-card border border-noir-border text-xs text-gris-texte">
            <span>{country?.flag}</span>
            <span>{country?.name}</span>
          </div>
        </motion.div>

        {/* Voice wave display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center my-10"
        >
          <div className="relative">
            <div className="absolute inset-0 -m-8 bg-vert-congo/10 rounded-full blur-2xl" />
            <VoiceWave active={false} size="xl" barCount={9} />
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <Button
            onClick={handleFindVoice}
            disabled={!canCall}
            size="xl"
            className="w-full glow-pulse text-base"
          >
            🎙 Trouver une voix
          </Button>

          {!canCall && (
            <p className="text-xs text-red-400 text-center mt-2">
              {mode.free
                ? "Tu as utilisé tes appels gratuits du jour."
                : `Tu as besoin de ${mode.creditCost} crédits pour ce mode.`}
            </p>
          )}
        </motion.div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Shield className="w-3.5 h-3.5 text-vert-light" />
          <span className="text-xs text-gris-texte">
            Ton numéro reste caché. Toujours.
          </span>
        </motion.div>

        {/* Filters section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-6"
        >
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-noir-border bg-noir-card hover:border-vert-congo/30 transition-colors"
          >
            <span className="text-sm font-medium text-blanc-chaud">
              Personnaliser la recherche
            </span>
            {filtersOpen ? (
              <ChevronUp className="w-4 h-4 text-gris-texte" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gris-texte" />
            )}
          </button>

          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-4 rounded-2xl border border-noir-border bg-noir-card"
            >
              <VoiceFilters />
            </motion.div>
          )}
        </motion.div>

        {/* Credit & free calls info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="p-4 rounded-2xl bg-noir-card border border-noir-border text-center">
            <div className="text-2xl font-bold text-blanc-chaud mb-0.5">
              {wallet.freeCallsRemaining}
            </div>
            <div className="text-xs text-gris-texte">Appels gratuits</div>
          </div>
          <div
            className="p-4 rounded-2xl border text-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/wallet")}
            style={{
              background: "linear-gradient(135deg, #0F3D32, #082820)",
              borderColor: "#0F3D32",
            }}
          >
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Coins className="w-4 h-4 text-cuivre" />
              <div className="text-2xl font-bold text-blanc-chaud">
                {wallet.balance}
              </div>
            </div>
            <div className="text-xs text-blanc-chaud/60">Crédits</div>
          </div>
        </motion.div>

        {/* Mode description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-6 p-4 rounded-2xl border border-noir-border bg-noir-card"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{mode.icon}</span>
            <span className="text-sm font-semibold text-blanc-chaud">
              Mode {mode.label}
            </span>
          </div>
          <p className="text-xs text-gris-texte leading-relaxed">
            {mode.description}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-xs text-gris-texte">Sécurité :</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-4 h-1.5 rounded-full",
                    i < mode.safetyLevel ? "bg-vert-congo" : "bg-noir-border"
                  )}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
