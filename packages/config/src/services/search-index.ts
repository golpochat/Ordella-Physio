import { loadEnv } from "../env/loader";
import { searchIndexEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createSearchIndexConfig() {
  const env = loadEnv(searchIndexEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    defaultSearchProvider: env.DEFAULT_SEARCH_PROVIDER,
  } as const;
}

export type SearchIndexConfig = ReturnType<typeof createSearchIndexConfig>;
export const searchIndexConfig = createLazyConfig(createSearchIndexConfig);
