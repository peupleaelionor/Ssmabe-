/**
 * POST /api/waitlist — inscription bêta complète.
 * Validation + honeypot + rate limit. Supabase (waitlist_entries) si
 * configuré, sinon { ok, local: true } (le client persiste en localStorage).
 * Ne logue JAMAIS email/téléphone.
 */
import { type NextRequest, NextResponse } from "next/server";
import { validateWaitlist, type WaitlistInput } from "@/lib/validators";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isSupabaseConfigured, supabaseServerInsert } from "@/lib/supabase";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const rl = rateLimit(`waitlist:${clientKey(req.headers)}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Trop de tentatives. Réessaie dans une minute." },
      { status: 429 }
    );
  }

  let body: WaitlistInput;
  try {
    body = (await req.json()) as WaitlistInput;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const error = validateWaitlist(body);
  if (error === "spam") return NextResponse.json({ ok: true }); // honeypot : succès silencieux
  if (error) return NextResponse.json({ ok: false, error }, { status: 422 });

  const record = {
    first_name: body.firstName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone?.trim() || null,
    country: body.country,
    city: body.city?.trim() || null,
    language: body.language,
    profile_type: body.profileType,
    desired_community: body.community || null,
    goal: body.goal || null,
    message: body.message?.trim() || null,
    source: body.source || "direct",
    consent: true,
    status: "pending",
  };

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, local: true });
  }

  try {
    await supabaseServerInsert("waitlist_entries", record);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message.slice(0, 120) : "insert failed";
    console.error("[api/waitlist]", msg);
    return NextResponse.json({ ok: true, local: true }); // dégradation gracieuse
  }
}
