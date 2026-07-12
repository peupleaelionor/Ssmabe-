import * as React from "react";

/**
 * Présence choisie — sélection locale (device-only), SSR-safe.
 * Aucun backend : localStorage + store synchrone, réconciliable avec le vrai
 * profil quand authEnabled passera à true.
 */
const KEY = "ssmabe.avatar.v1";

let cache: string | null | undefined;
const listeners = new Set<() => void>();

function read(): string | null {
  if (cache !== undefined) return cache;
  try {
    cache = localStorage.getItem(KEY);
  } catch {
    cache = null;
  }
  return cache ?? null;
}

export const getChosenAvatar = (): string | null => read();

export function chooseAvatar(id: string): void {
  cache = id;
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* stockage indisponible : la sélection vit en mémoire pour la session */
  }
  listeners.forEach((l) => l());
}

export function subscribeAvatar(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Id de la présence choisie (null côté serveur / si aucune). */
export function useChosenAvatar(): string | null {
  return React.useSyncExternalStore(subscribeAvatar, getChosenAvatar, () => null);
}
