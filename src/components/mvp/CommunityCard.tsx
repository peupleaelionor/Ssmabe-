import Link from "next/link";
import type { Community } from "@/config/communities";
import { cn } from "@/lib/utils";

/**
 * Carte communauté — cliquable, CTA vers la bêta préremplie.
 * `onOpen` (optionnel) rend toute la carte tappable pour ouvrir l'aperçu ;
 * `joined` affiche l'état Membre. Sans ces props, comportement inchangé.
 */
export function CommunityCard({
  community,
  className,
  onOpen,
  joined = false,
}: {
  community: Community;
  className?: string;
  onOpen?: () => void;
  joined?: boolean;
}) {
  const href = `/beta?community=${community.id}&source=community-card`;
  return (
    <div className={cn("relative flex flex-col card-lift rounded-2xl border bg-white/[0.035] p-5 transition hover:border-terra/50", joined ? "border-olive/45" : "border-olive/20", className)}>
      {onOpen && (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Découvrir ${community.name}`}
          className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/60"
        />
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-ivoire">{community.name}</h3>
          <p className="text-[11px] uppercase tracking-wide text-gris-doux">{community.category} · {community.country}</p>
        </div>
        <span className={cn(
          "rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
          joined ? "bg-olive/30 text-ivoire" : community.status === "active" ? "bg-olive/25 text-ivoire" : "bg-terra/15 text-terra"
        )}>
          {joined ? "Membre ✓" : community.status === "active" ? "Actif" : "Bêta"}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gris-doux">{community.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gris-doux">👥 {community.memberCount} membres</span>
        <Link
          href={href}
          className="relative z-[2] rounded-full border border-terra/40 px-4 py-1.5 text-xs font-semibold text-terra transition hover:bg-terra hover:text-noir-abysse"
        >
          {community.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
