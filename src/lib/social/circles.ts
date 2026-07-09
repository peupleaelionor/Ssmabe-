import * as React from "react";

/**
 * Mes cercles — appartenance locale aux communautés (device-only).
 * Aucun backend : localStorage + store synchrone, SSR-safe.
 * Sera réconcilié avec le vrai compte quand authEnabled passera à true.
 */
const KEY = "ssmabe.circles.v1";
const EMPTY: readonly string[] = [];

let cache: readonly string[] | null = null;
const listeners = new Set<() => void>();

function read(): readonly string[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: readonly string[]): void {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage plein ou bloqué : l'état vit en mémoire pour la session */
  }
  listeners.forEach((l) => l());
}

export const getJoinedCircles = (): readonly string[] => read();

export const isJoined = (id: string): boolean => read().includes(id);

/** Rejoint ou quitte un cercle. Retourne true si on vient de le rejoindre. */
export function toggleCircle(id: string): boolean {
  const current = read();
  const joined = current.includes(id);
  write(joined ? current.filter((x) => x !== id) : [...current, id]);
  return !joined;
}

export function subscribeCircles(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Liste réactive des cercles rejoints (vide côté serveur). */
export function useJoinedCircles(): readonly string[] {
  return React.useSyncExternalStore(subscribeCircles, getJoinedCircles, () => EMPTY);
}
