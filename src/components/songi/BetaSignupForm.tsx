"use client";

import { useState } from "react";
import { submitBetaSignup } from "@/lib/mabe/beta";
import { analytics } from "@/lib/analytics";
import { PrimaryCTA } from "./PrimaryCTA";
import { cn } from "@/lib/utils";

export interface BetaSignupFormProps {
  className?: string;
  /** Callback après succès (analytics, etc.). */
  onSuccess?: () => void;
}

const INTENTIONS = [
  { value: "chill", label: "Chill" },
  { value: "serieux", label: "Sérieux" },
  { value: "diaspora", label: "Diaspora" },
  { value: "decouverte", label: "Découverte" },
];

const FIELD =
  "w-full rounded-xl border border-noir-border bg-noir px-4 py-3 text-sm text-blanc-chaud placeholder:text-gris-texte focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vert-light";

/**
 * Formulaire bêta réutilisable et typé. Contact OPTIONNEL (privacy-first).
 * S'appuie sur la façade Mabé (Supabase + fallback localStorage).
 */
export function BetaSignupForm({ className, onSuccess }: BetaSignupFormProps) {
  const [form, setForm] = useState({
    pseudo: "",
    country: "",
    city: "",
    language: "",
    intention: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await submitBetaSignup(form);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue. Réessaie.");
      return;
    }
    analytics.betaSignupSubmitted({
      country: form.country,
      language: form.language,
      intention: form.intention,
      hasContact: Boolean(form.contact && form.contact.trim().length > 0),
    });
    setDone(true);
    onSuccess?.();
  };

  if (done) {
    return (
      <div className={cn("rounded-3xl border border-vert-congo bg-vert-congo/10 p-8 text-center", className)}>
        <div className="mb-3 text-4xl">🎉</div>
        <p className="text-base font-bold text-blanc-chaud">Inscription reçue.</p>
        <p className="mt-1 text-sm text-gris-texte">Mabé te préviendra quand la bêta ouvre.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)} noValidate>
      <input className={FIELD} placeholder="Pseudo *" value={form.pseudo} onChange={update("pseudo")} required minLength={2} />
      <input className={FIELD} placeholder="Pays * (ex. CD)" value={form.country} onChange={update("country")} required />
      <input className={FIELD} placeholder="Ville (optionnel)" value={form.city} onChange={update("city")} />
      <input className={FIELD} placeholder="Langue * (ex. fr)" value={form.language} onChange={update("language")} required />
      <select className={FIELD} value={form.intention} onChange={update("intention")} required>
        <option value="">Ce que tu cherches *</option>
        {INTENTIONS.map((i) => (
          <option key={i.value} value={i.value}>{i.label}</option>
        ))}
      </select>
      <input className={FIELD} placeholder="Email ou WhatsApp (optionnel)" value={form.contact} onChange={update("contact")} />
      <p className="text-xs text-gris-texte">* Champs requis. Le contact est facultatif — on ne force jamais ton numéro.</p>
      {error ? <p className="text-xs text-danger">{error}</p> : null}
      <PrimaryCTA type="submit" disabled={loading} className="mt-1 w-full">
        {loading ? "Envoi…" : "Je veux tester →"}
      </PrimaryCTA>
    </form>
  );
}
