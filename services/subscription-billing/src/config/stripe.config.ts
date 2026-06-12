import { subscriptionBillingConfig } from "@ordella/config";

export function resolveStripeConfig() {
  return {
    secretKey: subscriptionBillingConfig.stripeSecretKey ?? process.env.STRIPE_SECRET_KEY ?? "",
    webhookSecret:
      subscriptionBillingConfig.stripeWebhookSecret ?? process.env.STRIPE_WEBHOOK_SECRET ?? "",
    frontendUrl: subscriptionBillingConfig.frontendUrl ?? process.env.FRONTEND_URL ?? "http://localhost:3010",
    defaultTrialDays: subscriptionBillingConfig.defaultTrialDays ?? 14,
    isConfigured(): boolean {
      return Boolean(this.secretKey);
    },
  };
}
