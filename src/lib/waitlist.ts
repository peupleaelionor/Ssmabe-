/**
 * Client waitlist — POST /api/waitlist, fallback localStorage.
 * Jamais de log du téléphone/email.
 */
import type { WaitlistInput } from "./validators";
import { validateWaitlist } from "./validators";

const STORAGE_KEY = "ssmabe.waitlist";

export interface WaitlistResult {
  ok: boolean;
  error?: string;
  local?: boolean;
}

function persistLocal(entry: WaitlistInput): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push({ ...entry, createdAt: new Date().toISOString() });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // stockage indisponible — ne pas casser l'UX
  }
}

export function getLocalWaitlistCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as unknown[]).length : 0;
  } catch {
    return 0;
  }
}

export async function submitWaitlist(input: WaitlistInput): Promise<WaitlistResult> {
  const error = validateWaitlist(input);
  if (error) return { ok: false, error: error === "spam" ? undefined : error };

  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await res.json()) as WaitlistResult;
    if (data.ok && data.local) persistLocal(input);
    return data;
  } catch {
    persistLocal(input);
    return { ok: true, local: true };
  }
}
