"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountrySelector } from "@/components/country/country-selector";
import { ModeSelector } from "@/components/country/mode-selector";
import { useAppStore } from "@/lib/store";
import { LANGUAGES_LIST } from "@/lib/language-brain/languages";
import { ONBOARDING_STEPS } from "@/lib/constants/config";
import { CountryCode, LanguageCode } from "@/lib/types";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const {
    onboardingStep,
    selectedCountry,
    selectedLanguage,
    selectedMode,
    pseudo,
    ageConfirmed,
    setSelectedCountry,
    setSelectedLanguage,
    setSelectedMode,
    setPseudo,
    confirmAge,
    nextOnboardingStep,
    prevOnboardingStep,
    completeOnboarding,
  } = useAppStore();

  const [direction, setDirection] = React.useState(1);
  const [pseudoError, setPseudoError] = React.useState("");

  const availableLanguages = LANGUAGES_LIST.filter((l) =>
    l.countries.includes(selectedCountry)
  );

  const handleNext = () => {
    if (onboardingStep === 5) {
      if (!pseudo || pseudo.trim().length < 2) {
        setPseudoError("Le pseudo doit faire au moins 2 caractères.");
        return;
      }
      setPseudoError("");
      completeOnboarding();
      router.push("/home");
      return;
    }
    setDirection(1);
    nextOnboardingStep();
  };

  const handleBack = () => {
    if (onboardingStep === 1) {
      router.push("/");
      return;
    }
    setDirection(-1);
    prevOnboardingStep();
  };

  const canContinue = () => {
    switch (onboardingStep) {
      case 1: return !!selectedCountry;
      case 2: return !!selectedLanguage;
      case 3: return !!selectedMode;
      case 4: return ageConfirmed;
      case 5: return pseudo.trim().length >= 2;
      default: return false;
    }
  };

  const stepInfo = ONBOARDING_STEPS[onboardingStep - 1];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-noir flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 rounded-xl text-gris-texte hover:text-blanc-chaud hover:bg-noir-light transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full flex-1 transition-all duration-300",
                  i < onboardingStep
                    ? "bg-vert-congo"
                    : i === onboardingStep - 1
                    ? "bg-vert-congo/60"
                    : "bg-noir-border"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-gris-texte mt-1">
            Étape {onboardingStep}/{TOTAL_STEPS}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-4 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={onboardingStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Step header */}
            <div className="mb-6">
              <h1 className="text-2xl font-black text-blanc-chaud mb-1.5 tracking-tight">
                {stepInfo?.label}
              </h1>
              <p className="text-sm text-gris-texte">
                {stepInfo?.description}
              </p>
            </div>

            {/* Step content */}
            {onboardingStep === 1 && (
              <CountrySelector
                selected={selectedCountry}
                onSelect={setSelectedCountry}
              />
            )}

            {onboardingStep === 2 && (
              <div className="space-y-3">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code as LanguageCode)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all",
                      "focus:outline-none active:scale-[0.98]",
                      selectedLanguage === lang.code
                        ? "border-vert-congo bg-vert-congo/10 shadow-congo-glow"
                        : "border-noir-border bg-noir-card hover:border-vert-congo/30"
                    )}
                  >
                    <span className="text-3xl">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-semibold text-blanc-chaud">
                        {lang.nameLocal}
                      </div>
                      <div className="text-xs text-gris-texte">{lang.name}</div>
                    </div>
                    {selectedLanguage === lang.code && (
                      <div className="ml-auto w-6 h-6 rounded-full bg-vert-congo flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-blanc-chaud" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {onboardingStep === 3 && (
              <ModeSelector
                selected={selectedMode}
                onSelect={setSelectedMode}
              />
            )}

            {onboardingStep === 4 && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔞</div>
                  <h2 className="text-xl font-bold text-blanc-chaud mb-2">
                    Confirmation d&apos;âge
                  </h2>
                  <p className="text-sm text-gris-texte leading-relaxed">
                    Songi Songi Mabé est réservé aux personnes majeures.
                    En continuant, tu confirmes avoir au moins 18 ans.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-noir-border bg-noir-card">
                  <div className="space-y-3 text-sm text-gris-texte">
                    <div className="flex items-start gap-2">
                      <span className="text-vert-light shrink-0 mt-0.5">✓</span>
                      <span>Tu confirmes avoir au moins 18 ans</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-vert-light shrink-0 mt-0.5">✓</span>
                      <span>Tu acceptes nos Conditions d&apos;utilisation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-vert-light shrink-0 mt-0.5">✓</span>
                      <span>Tu respectes les règles de la communauté</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-vert-light shrink-0 mt-0.5">✓</span>
                      <span>Tolérance zéro pour le harcèlement</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => confirmAge()}
                  className={cn(
                    "w-full py-4 rounded-2xl border-2 transition-all font-semibold",
                    "active:scale-[0.98]",
                    ageConfirmed
                      ? "border-vert-congo bg-vert-congo/20 text-vert-light"
                      : "border-noir-border text-gris-texte hover:border-vert-congo/50"
                  )}
                >
                  {ageConfirmed ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Confirmé – j&apos;ai bien 18 ans
                    </span>
                  ) : (
                    "Oui, j'ai au moins 18 ans"
                  )}
                </button>
              </div>
            )}

            {onboardingStep === 5 && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="text-5xl mb-3">🎙</div>
                  <p className="text-sm text-gris-texte">
                    Choisis un pseudo. Personne ne verra ton vrai nom.
                  </p>
                </div>

                <Input
                  label="Ton pseudo"
                  placeholder="Ex: Masamba, Boyoma_K, VoixLibre…"
                  value={pseudo}
                  onChange={(e) => {
                    setPseudo(e.target.value);
                    if (pseudoError) setPseudoError("");
                  }}
                  error={pseudoError}
                  maxLength={30}
                  hint="2-30 caractères. Pas d'infos personnelles."
                  autoFocus
                />

                <div className="text-xs text-gris-texte space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-vert-light">✓</span>
                    <span>Ton pseudo est visible uniquement pendant l&apos;appel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-vert-light">✓</span>
                    <span>Tu peux le changer à tout moment</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pb-8 pt-4 border-t border-noir-border bg-noir">
        <Button
          onClick={handleNext}
          disabled={!canContinue()}
          size="lg"
          className="w-full"
        >
          {onboardingStep === TOTAL_STEPS ? (
            <span className="flex items-center gap-2">
              Commencer l&apos;aventure
              <ArrowRight className="w-5 h-5" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Continuer
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
