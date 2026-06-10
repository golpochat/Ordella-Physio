import { loadEnv } from "../env/loader";
import { patientEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createPatientConfig() {
  const env = loadEnv(patientEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
  } as const;
}

export type PatientConfig = ReturnType<typeof createPatientConfig>;
export const patientConfig = createLazyConfig(createPatientConfig);
