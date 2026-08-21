import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/mvp/PageShell";
import { CommunityBrowser } from "@/components/mvp/CommunityBrowser";
import { getCommunities } from "@/lib/communities";

export const metadata: Metadata = {
  title: "Communautés",
  description: "Des espaces réels par ville et par passion : Kinshasa, Goma, Lubumbashi, diaspora, créateurs, marché local.",
};

export default async function CommunautesPage() {
  const communities = await getCommunities();
  return (
    <PageShell>
      <PageHero
        title="Communautés en action"
        text="Par ville, par passion, par lien. Rejoins la tienne — ou prépare la prochaine."
      />
      <CommunityBrowser communities={communities} />
    </PageShell>
  );
}
