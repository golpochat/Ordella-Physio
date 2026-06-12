import { loadEnv } from "../env/loader";
import { fileStorageEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createFileStorageConfig() {
  const env = loadEnv(fileStorageEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
  } as const;
}

export type FileStorageConfig = ReturnType<typeof createFileStorageConfig>;
export const fileStorageConfig = createLazyConfig(createFileStorageConfig);
