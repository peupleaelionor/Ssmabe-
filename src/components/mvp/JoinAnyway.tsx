import Link from "next/link";
import { isCallReady, isWhatsAppReady } from "@/config/contact";

/** « Même sans bonne connexion, tu peux entrer. » — 4 canaux d'entrée. */
export function JoinAnyway() {
  const cards = [
    { icon: "📝", title: "Formulaire web", text: "Une minute, téléphone optionnel.", href: "/beta?source=join-section", live: true },
    { icon: "📞", title: "Appel direct", text: isCallReady() ? "Appelle et on t'inscrit de vive voix." : "Numéro bientôt disponible.", href: "/lite", live: isCallReady() },
    { icon: "💬", title: "WhatsApp / SMS", text: isWhatsAppReady() ? "Un message prérempli suffit." : "Bientôt disponible.", href: "/lite", live: isWhatsAppReady() },
    { icon: "⚡", title: "Mode léger", text: "Page ultra rapide, pensée 2G/3G.", href: "/lite", live: true },
  ];

  return (
    <section className="border-y border-olive/10 bg-vert-nuit/40 px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ivoire sm:text-4xl">
          Même sans bonne connexion, tu peux entrer.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gris-doux sm:text-base">
          Songi Songi Mabé est pensé pour les réalités africaines : petits téléphones,
          data limitée, appels simples, langues locales et contact protégé.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="card-lift rounded-2xl border border-olive/20 bg-white/[0.035] p-4 text-left transition hover:border-terra/50"
            >
              <span className="text-lg" aria-hidden>{card.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ivoire">{card.title}</h3>
              <p className={`mt-1 text-xs leading-relaxed ${card.live ? "text-gris-doux" : "text-gris-doux/60"}`}>{card.text}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-xs text-gris-doux">
          Tu peux rejoindre la première vague par formulaire, appel, WhatsApp ou SMS.
        </p>
      </div>
    </section>
  );
}
