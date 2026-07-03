import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { CommunityBrowser } from "@/components/mvp/CommunityBrowser";

export const metadata: Metadata = {
  title: "Communautés",
  description: "Des espaces réels par ville et par passion : Kinshasa, Goma, Lubumbashi, diaspora, créateurs, marché local.",
};

export default function CommunautesPage() {
  return (
    <PageShell>
      <PageHero
        title="Communautés en action"
        text="Par ville, par passion, par lien. Rejoins la tienne — ou prépare la prochaine."
      />
      <CommunityBrowser />
    </PageShell>
  );
}
