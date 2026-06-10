import { loadEnv } from "../env/loader";
import { eventBusEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createEventBusConfig() {
  const env = loadEnv(eventBusEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    jetStreamReplicas: env.JETSTREAM_REPLICAS,
    jetStreamMaxAgeHours: env.JETSTREAM_MAX_AGE_HOURS,
    jetStreamMaxBytes: env.JETSTREAM_MAX_BYTES,
  } as const;
}

export type EventBusConfig = ReturnType<typeof createEventBusConfig>;
export const eventBusConfig = createLazyConfig(createEventBusConfig);
