import Link from "next/link";
import type { Community } from "@/config/communities";
import { cn } from "@/lib/utils";

/** Carte communauté — cliquable, CTA vers la bêta préremplie. */
export function CommunityCard({ community, className }: { community: Community; className?: string }) {
  const href = `/beta?community=${community.id}&source=community-card`;
  return (
    <div className={cn("flex flex-col rounded-2xl border border-olive/20 bg-white/[0.035] p-5 transition hover:border-terra/50", className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-ivoire">{community.name}</h3>
          <p className="text-[11px] uppercase tracking-wide text-gris-doux">{community.category} · {community.country}</p>
        </div>
        <span className={cn(
          "rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
          community.status === "active" ? "bg-olive/25 text-ivoire" : "bg-terra/15 text-terra"
        )}>
          {community.status === "active" ? "Actif" : "Bêta"}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gris-doux">{community.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gris-doux">👥 {community.memberCount} membres</span>
        <Link
          href={href}
          className="rounded-full border border-terra/40 px-4 py-1.5 text-xs font-semibold text-terra transition hover:bg-terra hover:text-noir-abysse"
        >
          {community.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
