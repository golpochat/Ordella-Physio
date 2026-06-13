export const monitoringConfig = {
  port: Number(process.env.PORT ?? 3077),
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://localhost:3075",
  aiTrainingServiceUrl: process.env.AI_TRAINING_SERVICE_URL ?? "http://localhost:3076",
} as const;
