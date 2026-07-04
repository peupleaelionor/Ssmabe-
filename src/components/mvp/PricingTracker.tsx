"use client";
import * as React from "react";
import { analytics } from "@/lib/analytics";
export function PricingTracker() {
  React.useEffect(() => { analytics.pricingViewed(); }, []);
  return null;
}

export function LiteTracker() {
  React.useEffect(() => { analytics.liteOpened(); }, []);
  return null;
}
