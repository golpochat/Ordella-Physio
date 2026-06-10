import { loadEnv } from "../env/loader";
import { aiNotesEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createAiNotesConfig() {
  const env = loadEnv(aiNotesEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    aiProvider: env.AI_PROVIDER,
    openaiApiKey: env.OPENAI_API_KEY,
    azureOpenaiKey: env.AZURE_OPENAI_KEY,
    azureOpenaiEndpoint: env.AZURE_OPENAI_ENDPOINT,
    azureOpenaiDeployment: env.AZURE_OPENAI_DEPLOYMENT,
    modelName: env.MODEL_NAME,
    maxTokens: env.MAX_TOKENS,
    temperature: env.TEMPERATURE,
    patientServiceUrl: env.PATIENT_SERVICE_URL,
    appointmentServiceUrl: env.APPOINTMENT_SERVICE_URL,
    notesServiceUrl: env.NOTES_SERVICE_URL,
  } as const;
}

export type AiNotesConfig = ReturnType<typeof createAiNotesConfig>;
export const aiNotesConfig = createLazyConfig(createAiNotesConfig);
