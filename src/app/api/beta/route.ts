/**
 * POST /api/beta — Inscription bêta Songi Songi Mabé
 * --------------------------------------------------------------
 * - Valide les champs (mêmes règles que lib/mabe/beta.ts)
 * - Si Supabase configuré → insert dans `beta_signups`
 * - Si pas configuré → retourne success avec flag `local: true`
 * - Ne logue JAMAIS le champ `contact` (email/tel)
 */
import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseServerInsert } from "@/lib/supabase/client";

interface BetaPayload {
  pseudo: string;
  country: string;
  city?: string;
  language: string;
  intention: string;
  contact?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_INTENTIONS = ["chill", "serieux", "diaspora", "decouverte"];

function validate(body: BetaPayload): string | null {
  if (!body.pseudo || body.pseudo.trim().length < 2) {
    return "Pseudo trop court (min 2 caractères).";
  }
  if (body.pseudo.trim().length > 50) {
    return "Pseudo trop long (max 50 caractères).";
  }
  if (!body.country || body.country.trim().length === 0) {
    return "Pays manquant.";
  }
  if (!body.language || body.language.trim().length === 0) {
    return "Langue manquante.";
  }
  if (!body.intention || !VALID_INTENTIONS.includes(body.intention)) {
    return "Intention invalide.";
  }
  if (body.contact && body.contact.trim().length > 0) {
    const c = body.contact.trim();
    const digits = c.replace(/\D/g, "");
    if (!EMAIL_RE.test(c) && digits.length < 8) {
      return "Contact invalide (email ou numéro WhatsApp requis).";
    }
  }
  return null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: BetaPayload;

  try {
    body = (await req.json()) as BetaPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Corps de requête invalide." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 422 });
  }

  // Données à persister (ne jamais logguer `contact`)
  const record: Record<string, unknown> = {
    pseudo: body.pseudo.trim(),
    country: body.country.trim(),
    city: body.city?.trim() ?? null,
    language: body.language.trim(),
    intention: body.intention.trim(),
    // contact inséré en base mais jamais logué
    contact: body.contact?.trim() ?? null,
  };

  if (!isSupabaseConfigured()) {
    // Supabase non configuré → succès local (client stocke en localStorage)
    const localId = `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return NextResponse.json({ ok: true, id: localId, local: true });
  }

  try {
    const result = await supabaseServerInsert("beta_signups", record);
    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur.";
    // Ne pas exposer les détails d'erreur Supabase à l'extérieur
    console.error("[api/beta] insert error:", message.slice(0, 200));
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l'inscription. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
