import type { UsageMetric, UsageRecord as UsageRecordModel } from "@/generated/prisma";

export type { UsageRecordModel as UsageRecordRecord, UsageMetric };

export type UsageRecordResponse = {
  id: string;
  tenantId: string;
  metric: UsageMetric;
  quantity: number;
  periodStart: string;
  periodEnd: string;
  stripeUsageRecordId: string | null;
  createdAt: string;
};

export function toUsageRecordResponse(record: UsageRecordModel): UsageRecordResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    metric: record.metric,
    quantity: record.quantity,
    periodStart: record.periodStart.toISOString(),
    periodEnd: record.periodEnd.toISOString(),
    stripeUsageRecordId: record.stripeUsageRecordId,
    createdAt: record.createdAt.toISOString(),
  };
}
