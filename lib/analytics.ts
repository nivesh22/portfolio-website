"use client";

export type AnalyticsParams = Record<string, any>;

function canTrack() {
  if (typeof window === "undefined") return false;
  if (typeof window.gtag !== "function") return false;
  return true;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!canTrack()) return;
  window.gtag!("event", eventName, {
    ...params,
  });
}
