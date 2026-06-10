import { loadEnv } from "../env/loader";
import { appointmentEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createAppointmentConfig() {
  const env = loadEnv(appointmentEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
  } as const;
}

export type AppointmentConfig = ReturnType<typeof createAppointmentConfig>;
export const appointmentConfig = createLazyConfig(createAppointmentConfig);
