/** POST /api/contact — message de contact (Supabase si dispo, sinon local). */
import { type NextRequest, NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isSupabaseConfigured, supabaseServerInsert } from "@/lib/supabase";
import { captureException } from "@/lib/observability/sentry";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const rl = rateLimit(`contact:${clientKey(req.headers)}`, { limit: 3, windowMs: 60_000 });
  if (!rl.ok) return NextResponse.json({ ok: false, error: "Trop de messages. Réessaie plus tard." }, { status: 429 });

  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot
  if (!body.message || body.message.trim().length < 5)
    return NextResponse.json({ ok: false, error: "Message trop court." }, { status: 422 });
  if (body.message.length > 1000)
    return NextResponse.json({ ok: false, error: "Message trop long." }, { status: 422 });

  if (!isSupabaseConfigured()) return NextResponse.json({ ok: true, local: true });
  try {
    await supabaseServerInsert("contact_messages", {
      name: body.name?.trim() || null,
      email: body.email?.trim() || null,
      message: body.message.trim(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    captureException(err, { route: "api/contact" });
    return NextResponse.json({ ok: true, local: true });
  }
}
