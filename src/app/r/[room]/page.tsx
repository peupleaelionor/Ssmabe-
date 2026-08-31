import type { Metadata } from "next";
import { slugToTitle, normalizeSlug } from "@/lib/rooms";
import { RoomClient } from "@/components/room/RoomClient";

type Params = { params: Promise<{ room: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { room } = await params;
  const title = slugToTitle(room);
  return {
    title: `${title} — Songi Songi Mabé`,
    description: `Rejoins la conversation « ${title} ». Écoute, puis demande la parole. Ton numéro reste privé.`,
    robots: { index: false, follow: false },
  };
}

export default async function RoomPage({ params }: Params) {
  const { room } = await params;
  const slug = normalizeSlug(room);
  return <RoomClient slug={slug} title={slugToTitle(slug)} />;
}
