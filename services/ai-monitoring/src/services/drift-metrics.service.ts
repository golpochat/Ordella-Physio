import { Injectable } from "@nestjs/common";
import { toDriftMetricRecord } from "@/models/AIDriftMetric";
import { AiInferenceStatsClient } from "@/integrations/ai-inference-stats.client";
import { AiDriftMetricRepository } from "@/repositories/drift.repository";

@Injectable()
export class DriftMetricsService {
  constructor(
    private readonly metricRepository: AiDriftMetricRepository,
    private readonly inferenceStatsClient: AiInferenceStatsClient,
  ) {}

  async collectInferenceStats(
    tenantId: string,
    modelId: string,
    modelName: string,
    headers: Record<string, string>,
  ) {
    const stats = await this.inferenceStatsClient.collectInferenceStats(modelName, headers);
    return this.storeMetrics(tenantId, modelId, {
      inputStats: stats.inputStats,
      outputStats: stats.outputStats,
      embeddingStats: stats.embeddingStats,
      performanceStats: stats.performanceStats,
      granularity: "HOURLY",
    });
  }

  async aggregateHourly(tenantId: string, modelId: string) {
    const metrics = await this.metricRepository.listByModel(tenantId, modelId, 24);
    return metrics.map(toDriftMetricRecord);
  }

  async aggregateDaily(tenantId: string, modelId: string) {
    const metrics = await this.metricRepository.listByModel(tenantId, modelId, 168);
    return metrics.map(toDriftMetricRecord);
  }

  async listMetrics(tenantId: string, modelId: string) {
    const metrics = await this.metricRepository.listByModel(tenantId, modelId);
    return metrics.map(toDriftMetricRecord);
  }

  async getBaselineStats(tenantId: string, modelId: string) {
    const latest = await this.metricRepository.findLatest(tenantId, modelId);
    if (!latest) {
      return {
        inputStats: { tokenDistribution: [0.25, 0.25, 0.25, 0.25] },
        outputStats: { responseDistribution: [0.25, 0.25, 0.25, 0.25] },
        embeddingStats: { centroid: [0.1, 0.2, 0.3, 0.4], variance: 0.05 },
        performanceStats: { avgLatencyMs: 200, errorRate: 0.01, hallucinationRate: 0.05 },
      };
    }
    return {
      inputStats: latest.inputStats as Record<string, unknown>,
      outputStats: latest.outputStats as Record<string, unknown>,
      embeddingStats: latest.embeddingStats as Record<string, unknown>,
      performanceStats: latest.performanceStats as Record<string, unknown>,
    };
  }

  async storeMetrics(
    tenantId: string,
    modelId: string,
    stats: {
      inputStats: Record<string, unknown>;
      outputStats: Record<string, unknown>;
      embeddingStats: Record<string, unknown>;
      performanceStats: Record<string, unknown>;
      granularity?: string;
    },
  ) {
    const metric = await this.metricRepository.create({
      tenantId,
      modelId,
      granularity: stats.granularity ?? "HOURLY",
      inputStats: stats.inputStats as never,
      outputStats: stats.outputStats as never,
      embeddingStats: stats.embeddingStats as never,
      performanceStats: stats.performanceStats as never,
    });
    return toDriftMetricRecord(metric);
  }
}
