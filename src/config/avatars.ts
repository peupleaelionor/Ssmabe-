/**
 * Registre des présences (avatars) que l'utilisateur peut choisir.
 * Source unique et extensible : pour ajouter une personne, dépose son image
 * dans /public/avatars et ajoute une entrée ici. `active: false` la masque
 * sans la supprimer. Aucun logique métier — juste des visuels sélectionnables.
 */
export type AvatarStyle = "illustre" | "premium" | "portrait";

export interface Avatar {
  id: string;
  src: string;
  /** Nom d'affichage court (éditable librement). */
  name: string;
  style: AvatarStyle;
  /** Texte alternatif accessible. */
  alt: string;
  active: boolean;
}

export const AVATARS: Avatar[] = [
  { id: "av-01", src: "/avatars/av-01.webp", name: "Naïla", style: "illustre", alt: "Femme aux longues tresses, boucles d'oreilles terracotta", active: true },
  { id: "av-02", src: "/avatars/av-02.webp", name: "Élie", style: "illustre", alt: "Homme en veste de cuir noire", active: true },
  { id: "av-03", src: "/avatars/av-03.webp", name: "Sara", style: "illustre", alt: "Femme souriante au foulard beige", active: true },
  { id: "av-04", src: "/avatars/av-04.webp", name: "Boni", style: "illustre", alt: "Homme à la casquette et chemise ocre", active: true },
  { id: "av-05", src: "/avatars/av-05.webp", name: "Didier", style: "premium", alt: "Homme élégant en costume, barbe soignée", active: true },
  { id: "av-06", src: "/avatars/av-06.webp", name: "Awa", style: "premium", alt: "Femme aux cheveux naturels, blazer vert olive", active: true },
  { id: "av-07", src: "/avatars/av-07.webp", name: "Kevin", style: "premium", alt: "Homme en col roulé crème et gilet", active: true },
  { id: "av-08", src: "/avatars/av-08.webp", name: "Léa", style: "premium", alt: "Femme en chemisier à motifs terracotta", active: true },
  { id: "av-09", src: "/avatars/av-09.webp", name: "Mira", style: "portrait", alt: "Femme aux tresses, pull crème, lumière douce", active: true },
  { id: "av-10", src: "/avatars/av-10.webp", name: "Théo", style: "portrait", alt: "Homme à lunettes, fond vert olive", active: true },
  { id: "av-11", src: "/avatars/av-11.webp", name: "Zola", style: "portrait", alt: "Femme au foulard, portrait sur fond sombre", active: true },
  { id: "av-12", src: "/avatars/av-12.webp", name: "Manu", style: "portrait", alt: "Homme en chemise à motifs africains", active: true },
];

export const activeAvatars = (): Avatar[] => AVATARS.filter((a) => a.active);
export const getAvatar = (id: string): Avatar | undefined => AVATARS.find((a) => a.id === id);
