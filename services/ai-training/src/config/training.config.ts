export const trainingConfig = {
  port: Number(process.env.PORT ?? 3076),
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://localhost:3075",
  redisUrl: process.env.QUEUE_REDIS_URL ?? process.env.REDIS_URL ?? "redis://localhost:6379",
  defaultProvider: (process.env.DEFAULT_TRAINING_PROVIDER ?? "LOCAL") as "OPENAI" | "AZURE" | "LOCAL",
  pollIntervalMs: Number(process.env.TRAINING_POLL_INTERVAL_MS ?? 3000),
  queueName: "ai-training.jobs",
  maxPollAttempts: 120,
} as const;
