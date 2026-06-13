export const aiCostConfig = {
  port: Number(process.env.PORT ?? 3081),
  defaultPromptPer1kTokens: Number(process.env.AI_COST_PROMPT_PER_1K ?? 0.002),
  defaultCompletionPer1kTokens: Number(process.env.AI_COST_COMPLETION_PER_1K ?? 0.006),
  aggregationIntervalMs: Number(process.env.AI_COST_AGGREGATION_INTERVAL_MS ?? 3600_000),
};
