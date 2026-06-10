import { loadEnv } from "../env/loader";
import { billingEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createBillingConfig() {
  const env = loadEnv(billingEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
    stripePriceStarter: env.STRIPE_PRICE_STARTER,
    stripePricePro: env.STRIPE_PRICE_PRO,
    stripePriceEnterprise: env.STRIPE_PRICE_ENTERPRISE,
    tenantServiceUrl: env.TENANT_SERVICE_URL,
    frontendUrl: env.FRONTEND_URL,
  } as const;
}

export type BillingConfig = ReturnType<typeof createBillingConfig>;
export const billingConfig = createLazyConfig(createBillingConfig);
