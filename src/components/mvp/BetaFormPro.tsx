"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { LANGUAGES_LIST } from "@/lib/language-brain/languages";
import { CITIES } from "@/config/cities";
import { USER_TYPES, GOALS } from "@/config/userTypes";
import { COMMUNITIES, getCommunity } from "@/config/communities";
import { submitWaitlist } from "@/lib/waitlist";
import { analytics } from "@/lib/analytics";
import { getContent } from "@/content";

const c = getContent("fr");

const FIELD =
  "w-full rounded-xl border border-olive/25 bg-white/[0.035] px-4 py-3 text-sm text-ivoire placeholder:text-gris-doux/70 focus:outline-none focus:ring-2 focus:ring-terra/50 appearance-none";
const OPT = "bg-vert-nuit";

/**
 * Formulaire bêta intelligent — préremplissage par query params
 * (?type= &community= &country= &city= &source=), honeypot, rate-limité
 * côté API, succès personnalisé par profil, fallback localStorage.
 */
/** Noms courts (config/communities) → noms complets du sélecteur pays. */
const COUNTRY_ALIASES: Record<string, string> = {
  RDC: "République Démocratique du Congo",
  Congo: "République du Congo",
  Monde: "",
};
const resolveCountry = (raw: string): string => COUNTRY_ALIASES[raw] ?? raw;

export function BetaFormPro() {
  const params = useSearchParams();
  const preCommunity = getCommunity(params.get("community") ?? "");

  const [form, setForm] = React.useState({
    firstName: "",
    email: "",
    phone: "",
    country: resolveCountry(params.get("country") ?? preCommunity?.country ?? ""),
    city: params.get("city") ?? preCommunity?.city ?? "",
    language: "",
    profileType: params.get("type") ?? (preCommunity?.category === "Diaspora" ? "diaspora" : ""),
    community: preCommunity?.id ?? "",
    goal: "",
    message: "",
    consent: false,
    website: "", // honeypot
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const started = React.useRef(false);

  React.useEffect(() => {
    analytics.betaFormViewed();
  }, []);

  const up =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      if (!started.current) {
        started.current = true;
        analytics.betaFormStart();
      }
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((f) => ({ ...f, [k]: value }));
    };

  const successFor = (profileType: string, community: string): string => {
    if (profileType === "createur") return c.beta.successByProfile.createur;
    if (profileType === "diaspora" || community.startsWith("diaspora")) return c.beta.successByProfile.diaspora;
    if (community && !community.startsWith("diaspora")) return c.beta.successByProfile.local;
    return c.beta.success;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    analytics.betaFormSubmit();
    const result = await submitWaitlist({
      ...form,
      source: params.get("source") ?? "beta-page",
    });
    setLoading(false);
    if (!result.ok) {
      const msg = result.error ?? c.beta.errors.generic;
      setError(msg);
      analytics.betaFormError(msg.slice(0, 40));
      return;
    }
    analytics.betaFormSuccess(form.profileType || "unknown");
    setSuccessMsg(successFor(form.profileType, form.community));
  };

  if (successMsg) {
    return (
      <div className="rounded-2xl border border-terra/30 bg-olive/15 p-8 text-center">
        <span className="text-2xl" aria-hidden>✦</span>
        <p className="mt-3 font-display text-lg font-semibold text-ivoire">{successMsg}</p>
        <p className="mt-2 text-sm text-gris-doux">
          Prochaines étapes : on t&apos;écrit dès l&apos;ouverture de ta communauté. En attendant,
          explore les <a href="/communautes" className="text-terra underline underline-offset-2">communautés</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {/* Honeypot invisible */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={up("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input className={FIELD} placeholder="Prénom *" value={form.firstName} onChange={up("firstName")} maxLength={60} required />
        <input className={FIELD} type="email" placeholder="Email *" value={form.email} onChange={up("email")} required />
      </div>

      <input className={FIELD} type="tel" placeholder="Téléphone (optionnel — jamais affiché)" value={form.phone} onChange={up("phone")} />

      <div className="grid gap-3 sm:grid-cols-2">
        <select className={FIELD} value={form.country} onChange={up("country")} required>
          <option value="" className={OPT}>Pays *</option>
          {COUNTRIES_LIST.map((x) => (
            <option key={x.code} value={x.name} className={OPT}>{x.flag} {x.name}</option>
          ))}
        </select>
        <select className={FIELD} value={form.city} onChange={up("city")}>
          <option value="" className={OPT}>Ville</option>
          {CITIES.map((x) => (
            <option key={x} value={x} className={OPT}>{x}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <select className={FIELD} value={form.language} onChange={up("language")} required>
          <option value="" className={OPT}>Langue principale *</option>
          {LANGUAGES_LIST.map((x) => (
            <option key={x.code} value={x.code} className={OPT}>{x.name}</option>
          ))}
        </select>
        <select className={FIELD} value={form.profileType} onChange={up("profileType")} required>
          <option value="" className={OPT}>Type de profil *</option>
          {USER_TYPES.map((x) => (
            <option key={x.value} value={x.value} className={OPT}>{x.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <select className={FIELD} value={form.community} onChange={up("community")}>
          <option value="" className={OPT}>Communauté souhaitée</option>
          {COMMUNITIES.map((x) => (
            <option key={x.id} value={x.id} className={OPT}>{x.name}</option>
          ))}
        </select>
        <select className={FIELD} value={form.goal} onChange={up("goal")}>
          <option value="" className={OPT}>Ton objectif</option>
          {GOALS.map((x) => (
            <option key={x.value} value={x.value} className={OPT}>{x.label}</option>
          ))}
        </select>
      </div>

      <textarea className={FIELD} rows={3} placeholder="Message (optionnel)" value={form.message} onChange={up("message")} maxLength={500} />

      <label className="flex items-start gap-2.5 text-xs text-gris-doux">
        <input type="checkbox" checked={form.consent} onChange={up("consent")} className="mt-0.5 accent-terra" required />
        <span>
          J&apos;accepte d&apos;être contacté pour la bêta. Collecte minimale, jamais de revente,{" "}
          <a href="/privacy" className="text-terra underline underline-offset-2">confidentialité</a>.
        </span>
      </label>

      {error && <p className="text-xs text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-full bg-terra px-8 py-3.5 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark disabled:pointer-events-none disabled:opacity-60"
      >
        {loading ? c.beta.submitting : c.beta.submit}
      </button>

      <p className="text-center text-[11px] text-gris-doux/80">{c.beta.note}</p>
    </form>
  );
}
