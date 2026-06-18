import { loadEnv } from "../env/loader";
import { pharmacyEnvSchema } from "../env/pharmacy";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createPharmacyConfig() {
  const env = loadEnv(pharmacyEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    patientServiceUrl: env.PATIENT_SERVICE_URL,
    therapistServiceUrl: env.THERAPIST_SERVICE_URL,
    staffServiceUrl: env.STAFF_SERVICE_URL,
    appointmentServiceUrl: env.APPOINTMENT_SERVICE_URL,
    auditServiceUrl: env.AUDIT_SERVICE_URL,
  } as const;
}

export type PharmacyConfig = ReturnType<typeof createPharmacyConfig>;
export const pharmacyConfig = createLazyConfig(createPharmacyConfig);
