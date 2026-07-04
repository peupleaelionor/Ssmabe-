/** Offres — préparées pour Stripe Europe + mobile money Afrique (plus tard). */
export interface Plan {
  id: string;
  name: string;
  price: string;
  period?: string;
  audience: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    price: "0 €",
    audience: "Tout le monde",
    features: ["Rejoindre les communautés", "Participer aux salons", "Voix + numéro protégé", "Alertes locales"],
    cta: "Rejoindre la bêta",
  },
  {
    id: "createur",
    name: "Créateur",
    price: "9,99 €",
    period: "/ mois",
    audience: "Créateurs & artistes",
    features: ["Ton espace créateur", "Outils de communauté", "Mise en avant", "Soutien de tes membres (à venir)"],
    highlight: true,
    cta: "Rejoindre comme créateur",
  },
  {
    id: "association",
    name: "Association",
    price: "19 €",
    period: "/ mois",
    audience: "Assos & collectifs",
    features: ["Espace association", "Événements & annonces", "Modération dédiée", "Portée diaspora"],
    cta: "Nous contacter",
  },
  {
    id: "business",
    name: "Business local",
    price: "29 €",
    period: "/ mois",
    audience: "Commerces & marché local",
    features: ["Vitrine commerce", "Marketplace légère", "Alertes clients", "Paiement mobile money (à venir)"],
    cta: "Nous contacter",
  },
];

export const EVENT_NOTE =
  "Événement : commission future sur les billets et soutiens. Rien à payer pendant la bêta.";

export const PRICING_NOTE =
  "Bêta gratuite pour tous. Les offres payantes arrivent avec Stripe (Europe) et mobile money (Afrique) — annoncées clairement avant activation.";
