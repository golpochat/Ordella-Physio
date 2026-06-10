import { loadEnv } from "../env/loader";
import { authEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createAuthConfig() {
  const env = loadEnv(authEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  } as const;
}

export type AuthConfig = ReturnType<typeof createAuthConfig>;
export const authConfig = createLazyConfig(createAuthConfig);
