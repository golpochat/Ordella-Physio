export type UsageEventRecord = {
  id: string;
  tenantId: string;
  gatewayKeyId: string | null;
  modelId: string | null;
  tokensPrompt: number;
  tokensCompletion: number;
  cost: number;
  latencyMs: number;
  success: boolean;
  timestamp: string;
  metadata: Record<string, unknown>;
};

export type UsageSummary = {
  tenantId: string;
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  avgLatencyMs: number;
  topModels: Array<{ modelId: string; tokens: number; cost: number; requests: number }>;
};

export function toUsageEventRecord(row: {
  id: string;
  tenantId: string;
  gatewayKeyId: string | null;
  modelId: string | null;
  tokensPrompt: number;
  tokensCompletion: number;
  cost: number;
  latencyMs: number;
  success: boolean;
  timestamp: Date;
  metadata: unknown;
}): UsageEventRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    gatewayKeyId: row.gatewayKeyId,
    modelId: row.modelId,
    tokensPrompt: row.tokensPrompt,
    tokensCompletion: row.tokensCompletion,
    cost: row.cost,
    latencyMs: row.latencyMs,
    success: row.success,
    timestamp: row.timestamp.toISOString(),
    metadata: (row.metadata as Record<string, unknown>) ?? {},
  };
}
