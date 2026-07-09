/** Tiny toast event bus — no context, no store, tree-shakeable. */
export interface ToastData {
  id: number;
  title: string;
  description?: string;
  variant: "success" | "error" | "info";
}
type Listener = (t: ToastData) => void;
const listeners = new Set<Listener>();
let seq = 0;

export function subscribeToasts(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Fire a toast from anywhere (client). */
export function toast(input: Omit<ToastData, "id">): void {
  const t = { ...input, id: ++seq };
  listeners.forEach((fn) => fn(t));
}
