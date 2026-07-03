import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/config/contact";
import { getCallHref, getSmsHref } from "@/lib/call";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Songi Songi Mabé — Mode léger",
  description: "Peu de connexion ? Rejoins Songi Songi Mabé par appel ou message.",
};

/**
 * /lite — page ultra légère : SSR pur, zéro framer-motion, zéro image,
 * pensée 2G/Edge et vieux Android. Le strict nécessaire pour rejoindre.
 */
export default function LitePage() {
  const call = getCallHref();
  const wa = getWhatsAppHref();
  const sms = getSmsHref();

  const btn =
    "block w-full rounded-full px-6 py-4 text-center text-base font-semibold";

  return (
    <main className="min-h-screen bg-noir-abysse px-5 py-10 font-sans text-ivoire antialiased" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto max-w-sm">
        <h1 className="font-display text-2xl font-extrabold leading-snug">
          Songi Songi Mabé
        </h1>
        <p className="mt-1 text-sm text-terra">Né à Kinshasa. Pensé pour toutes les communautés.</p>
        <p className="mt-5 text-sm leading-relaxed text-gris-doux">
          Peu de connexion ? Rejoins Songi Songi Mabé par appel ou message.
          Ton numéro ne sera jamais affiché publiquement. 18+ uniquement.
        </p>

        <div className="mt-8 space-y-3">
          {call ? (
            <a href={call} className={`${btn} bg-terra text-noir-abysse`}>📞 Appeler pour rejoindre</a>
          ) : (
            <span className={`${btn} border border-olive/30 text-gris-doux`}>📞 Numéro bientôt disponible</span>
          )}
          {wa ? (
            <a href={wa} className={`${btn} bg-olive text-ivoire`}>💬 Rejoindre par WhatsApp</a>
          ) : (
            <span className={`${btn} border border-olive/30 text-gris-doux`}>💬 WhatsApp bientôt disponible</span>
          )}
          {sms ? <a href={sms} className={`${btn} border border-olive/40 text-ivoire`}>✉️ Rejoindre par SMS</a> : null}
          <Link href="/beta?source=lite" prefetch={false} className={`${btn} border border-terra/50 text-terra`}>✦ Formulaire bêta</Link>
        </div>

        <p className="mt-8 text-xs text-gris-doux/70">
          Contact uniquement pour la bêta · Consentement obligatoire ·{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-2">{CONTACT.email}</a>
        </p>
        <p className="mt-3 text-xs text-gris-doux/50"><Link href="/" prefetch={false} className="underline underline-offset-2">← Version complète</Link></p>
      </div>
    </main>
  );
}
