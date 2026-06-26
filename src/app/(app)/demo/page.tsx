"use client";

/**
 * Page Démo — Songi Songi Mabé
 * --------------------------------------------------------------
 * Flow simulé complet : sélection pays/langue/mode → attente
 * → appel 30s → fin → double consentement → résultat.
 *
 * Accessible sans auth. Jamais de numéro affiché.
 * Démonstration uniquement — aucun appel réel.
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceWave } from "@/components/voice/voice-wave";
import { Button } from "@/components/ui/button";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { MODES_LIST } from "@/lib/constants/modes";
import { CountryCode, LanguageCode, CallMode, type UserPreference } from "@/lib/types";
import { findVoiceMatch } from "@/lib/mabe/voiceMatch";
import { analytics } from "@/lib/analytics";
import type { MatchResult } from "@/lib/mabe/voiceMatch";
import { LANGUAGES } from "@/lib/language-brain/languages";
import { getLanguagesForCountry } from "@/lib/language-brain";

type DemoStep =
  | "country"
  | "language"
  | "mode"
  | "waiting"
  | "call"
  | "consent"
  | "consent_waiting"
  | "result";

type ConsentChoice = "yes" | "no" | null;

const CALL_DURATION = 30; // secondes

const DEMO_LABEL = "DÉMONSTRATION — Appel simulé";

export default function DemoPage() {
  const [step, setStep] = React.useState<DemoStep>("country");
  const [selectedCountry, setSelectedCountry] = React.useState<CountryCode | null>(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageCode | null>(null);
  const [selectedMode, setSelectedMode] = React.useState<CallMode | null>(null);
  const [matchResult, setMatchResult] = React.useState<MatchResult | null>(null);
  const [callTimer, setCallTimer] = React.useState(CALL_DURATION);
  const [consentChoice, setConsentChoice] = React.useState<ConsentChoice>(null);
  const [finalResult, setFinalResult] = React.useState<"double_yes" | "ended" | null>(null);

  // Funnel démo (anonyme, no-op si analytics non configurée).
  React.useEffect(() => {
    analytics.demoStarted();
  }, []);

  React.useEffect(() => {
    if (step === "result") analytics.demoCompleted({ steps: 9 });
  }, [step]);

  // Available languages based on selected country
  const availableLanguages = React.useMemo(() => {
    if (!selectedCountry) return [];
    return getLanguagesForCountry(selectedCountry);
  }, [selectedCountry]);

  // Available modes (filter to non-LINGALA for simplicity in demo — LINGALA needs LN)
  const availableModes = MODES_LIST.filter(
    (m) => m.id !== CallMode.LINGALA && m.id !== CallMode.DIASPORA
  );

  // Step 4: Simulate waiting → step 5 (call) after 3s
  React.useEffect(() => {
    if (step !== "waiting") return;
    const timer = setTimeout(() => {
      if (selectedCountry && selectedLanguage && selectedMode) {
        const pref: UserPreference = {
          userId: "demo_user",
          countryCode: selectedCountry,
          languageCode: selectedLanguage,
          mode: selectedMode,
        };
        const result = findVoiceMatch(pref);
        setMatchResult(result);
      }
      setStep("call");
    }, 3000);
    return () => clearTimeout(timer);
  }, [step, selectedCountry, selectedLanguage, selectedMode]);

  // Step 5: Call timer countdown, auto-end at 0
  React.useEffect(() => {
    if (step !== "call") return;
    if (callTimer <= 0) {
      setStep("consent");
      return;
    }
    const interval = setInterval(() => {
      setCallTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, callTimer]);

  // Step 7: Consent waiting → result after 2s
  React.useEffect(() => {
    if (step !== "consent_waiting") return;
    const timer = setTimeout(() => {
      // Simule la réponse de l'autre personne
      const otherPersonSaysYes = Math.random() > 0.3; // 70% chance
      if (consentChoice === "yes" && otherPersonSaysYes) {
        setFinalResult("double_yes");
      } else {
        setFinalResult("ended");
      }
      setStep("result");
    }, 2000);
    return () => clearTimeout(timer);
  }, [step, consentChoice]);

  const handleCountrySelect = (code: CountryCode) => {
    setSelectedCountry(code);
    setSelectedLanguage(null);
    analytics.countrySelected(code);
    setStep("language");
  };

  const handleLanguageSelect = (code: LanguageCode) => {
    setSelectedLanguage(code);
    setStep("mode");
  };

  const handleModeSelect = (mode: CallMode) => {
    setSelectedMode(mode);
    analytics.modeSelected(mode);
  };

  const handleFindVoice = () => {
    if (!selectedMode) return;
    setStep("waiting");
  };

  const handleConsent = (choice: ConsentChoice) => {
    setConsentChoice(choice);
    if (choice === "no") {
      setFinalResult("ended");
      setStep("result");
    } else {
      setStep("consent_waiting");
    }
  };

  const handleReset = () => {
    setStep("country");
    setSelectedCountry(null);
    setSelectedLanguage(null);
    setSelectedMode(null);
    setMatchResult(null);
    setCallTimer(CALL_DURATION);
    setConsentChoice(null);
    setFinalResult(null);
  };

  return (
    <div className="min-h-screen bg-noir text-blanc-chaud flex flex-col">
      {/* Demo banner */}
      <div className="sticky top-0 z-50 bg-cuivre/90 backdrop-blur text-blanc-chaud text-center text-xs font-bold py-2 px-4 tracking-wide">
        {DEMO_LABEL}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* STEP 1: Choix du pays */}
          {step === "country" && (
            <motion.div
              key="country"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <h2 className="text-2xl font-black mb-2 text-center">
                Choisis ton pays
              </h2>
              <p className="text-gris-texte text-sm text-center mb-6">
                Étape 1 sur 3
              </p>
              <div className="grid grid-cols-2 gap-3">
                {COUNTRIES_LIST.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code)}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-noir-border bg-noir-card hover:border-vert-congo/60 hover:bg-vert-congo/10 transition-all text-left"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="text-sm font-semibold text-blanc-chaud truncate">
                        {country.name}
                      </div>
                      <div className="text-xs text-gris-texte">
                        {country.currency}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Choix de la langue */}
          {step === "language" && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <h2 className="text-2xl font-black mb-2 text-center">
                Choisis ta langue
              </h2>
              <p className="text-gris-texte text-sm text-center mb-6">
                Étape 2 sur 3
              </p>
              <div className="space-y-3">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="flex items-center gap-4 w-full p-4 rounded-2xl border border-noir-border bg-noir-card hover:border-vert-congo/60 hover:bg-vert-congo/10 transition-all text-left"
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <div className="text-sm font-semibold text-blanc-chaud">
                        {lang.name}
                      </div>
                      <div className="text-xs text-gris-texte">
                        {lang.nameLocal}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("country")}
                className="mt-4 text-xs text-gris-texte underline w-full text-center"
              >
                Changer de pays
              </button>
            </motion.div>
          )}

          {/* STEP 3: Choix du mode */}
          {step === "mode" && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <h2 className="text-2xl font-black mb-2 text-center">
                Choisis ton mode
              </h2>
              <p className="text-gris-texte text-sm text-center mb-6">
                Étape 3 sur 3
              </p>
              <div className="space-y-3 mb-6">
                {availableModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleModeSelect(mode.id)}
                    className={[
                      "flex items-center gap-4 w-full p-4 rounded-2xl border transition-all text-left",
                      selectedMode === mode.id
                        ? "border-vert-congo bg-vert-congo/20"
                        : "border-noir-border bg-noir-card hover:border-vert-congo/60 hover:bg-vert-congo/10",
                    ].join(" ")}
                  >
                    <span className="text-2xl">{mode.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-blanc-chaud">
                        {mode.label}
                      </div>
                      <div className="text-xs text-gris-texte line-clamp-1">
                        {mode.description}
                      </div>
                    </div>
                    {selectedMode === mode.id && (
                      <span className="text-vert-congo text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <Button
                size="xl"
                className="w-full"
                disabled={!selectedMode}
                onClick={handleFindVoice}
              >
                Trouver une voix
              </Button>
            </motion.div>
          )}

          {/* STEP 4: Attente */}
          {step === "waiting" && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center gap-6 text-center"
            >
              <VoiceWave active size="xl" color="#0F3D32" barCount={9} />
              <div>
                <h2 className="text-xl font-bold text-blanc-chaud mb-2">
                  Recherche d&apos;une voix…
                </h2>
                <p className="text-sm text-gris-texte">
                  On cherche quelqu&apos;un avec la même vibration.
                </p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-vert-congo border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {/* STEP 5: Appel en cours (30s) */}
          {step === "call" && (
            <motion.div
              key="call"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center gap-6 text-center"
            >
              <div className="px-3 py-1 rounded-full bg-vert-congo/20 border border-vert-congo/40 text-xs text-vert-light font-semibold">
                APPEL EN COURS (SIMULÉ)
              </div>

              <VoiceWave active size="xl" color="#0F3D32" barCount={9} />

              {matchResult?.candidate && (
                <div className="space-y-1">
                  <p className="text-lg font-bold text-blanc-chaud">
                    {matchResult.candidate.pseudo}
                  </p>
                  <p className="text-xs text-gris-texte">
                    {matchResult.candidate.city} · Score {matchResult.matchScore}/100
                  </p>
                </div>
              )}

              <div className="text-4xl font-mono font-black text-cuivre tabular-nums">
                {String(Math.floor(callTimer / 60)).padStart(2, "0")}:
                {String(callTimer % 60).padStart(2, "0")}
              </div>

              <div className="w-full bg-noir-border rounded-full h-1.5">
                <motion.div
                  className="h-1.5 bg-vert-congo rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: `${(callTimer / CALL_DURATION) * 100}%` }}
                  transition={{ duration: 0 }}
                />
              </div>

              <p className="text-xs text-gris-texte">
                Aucun numéro partagé. Anonymat total.
              </p>
            </motion.div>
          )}

          {/* STEP 6: Consentement */}
          {step === "consent" && (
            <motion.div
              key="consent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full text-center space-y-6"
            >
              <div className="text-5xl">🤝</div>
              <div>
                <h2 className="text-2xl font-black text-blanc-chaud mb-2">
                  Le feeling passe ?
                </h2>
                <p className="text-sm text-gris-texte">
                  Veux-tu continuer avec cette voix ?
                  <br />
                  L&apos;autre personne doit aussi dire oui.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => handleConsent("yes")}
                >
                  Oui, continuer
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => handleConsent("no")}
                >
                  Non, terminer proprement
                </Button>
              </div>

              <p className="text-xs text-gris-texte">
                Aucune pression. Les deux doivent dire oui.
              </p>
            </motion.div>
          )}

          {/* STEP 7: Attente consentement de l'autre */}
          {step === "consent_waiting" && (
            <motion.div
              key="consent_waiting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center gap-6 text-center"
            >
              <div className="text-4xl">⏳</div>
              <div>
                <h2 className="text-xl font-bold text-blanc-chaud mb-2">
                  On attend la réponse…
                </h2>
                <p className="text-sm text-gris-texte">
                  L&apos;autre voix décide de son côté.
                </p>
              </div>
              <VoiceWave active={false} size="md" barCount={5} />
            </motion.div>
          )}

          {/* STEP 8: Résultat */}
          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full text-center space-y-6"
            >
              {finalResult === "double_yes" ? (
                <>
                  <div className="text-5xl">🎉</div>
                  <div>
                    <h2 className="text-2xl font-black text-vert-light mb-2">
                      Double oui !
                    </h2>
                    <p className="text-sm text-gris-texte">
                      Vous pouvez continuer votre échange. En version réelle,
                      vous auriez accès à un canal prolongé — sans jamais
                      partager de numéro.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl">🕊️</div>
                  <div>
                    <h2 className="text-2xl font-black text-blanc-chaud mb-2">
                      Fin propre.
                    </h2>
                    <p className="text-sm text-gris-texte">
                      L&apos;appel s&apos;est terminé respectueusement. Aucun
                      contact ne s&apos;échange sans le double consentement.
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-3">
                <a href="#beta">
                  <Button size="xl" className="w-full glow-pulse">
                    Rejoindre la bêta
                  </Button>
                </a>
                <Button variant="outline" size="lg" className="w-full" onClick={handleReset}>
                  Recommencer la démo
                </Button>
              </div>

              <p className="text-xs text-gris-texte">
                Ceci était une démonstration. Aucun appel réel n&apos;a eu lieu.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
