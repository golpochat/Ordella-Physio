export const aiAgentsConfig = {
  port: Number(process.env.PORT ?? 3084),
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://localhost:3075",
  observabilityServiceUrl: process.env.AI_OBSERVABILITY_SERVICE_URL ?? "http://localhost:3083",
};
