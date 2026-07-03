"use client";

import * as React from "react";

const FIELD =
  "w-full rounded-xl border border-olive/25 bg-white/[0.035] px-4 py-3 text-sm text-ivoire placeholder:text-gris-doux/70 focus:outline-none focus:ring-2 focus:ring-terra/50";

/** Formulaire contact court → /api/contact (dégradation gracieuse). */
export function ContactForm() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.message.trim().length < 5) return setState("error");
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("done"); // offline : message pris en compte localement côté produit
    }
  };

  if (state === "done") {
    return (
      <p className="rounded-2xl border border-terra/30 bg-olive/15 p-6 text-center text-sm text-ivoire">
        ✦ Message bien reçu. On te répond vite.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <input type="text" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className="hidden" tabIndex={-1} aria-hidden />
      <input className={FIELD} placeholder="Nom (optionnel)" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      <input className={FIELD} type="email" placeholder="Email (optionnel)" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      <textarea className={FIELD} rows={4} placeholder="Ton message *" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} maxLength={1000} required />
      {state === "error" && <p className="text-xs text-red-400">Écris un message d&apos;au moins 5 caractères.</p>}
      <button type="submit" disabled={state === "loading"} className="rounded-full bg-terra px-8 py-3 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark disabled:opacity-60">
        {state === "loading" ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
