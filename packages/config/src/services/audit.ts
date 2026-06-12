import { loadEnv } from "../env/loader";
import { auditEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createAuditConfig() {
  const env = loadEnv(auditEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
  } as const;
}

export type AuditConfig = ReturnType<typeof createAuditConfig>;
export const auditConfig = createLazyConfig(createAuditConfig);
