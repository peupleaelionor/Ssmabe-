"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { activeAvatars } from "@/config/avatars";
import { chooseAvatar, useChosenAvatar } from "@/lib/social/avatar";
import { haptic } from "@/lib/haptics";
import { toast } from "@/components/ds/toast-bus";
import { cn } from "@/lib/utils";

/**
 * Sélecteur de présence — grille de personas cliquables.
 * Choix persistant localement (aucun compte requis en bêta).
 * Isolé : la liste vient de config/avatars (extensible « une à une »).
 */
export function AvatarPicker() {
  const avatars = activeAvatars();
  const chosen = useChosenAvatar();

  const onPick = (id: string, name: string) => {
    chooseAvatar(id);
    haptic("success");
    toast({ variant: "success", title: `Présence choisie : ${name}`, description: "Elle t'accompagnera dès l'ouverture." });
  };

  return (
    <ul
      role="listbox"
      aria-label="Choisir une présence"
      className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6"
    >
      {avatars.map((a, i) => {
        const active = chosen === a.id;
        return (
          <li key={a.id} role="option" aria-selected={active}>
            <motion.button
              type="button"
              onClick={() => onPick(a.id, a.name)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
              whileTap={{ scale: 0.94 }}
              aria-label={`Choisir ${a.name}`}
              className={cn(
                "group relative block w-full overflow-hidden rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra/70",
                active ? "border-terra shadow-[0_0_0_4px_rgba(224,105,74,0.18)]" : "border-olive/25 hover:border-terra/50"
              )}
            >
              <span className="block aspect-square">
                <Image
                  src={a.src}
                  alt={a.alt}
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.05]"
                />
              </span>
              {active && (
                <span
                  className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-terra text-[11px] font-bold text-noir-abysse shadow"
                  aria-hidden
                >
                  ✓
                </span>
              )}
            </motion.button>
            <p className="mt-1.5 text-center text-[11px] text-gris-doux">{a.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
