/** Communautés — données mockées structurées (source unique). */
export interface Community {
  id: string;
  name: string;
  country: string;
  city?: string;
  category:
    | "Ville" | "Diaspora" | "Créateurs" | "Musique" | "Marché"
    | "Étudiants" | "Famille" | "Entrepreneurs" | "Alertes" | "Associations";
  description: string;
  memberCount: string;
  status: "active" | "beta";
  tags: string[];
  ctaLabel: string;
}

export const COMMUNITIES: Community[] = [
  { id: "kinshasa", name: "Kinshasa", country: "RDC", city: "Kinshasa", category: "Ville", description: "Le cœur de nos échanges locaux.", memberCount: "12,4K", status: "beta", tags: ["local", "actualité", "entraide"], ctaLabel: "Rejoindre" },
  { id: "goma", name: "Goma", country: "RDC", city: "Goma", category: "Ville", description: "Solidarité et infos du Kivu.", memberCount: "4,1K", status: "beta", tags: ["local", "alertes"], ctaLabel: "Rejoindre" },
  { id: "lubumbashi", name: "Lubumbashi", country: "RDC", city: "Lubumbashi", category: "Ville", description: "Le grand Katanga se parle.", memberCount: "5,8K", status: "beta", tags: ["local", "business"], ctaLabel: "Rejoindre" },
  { id: "mbandaka", name: "Mbandaka", country: "RDC", city: "Mbandaka", category: "Ville", description: "La voix de l'Équateur.", memberCount: "1,9K", status: "beta", tags: ["local"], ctaLabel: "Rejoindre" },
  { id: "brazzaville", name: "Brazzaville", country: "Congo", city: "Brazzaville", category: "Ville", description: "Les deux rives, une conversation.", memberCount: "3,2K", status: "beta", tags: ["local", "culture"], ctaLabel: "Rejoindre" },
  { id: "diaspora-france", name: "Diaspora France", country: "France", category: "Diaspora", description: "Rester lié au pays depuis Paris et ailleurs.", memberCount: "8,7K", status: "beta", tags: ["diaspora", "entraide"], ctaLabel: "Rejoindre ma diaspora" },
  { id: "diaspora-belgique", name: "Diaspora Belgique", country: "Belgique", category: "Diaspora", description: "Matonge et toute la Belgique connectées.", memberCount: "5,3K", status: "beta", tags: ["diaspora"], ctaLabel: "Rejoindre ma diaspora" },
  { id: "diaspora-canada", name: "Diaspora Canada", country: "Canada", category: "Diaspora", description: "Montréal, Ottawa, Toronto — le lien continue.", memberCount: "3,6K", status: "beta", tags: ["diaspora"], ctaLabel: "Rejoindre ma diaspora" },
  { id: "createurs", name: "Créateurs", country: "Monde", category: "Créateurs", description: "Ta voix peut devenir ton travail.", memberCount: "2,2K", status: "beta", tags: ["créateurs", "monétisation"], ctaLabel: "Créer une communauté" },
  { id: "entrepreneurs", name: "Entrepreneurs", country: "Monde", category: "Entrepreneurs", description: "Projets, conseils, opportunités.", memberCount: "3,9K", status: "beta", tags: ["business"], ctaLabel: "Rejoindre" },
  { id: "musique", name: "Musique", country: "Monde", category: "Musique", description: "Rumba, gospel, rap — la scène vit ici.", memberCount: "6,5K", status: "beta", tags: ["culture"], ctaLabel: "Rejoindre" },
  { id: "marche-local", name: "Marché local", country: "RDC", category: "Marché", description: "Vendre et acheter, sans usine à gaz.", memberCount: "4,4K", status: "beta", tags: ["marketplace"], ctaLabel: "Voir" },
  { id: "etudiants", name: "Étudiants", country: "Monde", category: "Étudiants", description: "Campus, bourses, entraide.", memberCount: "5,1K", status: "beta", tags: ["études"], ctaLabel: "Rejoindre" },
  { id: "familles", name: "Familles", country: "Monde", category: "Famille", description: "Le lien familial par-delà les distances.", memberCount: "2,8K", status: "beta", tags: ["famille"], ctaLabel: "Rejoindre" },
  { id: "alertes-locales", name: "Alertes locales", country: "RDC", category: "Alertes", description: "Ce qui se passe près de chez toi, en temps réel.", memberCount: "9,3K", status: "beta", tags: ["alertes", "sécurité"], ctaLabel: "Voir" },
];

export const getCommunity = (id: string) => COMMUNITIES.find((c) => c.id === id);
