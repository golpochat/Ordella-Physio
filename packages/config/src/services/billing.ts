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
  } as const;
}

export type BillingConfig = ReturnType<typeof createBillingConfig>;
export const billingConfig = createLazyConfig(createBillingConfig);
