export const featureFlagsConfig = {
  port: Number(process.env.PORT ?? 3079),
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://localhost:3075",
};
