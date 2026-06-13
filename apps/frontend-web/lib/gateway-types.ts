export type GatewayScope = "inference" | "training" | "datasets" | "embeddings";

export type GatewayKeyRecord = {
  id: string;
  tenantId: string;
  name: string;
  keyPrefix: string;
  scopes: GatewayScope[];
  rateLimitProfileId: string | null;
  budgetProfileId: string | null;
  isActive: boolean;
  isFlagged: boolean;
  isThrottled: boolean;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
};

export type GatewayKeyCreateResult = {
  key: GatewayKeyRecord;
  apiKey: string;
};

export type RateLimitRecord = {
  id: string;
  tenantId: string | null;
  name: string;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  tokensPerDay: number;
  burstLimit: number;
};

export type BudgetRecord = {
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
};

export type GatewayUsageSummary = {
  tenantId: string;
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  avgLatencyMs: number;
  topModels: Array<{ modelId: string; tokens: number; cost: number; requests: number }>;
};

export type GatewayUsageByKey = {
  keyId: string;
  tokens: number;
  cost: number;
  requests: number;
};

export type RateLimitUsageSnapshot = {
  requestsMinute: number;
  requestsHour: number;
  requestsDay: number;
  tokensMinute: number;
  tokensDay: number;
};
