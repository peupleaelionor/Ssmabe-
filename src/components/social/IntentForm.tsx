"use client";

import * as React from "react";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { submitWaitlist } from "@/lib/waitlist";
import { haptic } from "@/lib/haptics";
import { toast } from "@/components/ds/toast-bus";
import { analytics } from "@/lib/analytics";

const FIELD =
  "w-full rounded-xl border border-olive/25 bg-white/[0.04] px-4 py-3 text-sm text-ivoire placeholder:text-gris-doux/70 focus:outline-none focus:ring-2 focus:ring-terra/50 appearance-none";

/**
 * Formulaire express de capture d'intention — Prénom + Email + Pays.
 * Réutilise le backend waitlist existant (submitWaitlist → /api/waitlist,
 * fallback localStorage). Langue = fr (site FR), profil = "autre" (neutre) ;
 * l'utilisateur peut compléter son profil plus tard via /beta.
 * Code-splitté : chargé uniquement à l'ouverture de la modal.
 */
export function IntentForm({ source, onDone }: { source: string; onDone: () => void }) {
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [website, setWebsite] = React.useState(""); // honeypot
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    haptic("tap");
    const res = await submitWaitlist({
      firstName,
      email,
      phone: "",
      country,
      city: "",
      language: "fr",
      profileType: "autre",
      community: "",
      goal: "",
      message: "",
      consent,
      source,
      website,
    });
    setLoading(false);
    if (!res.ok) {
      const msg = res.error ?? "Un petit souci est survenu. Réessaie.";
      setError(msg);
      haptic("error");
      return;
    }
    haptic("success");
    analytics.betaFormSuccess(source);
    toast({ variant: "success", title: "C'est noté !", description: "On te prévient dès l'ouverture de ce canal." });
    setDone(true);
  };

  if (done) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive/20 text-2xl" aria-hidden>
          ✓
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-ivoire">
          C&apos;est noté{firstName ? `, ${firstName.trim()}` : ""} !
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gris-doux">
          Tu seras prévenu·e en premier dès l&apos;ouverture de ce canal.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-6 w-full rounded-full border border-olive/25 px-6 py-3 text-sm font-semibold text-gris-doux transition hover:border-terra/50 hover:text-terra"
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-1 flex flex-col gap-2.5 text-left" noValidate>
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      <input
        className={FIELD}
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        maxLength={60}
        autoComplete="given-name"
        required
      />
      <input
        className={FIELD}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <select className={FIELD} value={country} onChange={(e) => setCountry(e.target.value)} required aria-label="Pays">
        <option value="" className="bg-vert-nuit">Ton pays</option>
        {COUNTRIES_LIST.map((x) => (
          <option key={x.code} value={x.name} className="bg-vert-nuit">
            {x.flag} {x.name}
          </option>
        ))}
      </select>
      <label className="flex items-start gap-2.5 text-left text-[11px] leading-relaxed text-gris-doux">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-terra" required />
        <span>
          J&apos;accepte d&apos;être contacté·e pour la bêta. Numéro jamais affiché,{" "}
          <a href="/privacy" className="text-terra underline underline-offset-2">confidentialité</a>.
        </span>
      </label>

      {error && <p className="text-xs text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/60"
      >
        {loading ? "Un instant…" : "Être prévenu·e en premier"}
      </button>
      <a
        href={`/beta?source=${source}`}
        className="text-center text-[11px] text-gris-doux/80 underline-offset-2 transition hover:text-terra hover:underline"
      >
        Ou remplir le formulaire complet →
      </a>
    </form>
  );
}
