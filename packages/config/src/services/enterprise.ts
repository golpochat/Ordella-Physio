import { loadEnv } from "../env/loader";
import { enterpriseEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createEnterpriseConfig() {
  const env = loadEnv(enterpriseEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    ssoCallbackUrl: env.ENTERPRISE_SSO_CALLBACK_URL,
    samlAcsUrl: env.ENTERPRISE_SAML_ACS_URL,
    frontendCallbackUrl: env.ENTERPRISE_FRONTEND_CALLBACK_URL,
    tenantServiceUrl: env.TENANT_SERVICE_URL,
  } as const;
}

export type EnterpriseConfig = ReturnType<typeof createEnterpriseConfig>;
export const enterpriseConfig = createLazyConfig(createEnterpriseConfig);
