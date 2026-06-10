import { loadEnv } from "../env/loader";
import { tenantEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createTenantConfig() {
  const env = loadEnv(tenantEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    jwtSecret: resolveJwtSecret(env),
  } as const;
}

export type TenantConfig = ReturnType<typeof createTenantConfig>;
export const tenantConfig = createLazyConfig(createTenantConfig);
