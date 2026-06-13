export const aiGatewayConfig = {
  port: Number(process.env.PORT ?? 3080),
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://localhost:3075",
  aiCostServiceUrl: process.env.AI_COST_SERVICE_URL ?? "http://localhost:3081",
  aiSecurityServiceUrl: process.env.AI_SECURITY_SERVICE_URL ?? "http://localhost:3082",
  aiObservabilityServiceUrl: process.env.AI_OBSERVABILITY_SERVICE_URL ?? "http://localhost:3083",
  defaultCostPer1kTokens: Number(process.env.AI_COST_PER_1K_TOKENS ?? 0.002),
};
