import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { ContactOptions } from "@/components/mvp/ContactOptions";
import { ContactForm } from "@/components/mvp/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parler à l'équipe Songi Songi Mabé : email aujourd'hui, appel et WhatsApp bientôt.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero title="Parler à l'équipe" text="Une question, un partenariat, une communauté à lancer ? On répond." />
      <div className="mx-auto max-w-xl space-y-10 px-5 pb-16">
        <ContactOptions />
        <ContactForm />
      </div>
    </PageShell>
  );
}
