import { loadEnv } from "../env/loader";
import { communicationEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createCommunicationConfig() {
  const env = loadEnv(communicationEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
    emailProviderApiKey: env.EMAIL_PROVIDER_API_KEY,
    smsProviderApiKey: env.SMS_PROVIDER_API_KEY,
    emailFrom: env.EMAIL_FROM,
    smsFrom: env.SMS_FROM,
    queueRedisUrl: env.QUEUE_REDIS_URL ?? env.REDIS_URL,
  } as const;
}

export type CommunicationConfig = ReturnType<typeof createCommunicationConfig>;
export const communicationConfig = createLazyConfig(createCommunicationConfig);
