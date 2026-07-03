"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { LANGUAGES_LIST } from "@/lib/language-brain/languages";
import { submitBetaSignup } from "@/lib/mabe/beta";
import { analytics } from "@/lib/analytics";
import { getContent } from "@/content";

const c = getContent("fr");

const FIELD =
  "w-full rounded-xl border border-olive/25 bg-white/[0.035] px-4 py-3.5 text-sm text-ivoire placeholder:text-gris-doux/70 focus:outline-none focus:ring-2 focus:ring-terra/50 appearance-none";

/**
 * Formulaire bêta — 3 champs, validation locale, Supabase-ready
 * (passe par lib/mabe/beta : API /api/beta puis fallback localStorage).
 */
export function BetaForm() {
  const [form, setForm] = React.useState({ pseudo: "", country: "", language: "" });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    analytics.betaFormViewed();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.pseudo.trim().length < 2) {
      setError(c.beta.errors.pseudo);
      return;
    }
    if (!form.country) {
      setError(c.beta.errors.country);
      return;
    }
    if (!form.language) {
      setError(c.beta.errors.language);
      return;
    }

    setError("");
    setLoading(true);
    const result = await submitBetaSignup({
      pseudo: form.pseudo,
      country: form.country,
      language: form.language,
      intention: "decouverte",
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? c.beta.errors.generic);
      return;
    }

    analytics.betaSignupSubmitted({
      country: form.country,
      language: form.language,
      intention: "decouverte",
      hasContact: false,
    });
    setDone(true);
  };

  return (
    <section id="beta" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ivoire sm:text-4xl">
            {c.beta.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            {c.beta.text}
          </p>
        </motion.div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-2xl border border-olive/30 bg-olive/15 p-8 text-center"
          >
            <span className="text-2xl" aria-hidden>✦</span>
            <p className="mt-3 font-display text-lg font-semibold text-ivoire">
              {c.beta.success}
            </p>
            <p className="mt-2 text-sm text-gris-doux">
              {c.beta.successSub}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3" noValidate>
            <label className="sr-only" htmlFor="beta-pseudo">Prénom</label>
            <input
              id="beta-pseudo"
              className={FIELD}
              placeholder={c.beta.fields.pseudo}
              value={form.pseudo}
              onChange={(e) => setForm((f) => ({ ...f, pseudo: e.target.value }))}
              maxLength={50}
              required
            />

            <label className="sr-only" htmlFor="beta-country">Pays</label>
            <select
              id="beta-country"
              className={FIELD}
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              required
            >
              <option value="" className="bg-vert-nuit">{c.beta.fields.country}</option>
              {COUNTRIES_LIST.map((c) => (
                <option key={c.code} value={c.code} className="bg-vert-nuit">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="beta-language">Langue principale</label>
            <select
              id="beta-language"
              className={FIELD}
              value={form.language}
              onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
              required
            >
              <option value="" className="bg-vert-nuit">{c.beta.fields.language}</option>
              {LANGUAGES_LIST.map((l) => (
                <option key={l.code} value={l.code} className="bg-vert-nuit">
                  {l.name}
                </option>
              ))}
            </select>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-full bg-terra px-8 py-3.5 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? c.beta.submitting : c.beta.submit}
            </button>

            <p className="text-center text-[11px] text-gris-doux/80">
              {c.beta.note}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
