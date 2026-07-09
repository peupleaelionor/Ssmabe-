"use client";

import * as React from "react";
import Link from "next/link";
import type { Community } from "@/config/communities";
import { BottomSheet } from "@/components/ds/BottomSheet";
import { toast } from "@/components/ds/toast-bus";
import { haptic } from "@/lib/haptics";
import { toggleCircle, useJoinedCircles } from "@/lib/social/circles";
import { TelechatIcon } from "@/components/brand/TelechatAssets";
import { cn } from "@/lib/utils";

export interface CommunityPreviewSheetProps {
  community: Community | null;
  onClose: () => void;
}

/**
 * Aperçu communauté — sheet premium ouvert au tap sur une carte.
 * Rejoindre = appartenance locale (Mes cercles) + haptique + toast.
 */
export function CommunityPreviewSheet({ community, onClose }: CommunityPreviewSheetProps) {
  const joined = useJoinedCircles();
  // Garde la dernière communauté pour l'animation de sortie du sheet.
  const last = React.useRef<Community | null>(null);
  if (community) last.current = community;
  const view = community ?? last.current;

  if (!view) return null;
  const isMember = joined.includes(view.id);

  const onToggle = () => {
    const nowJoined = toggleCircle(view.id);
    haptic(nowJoined ? "success" : "tap");
    toast(
      nowJoined
        ? { title: `Tu fais partie de ${view.name}`, description: "On te prévient dès l'ouverture de ce cercle.", variant: "success" }
        : { title: `Tu as quitté ${view.name}`, description: "Tu peux revenir quand tu veux.", variant: "info" }
    );
  };

  return (
    <BottomSheet open={community !== null} onClose={onClose} title={view.name}>
      <div className="mx-auto max-w-md pb-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-olive/25 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-olive">
            {view.category} · {view.country}
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
              isMember ? "bg-olive/25 text-ivoire" : "bg-terra/15 text-terra"
            )}
          >
            {isMember ? "Membre" : view.status === "active" ? "Actif" : "Bêta"}
          </span>
        </div>

        <p className="mt-4 text-center text-sm leading-relaxed text-gris-doux">{view.description}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {view.tags.map((t) => (
            <span key={t} className="rounded-full border border-olive/20 px-2.5 py-1 text-[10px] text-gris-doux">
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gris-doux">
          <span className="text-terra" aria-hidden>
            <TelechatIcon name="wave" />
          </span>
          {view.memberCount} membres attendent la voix de ce cercle
        </div>

        <div className="mt-6 grid gap-2.5">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "w-full rounded-full px-6 py-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/60",
              isMember
                ? "border border-olive/40 text-ivoire hover:border-terra/60 hover:text-terra"
                : "bg-terra text-noir-abysse hover:bg-terra-dark"
            )}
          >
            {isMember ? "Quitter ce cercle" : view.ctaLabel}
          </button>
          <Link
            href={`/beta?community=${view.id}&source=circle-sheet`}
            className="w-full rounded-full border border-olive/25 px-6 py-3.5 text-center text-sm font-semibold text-gris-doux transition hover:border-terra/50 hover:text-terra"
          >
            Recevoir l'accès bêta en premier
          </Link>
        </div>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-gris-doux/70">
          Ton choix reste sur cet appareil pendant la bêta — aucun numéro, aucun compte requis.
        </p>
      </div>
    </BottomSheet>
  );
}
