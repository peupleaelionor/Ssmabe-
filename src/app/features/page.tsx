import { redirect } from "next/navigation";

/** Alias SEO/anglophone → section fonctionnalités de la home. */
export default function FeaturesRedirect() {
  redirect("/#features");
}
