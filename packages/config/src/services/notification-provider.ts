import { loadEnv } from "../env/loader";
import { notificationProviderEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createNotificationProviderConfig() {
  const env = loadEnv(notificationProviderEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
  } as const;
}

export type NotificationProviderConfig = ReturnType<typeof createNotificationProviderConfig>;
export const notificationProviderConfig = createLazyConfig(createNotificationProviderConfig);
