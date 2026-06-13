import type { AIDriftMetric } from "@/generated/prisma";

export type DriftStats = Record<string, unknown>;

export type DriftMetricRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  timestamp: string;
  granularity: string;
  inputStats: DriftStats;
  outputStats: DriftStats;
  embeddingStats: DriftStats;
  performanceStats: DriftStats;
};

export function toDriftMetricRecord(metric: AIDriftMetric): DriftMetricRecord {
  return {
    id: metric.id,
    tenantId: metric.tenantId,
    modelId: metric.modelId,
    timestamp: metric.timestamp.toISOString(),
    granularity: metric.granularity,
    inputStats:
      metric.inputStats && typeof metric.inputStats === "object"
        ? (metric.inputStats as DriftStats)
        : {},
    outputStats:
      metric.outputStats && typeof metric.outputStats === "object"
        ? (metric.outputStats as DriftStats)
        : {},
    embeddingStats:
      metric.embeddingStats && typeof metric.embeddingStats === "object"
        ? (metric.embeddingStats as DriftStats)
        : {},
    performanceStats:
      metric.performanceStats && typeof metric.performanceStats === "object"
        ? (metric.performanceStats as DriftStats)
        : {},
  };
}
