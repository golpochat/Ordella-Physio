import { loadEnv } from "../env/loader";
import { paymentEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createPaymentConfig() {
  const env = loadEnv(paymentEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
    billingServiceUrl: env.BILLING_SERVICE_URL,
  } as const;
}

export type PaymentConfig = ReturnType<typeof createPaymentConfig>;
export const paymentConfig = createLazyConfig(createPaymentConfig);
