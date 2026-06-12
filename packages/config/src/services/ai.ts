import { loadEnv } from "../env/loader";
import { aiServiceEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createAiServiceConfig() {
  const env = loadEnv(aiServiceEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    encryptionKey: env.AI_ENCRYPTION_KEY,
    defaultProvider: env.DEFAULT_AI_PROVIDER,
    defaultModel: env.DEFAULT_AI_MODEL,
  } as const;
}

export type AiServiceConfig = ReturnType<typeof createAiServiceConfig>;
export const aiServiceConfig = createLazyConfig(createAiServiceConfig);
