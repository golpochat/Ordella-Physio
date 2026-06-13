export const deployConfig = {
  port: Number(process.env.PORT ?? 3078),
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://localhost:3075",
  aiTrainingServiceUrl: process.env.AI_TRAINING_SERVICE_URL ?? "http://localhost:3076",
  artifactsPath: process.env.DEPLOY_ARTIFACTS_PATH ?? "/tmp/ordella-ai-artifacts",
  defaultRegions: ["eu-west-1", "us-east-1", "ap-southeast-1"] as const,
};
