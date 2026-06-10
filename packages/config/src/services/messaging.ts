import { loadEnv } from "../env/loader";
import { messagingEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createMessagingConfig() {
  const env = loadEnv(messagingEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
  } as const;
}

export type MessagingConfig = ReturnType<typeof createMessagingConfig>;
export const messagingConfig = createLazyConfig(createMessagingConfig);
