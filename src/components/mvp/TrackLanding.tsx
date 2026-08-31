"use client";

import * as React from "react";
import { analytics } from "@/lib/analytics";

/** Émet landing_view au montage (t0 pour TIME TO FIRST VOICE). No-op sans provider. */
export function TrackLanding() {
  React.useEffect(() => {
    analytics.landingView();
  }, []);
  return null;
}
