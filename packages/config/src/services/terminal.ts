import { loadEnv } from "../env/loader";
import { terminalEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createTerminalConfig() {
  const env = loadEnv(terminalEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    tenantServiceUrl: env.TENANT_SERVICE_URL,
  } as const;
}

export type TerminalConfig = ReturnType<typeof createTerminalConfig>;
export const terminalConfig = createLazyConfig(createTerminalConfig);
