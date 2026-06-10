import { loadEnv } from "../env/loader";
import { notesEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createNotesConfig() {
  const env = loadEnv(notesEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    natsUrl: env.NATS_URL,
    redisUrl: env.REDIS_URL,
  } as const;
}

export type NotesConfig = ReturnType<typeof createNotesConfig>;
export const notesConfig = createLazyConfig(createNotesConfig);
