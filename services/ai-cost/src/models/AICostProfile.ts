export type ModelPricing = {
  promptPer1kTokens: number;
  completionPer1kTokens: number;
  minimumCharge: number;
  currency: string;
};

export type CostProfileRecord = {
  id: string;
  modelId: string;
  provider: string;
  pricing: ModelPricing;
  effectiveFrom: string;
  effectiveTo: string | null;
};

export function toCostProfileRecord(row: {
  id: string;
  modelId: string;
  provider: string;
  pricing: unknown;
  effectiveFrom: Date;
  effectiveTo: Date | null;
}): CostProfileRecord {
  const pricing = (row.pricing as ModelPricing) ?? {
    promptPer1kTokens: 0.002,
    completionPer1kTokens: 0.002,
    minimumCharge: 0,
    currency: "USD",
  };
  return {
    id: row.id,
    modelId: row.modelId,
    provider: row.provider,
    pricing,
    effectiveFrom: row.effectiveFrom.toISOString(),
    effectiveTo: row.effectiveTo?.toISOString() ?? null,
  };
}
