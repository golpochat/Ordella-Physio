import { loadEnv } from "../env/loader";
import { staffEnvSchema } from "../env/schema";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createStaffConfig() {
  const env = loadEnv(staffEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    tenantServiceUrl: env.TENANT_SERVICE_URL,
    userRoleServiceUrl: env.USER_ROLE_SERVICE_URL,
    appointmentServiceUrl: env.APPOINTMENT_SERVICE_URL,
  } as const;
}

export type StaffConfig = ReturnType<typeof createStaffConfig>;
export const staffConfig = createLazyConfig(createStaffConfig);
