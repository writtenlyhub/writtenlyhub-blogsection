export type AnalyticsEvent = 
  | "newsletter_popup_opened"
  | "newsletter_subscribed"
  | "newsletter_closed";

export const trackEvent = (eventName: AnalyticsEvent, properties?: Record<string, any>) => {
  // Currently a no-op / console logger.
  // Ready to be replaced with GA4, Plausible, PostHog, etc.
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Tracked event: ${eventName}`, properties || {});
  }

  // Example integration placeholder:
  // if (typeof window !== "undefined" && window.plausible) {
  //   window.plausible(eventName, { props: properties });
  // }
};
