/** Événements — données de seed / fallback (source unique, comme communities). */
export interface AppEvent {
  id: string;
  title: string;
  city: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  type: string;
}

export const EVENTS: AppEvent[] = [
  { id: "e1", title: "Ouverture bêta Kinshasa", city: "Kinshasa", date: "2026-08-01", type: "beta" },
  { id: "e2", title: "Salon créateurs diaspora", city: "Paris", date: "2026-08-15", type: "createurs" },
  { id: "e3", title: "Rencontre entrepreneurs", city: "Lubumbashi", date: "2026-09-01", type: "business" },
];
