/**
 * Resend — envoi d'email transactionnel via l'API REST (aucun SDK).
 * No-op si RESEND_API_KEY absente : rien ne throw, rien ne bloque la réponse.
 * `from` doit utiliser un domaine vérifié sur Resend en production
 * (par défaut onboarding@resend.dev = test, limité à ton email de compte).
 */
const KEY = process.env.RESEND_API_KEY ?? "";
const FROM = process.env.RESEND_FROM ?? "Songi Songi Mabé <onboarding@resend.dev>";

export const isEmailConfigured = (): boolean => Boolean(KEY);

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<{ ok: boolean }> {
  if (!KEY) return { ok: false };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/** Email de confirmation d'inscription bêta — sobre, aux couleurs de marque. */
export async function sendBetaWelcome(to: string, firstName: string): Promise<{ ok: boolean }> {
  const name = firstName.trim() || "toi";
  const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0D0F14;color:#F3EFE6;padding:32px;border-radius:16px;max-width:520px;margin:auto">
  <h1 style="font-size:22px;margin:0 0 8px;color:#F3EFE6">Bienvenue, ${name} 👋</h1>
  <p style="color:#A9A69A;line-height:1.6;margin:0 0 16px">
    Ton inscription à la bêta de <strong style="color:#E0694A">Songi Songi Mabé</strong> est bien enregistrée.
    On te prévient dès l'ouverture de ta communauté.
  </p>
  <p style="color:#A9A69A;line-height:1.6;margin:0 0 24px">
    En attendant, explore les communautés et choisis ta présence.
  </p>
  <a href="https://ssmabe.vercel.app/communautes"
     style="display:inline-block;background:#E0694A;color:#0D0F14;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px">
    Découvrir les communautés
  </a>
  <p style="color:#A9A69A;font-size:12px;margin:24px 0 0">
    Né à Kinshasa. Pensé pour toutes les communautés. · Ton numéro n'est jamais affiché.
  </p>
</div>`;
  return sendEmail({ to, subject: "Bienvenue sur Songi Songi Mabé 🎙️", html });
}
