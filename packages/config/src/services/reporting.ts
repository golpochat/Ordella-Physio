import { loadEnv } from "../env/loader";
import { reportingEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createReportingConfig() {
  const env = loadEnv(reportingEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    cacheRedisUrl: env.CACHE_REDIS_URL ?? env.REDIS_URL,
  } as const;
}

export type ReportingConfig = ReturnType<typeof createReportingConfig>;
export const reportingConfig = createLazyConfig(createReportingConfig);
