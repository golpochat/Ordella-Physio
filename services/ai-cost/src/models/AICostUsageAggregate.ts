export type CostPeriod = "DAILY" | "MONTHLY";

export type CostUsageAggregateRecord = {
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

export type CostTrendPoint = {
  periodStart: string;
  totalCost: number;
  totalTokens: number;
};

export function toCostUsageAggregateRecord(row: {
  id: string;
  tenantId: string;
  period: string;
  periodStart: Date;
  periodEnd: Date;
  totalTokensPrompt: number;
  totalTokensCompletion: number;
  totalCost: number;
  breakdownByModel: unknown;
  breakdownByFeature: unknown;
}): CostUsageAggregateRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    period: row.period as CostPeriod,
    periodStart: row.periodStart.toISOString(),
    periodEnd: row.periodEnd.toISOString(),
    totalTokensPrompt: row.totalTokensPrompt,
    totalTokensCompletion: row.totalTokensCompletion,
    totalCost: row.totalCost,
    breakdownByModel: (row.breakdownByModel as CostUsageAggregateRecord["breakdownByModel"]) ?? {},
    breakdownByFeature: (row.breakdownByFeature as CostUsageAggregateRecord["breakdownByFeature"]) ?? {},
  };
}
