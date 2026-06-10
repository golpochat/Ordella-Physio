import { loadEnv } from "../env/loader";
import { notificationEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createNotificationConfig() {
  const env = loadEnv(notificationEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
  } as const;
}

export type NotificationConfig = ReturnType<typeof createNotificationConfig>;
export const notificationConfig = createLazyConfig(createNotificationConfig);
