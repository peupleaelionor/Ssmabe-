import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactOptions } from "@/components/mvp/ContactOptions";

export const metadata: Metadata = {
  title: "Créer un cercle — Songi Songi Mabé",
  description: "Crée une porte d’entrée simple pour ta communauté : lien, QR code, WhatsApp, SMS, appel et mode léger.",
};

const circleTypes = [
  "Rencontre", "Amitié", "Diaspora", "Famille", "Créateur", "Association",
  "Commerce", "Événement", "Quartier", "Spiritualité", "Musique", "Entraide",
];

const outputs = [
  { title: "Lien public", text: "Une adresse simple à partager partout." },
  { title: "QR code", text: "Pour flyers, événements, boutiques et affiches." },
  { title: "WhatsApp prêt", text: "Un message d’invitation prérempli." },
  { title: "SMS / appel", text: "Pour ceux qui ont peu de data ou un vieux téléphone." },
  { title: "Page lite", text: "Une version ultra légère pour 2G/3G." },
  { title: "Règles & sécurité", text: "Consentement, signalement, modération et numéro protégé." },
];

export default function CreateCirclePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-noir-abysse via-vert-nuit to-noir-abysse font-sans text-ivoire antialiased">
      <Header />

      <section className="px-5 pb-14 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Créer mon cercle</p>
              <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.05] text-ivoire sm:text-6xl">
                Crée ta communauté en 30 secondes.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-gris-doux">
                Une porte d’entrée simple pour parler, rencontrer, organiser et rassembler. Les gens peuvent rejoindre par lien, WhatsApp, SMS, appel ou mode léger — sans installer une application.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/beta?source=create-circle" className="flex min-h-11 items-center justify-center rounded-full bg-terra px-7 py-3 text-sm font-semibold text-noir-abysse transition hover:bg-terra-dark">
                  Demander mon cercle
                </Link>
                <Link href="/lite" className="flex min-h-11 items-center justify-center rounded-full border border-olive/35 px-7 py-3 text-sm font-semibold text-ivoire transition hover:border-terra/60">
                  Voir le mode léger
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-olive/20 bg-white/[0.035] p-5 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.8)]">
              <p className="text-xs uppercase tracking-[0.2em] text-terra">Aperçu</p>
              <div className="mt-4 rounded-3xl border border-olive/15 bg-noir-abysse/55 p-5">
                <p className="text-sm text-gris-doux">ssmabe.com/</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ivoire">matonge-voix</p>
                <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-gris-doux">
                  <span className="rounded-full border border-olive/20 px-3 py-2">📞 Appel</span>
                  <span className="rounded-full border border-olive/20 px-3 py-2">💬 WhatsApp</span>
                  <span className="rounded-full border border-olive/20 px-3 py-2">✉️ SMS</span>
                  <span className="rounded-full border border-olive/20 px-3 py-2">⚡ Lite</span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-gris-doux">
                  Ton cercle garde l’esprit téléchat : simple, vocal, protégé. L’architecture prépare les salons, paiements, événements et traductions futures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-semibold text-ivoire sm:text-4xl">Quel type de cercle ?</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {circleTypes.map((type) => (
              <span key={type} className="rounded-full border border-olive/25 bg-white/[0.035] px-4 py-2 text-sm text-gris-doux">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-semibold text-ivoire sm:text-4xl">Ce que chaque cercle doit générer</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outputs.map((item) => (
              <article key={item.title} className="rounded-3xl border border-olive/15 bg-white/[0.035] p-5">
                <h3 className="font-semibold text-ivoire">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gris-doux">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-olive/10 bg-vert-nuit/45 px-5 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">Toujours simple</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ivoire sm:text-4xl">
            Devant : téléchat. Derrière : futur.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gris-doux sm:text-base">
            L’utilisateur ne voit pas une usine à gaz. Il voit seulement appeler, parler, rejoindre et partager. La plateforme prépare en silence la sécurité, les paiements, la traduction vocale et les cercles monétisables.
          </p>
          <ContactOptions className="mx-auto mt-8 max-w-2xl" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
