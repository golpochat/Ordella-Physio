import type { AIMetricPoint } from "@/generated/prisma";

export type MetricType = "latency" | "error_rate" | "throughput" | "token_usage";

export type MetricPointRecord = {
  id: string;
  tenantId: string;
  modelId: string | null;
  region: string | null;
  metricType: MetricType;
  value: number;
  timestamp: string;
};

export function toMetricPointRecord(point: AIMetricPoint): MetricPointRecord {
  return {
    id: point.id,
    tenantId: point.tenantId,
    modelId: point.modelId,
    region: point.region,
    metricType: point.metricType as MetricType,
    value: point.value,
    timestamp: point.timestamp.toISOString(),
  };
}
