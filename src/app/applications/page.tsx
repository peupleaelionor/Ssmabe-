import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/mvp/PageShell";

export const metadata: Metadata = {
  title: "Applications",
  description: "Web installable (PWA) aujourd'hui. App Android et iOS ensuite, avec appels, messages et mobile money.",
};

const STEPS = [
  { icon: "🌐", title: "Web installable (PWA)", text: "Disponible maintenant : ajoute Songi Songi à ton écran d'accueil depuis le navigateur.", status: "Disponible" },
  { icon: "🤖", title: "App Android", text: "Priorité au continent : légère, rapide, pensée 3G.", status: "En préparation" },
  { icon: "🍏", title: "App iOS", text: "Pour la diaspora et au-delà.", status: "En préparation" },
  { icon: "📞", title: "Appels & messages", text: "Appels voix numéro masqué, salons audio, messages.", status: "Bientôt" },
  { icon: "🔔", title: "Notifications", text: "Alertes locales et nouvelles de tes communautés.", status: "Bientôt" },
  { icon: "📱", title: "Mobile money", text: "Airtel, Orange, M-Pesa — payer comme au pays.", status: "Futur" },
];

export default function ApplicationsPage() {
  return (
    <PageShell>
      <PageHero title="L'app arrive. Le web est déjà là." text="On construit dans l'ordre : web léger d'abord, applications ensuite." />
      <div className="mx-auto max-w-4xl px-5 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-olive/20 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xl" aria-hidden>{s.icon}</span>
                <span className="rounded-full bg-terra/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-terra">{s.status}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ivoire">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gris-doux">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-gris-doux">
          Sois prévenu en premier : <Link href="/beta?source=applications-page" className="text-terra underline underline-offset-2">rejoins la bêta</Link>.
        </p>
      </div>
    </PageShell>
  );
}
