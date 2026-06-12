import { loadEnv } from "../env/loader";
import { userRoleEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createUserRoleConfig() {
  const env = loadEnv(userRoleEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
  } as const;
}

export type UserRoleConfig = ReturnType<typeof createUserRoleConfig>;
export const userRoleConfig = createLazyConfig(createUserRoleConfig);
