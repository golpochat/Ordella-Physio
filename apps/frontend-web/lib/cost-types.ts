export type CostPeriod = "DAILY" | "MONTHLY";

export type CostUsageSummary = {
  id: string;
  tenantId: string;
  period: CostPeriod;
  periodStart: string;
  periodEnd: string;
  totalTokensPrompt: number;
  totalTokensCompletion: number;
  totalCost: number;
  breakdownByModel: Record<string, { tokens: number; cost: number; requests: number }>;
  breakdownByFeature: Record<string, { tokens: number; cost: number; requests: number }>;
};

export type CostByModel = {
  modelId: string;
  tokens: number;
  cost: number;
  requests: number;
};

export type CostByFeature = {
  feature: string;
  tokens: number;
  cost: number;
  requests: number;
};

export type CostTrendPoint = {
  periodStart: string;
  totalCost: number;
  totalTokens: number;
};

export type CostBudgetStatus = {
  id: string;
  tenantId: string;
  monthlyTokenBudget: number;
  monthlyCostBudget: number;
  softLimitPercentage: number;
  hardLimitPercentage: number;
  currentTokensUsed: number;
  currentCostUsed: number;
  periodStart: string;
  periodEnd: string;
  tokenUsagePercent: number;
  costUsagePercent: number;
  usagePercent: number;
  softLimitReached: boolean;
  hardLimitReached: boolean;
};

export type CostAlertRecord = {
  id: string;
  tenantId: string;
  type: "BUDGET_SOFT" | "BUDGET_HARD" | "ANOMALY";
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  resolvedAt: string | null;
};

export type OptimizationReport = {
  tenantId: string;
  generatedAt: string;
  currentSpend: number;
  budgetStatus: CostBudgetStatus;
  cheaperModels: Array<{
    modelId: string;
    suggestion: {
      modelId: string;
      estimatedSavingsPercent: number;
      reason: string;
      estimatedMonthlySavings: number;
    } | null;
  }>;
  maxTokens: {
    suggestedMaxTokens: number;
    currentAvgTokens: number;
    estimatedSavingsPercent: number;
  };
  caching: {
    suggestions: Array<{ feature: string; strategy: string; estimatedSavingsPercent: number }>;
    globalRecommendation: string;
  };
  truncation: {
    rules: Array<{ modelId: string; maxInputTokens: number; estimatedSavingsPercent: number }>;
  };
  totalEstimatedMonthlySavings: number;
};
