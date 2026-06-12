export const SUBSCRIPTION_BILLING_ROUTES = {
  base: "/subscription-billing",
  health: "/subscription-billing/health",
  webhook: "/subscription-billing/stripe/webhook",
  plans: "/subscription-billing/plans",
  subscription: "/subscription-billing/subscription",
} as const;
