export type CtaLocation =
  | "hero"
  | "navbar"
  | "navbar_mobile"
  | "home_cta"
  | "pricing"
  | "pricing_card"
  | "contact"
  | "contact_page"
  | "about"
  | "faq"
  | "product"
  | "solutions"
  | "cta_section"
  | "footer";

export function trackEvent(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", event, params);
}

export type CtaClickOptions = {
  experimentId?: string;
  experimentVariant?: string;
};

export function trackCtaClick(
  location: CtaLocation,
  label: string,
  options?: CtaClickOptions,
) {
  trackEvent("cta_click", {
    location,
    label,
    ...(options?.experimentId ? { experiment_id: options.experimentId } : {}),
    ...(options?.experimentVariant ? { variant: options.experimentVariant } : {}),
  });
}

export type FunnelStep = "homepage_to_pricing" | "pricing_to_contact" | "contact_submit";

export function trackFunnelStep(step: FunnelStep) {
  trackEvent("funnel_step", { step });
}

export function trackContactFormSubmit(form = "marketing_contact") {
  trackEvent("contact_form_submit", { form });
}

export function trackPageView(pagePath: string) {
  trackEvent("page_view", { page_path: pagePath });
}

export function trackScrollDepth(percent: 25 | 50 | 75 | 90) {
  trackEvent(`scroll_${percent}`);
}

export function trackMarketingError(
  message: string,
  context?: Record<string, string | number>,
) {
  trackEvent("marketing_error", {
    message,
    ...context,
  });
}
