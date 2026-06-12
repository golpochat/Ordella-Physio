import { loadEnv } from "../env/loader";
import { subscriptionBillingEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createSubscriptionBillingConfig() {
  const env = loadEnv(subscriptionBillingEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
    frontendUrl: env.FRONTEND_URL,
    tenantServiceUrl: env.TENANT_SERVICE_URL,
    defaultTrialDays: env.DEFAULT_TRIAL_DAYS,
  } as const;
}

export type SubscriptionBillingConfig = ReturnType<typeof createSubscriptionBillingConfig>;
export const subscriptionBillingConfig = createLazyConfig(createSubscriptionBillingConfig);
