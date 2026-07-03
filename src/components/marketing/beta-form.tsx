"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountryCode, LanguageCode } from "@/lib/types";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { LANGUAGES_LIST } from "@/lib/language-brain/languages";
import { BETA_INTENTIONS } from "@/lib/constants/config";
import { submitBetaSignup } from "@/lib/mabe/beta";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const intentions = BETA_INTENTIONS;

export function BetaForm() {
  const [form, setForm] = React.useState({
    pseudo: "",
    country: CountryCode.CD as string,
    city: "",
    language: LanguageCode.FR as string,
    intention: "",
    contact: "",
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Funnel : vue du formulaire bêta (anonyme, no-op si analytics non configurée).
  React.useEffect(() => {
    analytics.betaFormViewed();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pseudo || !form.country || !form.language || !form.intention) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    setError("");

    // Persist via the Mabé beta module (local mock today, Supabase tomorrow)
    const result = await submitBetaSignup({
      pseudo: form.pseudo,
      country: form.country,
      city: form.city,
      language: form.language,
      intention: form.intention,
      contact: form.contact,
    });

    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue. Réessaie.");
      return;
    }

    // Conversion (propriétés anonymes uniquement : pas de pseudo ni contact).
    analytics.betaSignupSubmitted({
      country: form.country,
      language: form.language,
      intention: form.intention,
      hasContact: Boolean(form.contact && form.contact.trim().length > 0),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="beta" className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 rounded-3xl border border-vert-congo bg-vert-congo/10"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-black text-blanc-chaud mb-3">
              Inscription reçue.
            </h3>
            <p className="text-gris-texte text-sm leading-relaxed mb-4">
              <strong className="text-blanc-chaud">{form.pseudo}</strong>, Mabé
              te préviendra quand la bêta ouvre. Merci de croire au projet.
            </p>
            <div className="text-2xl">🇨🇩 🇨🇬 🎙</div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="beta" className="py-20 px-4 bg-noir-light">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-cuivre/20 border border-cuivre/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-bold text-cuivre uppercase tracking-wide">
              🔑 Accès bêta privée
            </span>
          </div>
          <h2 className="text-3xl font-black text-blanc-chaud mb-3 tracking-tight">
            Entre dans la première vague.
          </h2>
          <p className="text-gris-texte text-sm leading-relaxed">
            Teste Songi Songi Mabé avant l&apos;ouverture publique.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Ton pseudo *"
            placeholder="Comment tu veux qu'on t'appelle ?"
            value={form.pseudo}
            onChange={(e) => setForm({ ...form, pseudo: e.target.value })}
            maxLength={30}
          />

          <div>
            <label className="text-sm font-medium text-blanc-chaud/80 block mb-1.5">
              Ton pays *
            </label>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className={cn(
                "w-full bg-noir-light border border-noir-border text-blanc-chaud",
                "rounded-xl px-4 py-3 text-sm",
                "focus:outline-none focus:border-vert-congo focus:ring-1 focus:ring-vert-congo",
                "transition-colors duration-200"
              )}
            >
              {COUNTRIES_LIST.map((c) => (
                <option key={c.code} value={c.code} className="bg-noir-card">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Ta ville (optionnel)"
            placeholder="Ex: Kinshasa, Paris, Montréal…"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <div>
            <label className="text-sm font-medium text-blanc-chaud/80 block mb-1.5">
              Ta langue préférée *
            </label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className={cn(
                "w-full bg-noir-light border border-noir-border text-blanc-chaud",
                "rounded-xl px-4 py-3 text-sm",
                "focus:outline-none focus:border-vert-congo focus:ring-1 focus:ring-vert-congo",
                "transition-colors duration-200"
              )}
            >
              {LANGUAGES_LIST.map((l) => (
                <option key={l.code} value={l.code} className="bg-noir-card">
                  {l.flag} {l.nameLocal}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-blanc-chaud/80 block mb-2">
              Tu cherches quoi ? *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {intentions.map((intent) => (
                <button
                  key={intent.value}
                  type="button"
                  onClick={() => setForm({ ...form, intention: intent.value })}
                  className={cn(
                    "py-2 px-3 rounded-xl text-sm font-medium border transition-all",
                    "active:scale-95",
                    form.intention === intent.value
                      ? "border-vert-congo bg-vert-congo/20 text-vert-light"
                      : "border-noir-border text-gris-texte hover:border-vert-congo/30"
                  )}
                >
                  {intent.label}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Contact (optionnel)"
            placeholder="Email ou numéro WhatsApp pour te prévenir"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            hint="On ne partage jamais tes données. Juste pour t'alerter."
          />

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Inscription en cours…" : "Je veux tester →"}
          </Button>

          <p className="text-xs text-gris-texte text-center">
            Aucun paiement requis pour la bêta. Tolérance zéro pour le spam.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
