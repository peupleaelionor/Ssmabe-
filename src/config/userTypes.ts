/** Types de profil bêta + objectifs. */
export const USER_TYPES = [
  { value: "createur", label: "Créateur" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "etudiant", label: "Étudiant" },
  { value: "commercant", label: "Commerçant" },
  { value: "association", label: "Association" },
  { value: "media", label: "Média" },
  { value: "diaspora", label: "Diaspora" },
  { value: "famille", label: "Famille" },
  { value: "autre", label: "Autre" },
] as const;

export const GOALS = [
  { value: "discuter", label: "Discuter avec ma communauté" },
  { value: "salon", label: "Créer un salon" },
  { value: "alertes", label: "Suivre des alertes locales" },
  { value: "rencontre", label: "Rencontrer des personnes sérieuses" },
  { value: "promouvoir", label: "Promouvoir mes projets" },
  { value: "vendre", label: "Vendre / acheter localement" },
  { value: "diaspora", label: "Garder le lien avec la diaspora" },
  { value: "autre", label: "Autre" },
] as const;

export type UserType = (typeof USER_TYPES)[number]["value"];
export type Goal = (typeof GOALS)[number]["value"];
