import { loadEnv } from "../env/loader";
import { organizationEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createOrganizationConfig() {
  const env = loadEnv(organizationEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
  } as const;
}

export type OrganizationConfig = ReturnType<typeof createOrganizationConfig>;
export const organizationConfig = createLazyConfig(createOrganizationConfig);
