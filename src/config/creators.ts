/** Créateurs mockés (vitrine /createurs). */
export interface Creator {
  id: string;
  name: string;
  role: string;
  city: string;
  followers: string;
  initial: string;
}
export const CREATORS: Creator[] = [
  { id: "c1", name: "Maestro K.", role: "Musique & rumba", city: "Kinshasa", followers: "24K", initial: "M" },
  { id: "c2", name: "Grâce M.", role: "Entrepreneuriat féminin", city: "Lubumbashi", followers: "11K", initial: "G" },
  { id: "c3", name: "Papy D.", role: "Humour & chroniques", city: "Paris", followers: "38K", initial: "P" },
  { id: "c4", name: "Sarah B.", role: "Cuisine congolaise", city: "Bruxelles", followers: "17K", initial: "S" },
  { id: "c5", name: "Ir. Landry", role: "Tech & formation", city: "Goma", followers: "9K", initial: "L" },
  { id: "c6", name: "Maman Nzita", role: "Famille & transmission", city: "Montréal", followers: "14K", initial: "N" },
];
