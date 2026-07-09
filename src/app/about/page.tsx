import { redirect } from "next/navigation";

/** Alias SEO/anglophone → page « À propos » canonique. */
export default function AboutRedirect() {
  redirect("/a-propos");
}
