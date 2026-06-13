import { Injectable } from "@nestjs/common";
import type { MetricType } from "@/models/AIMetricPoint";
import { ObservabilityRepository } from "@/repositories/observability.repository";

@Injectable()
export class MetricsService {
  constructor(private readonly repository: ObservabilityRepository) {}

  async recordMetric(input: {
    tenantId: string;
    modelId?: string;
    region?: string;
    metricType: MetricType;
    value: number;
  }) {
    const row = await this.repository.createMetricPoint(input);
    return this.repository.mapMetricPoint(row);
  }

  async aggregateMetrics(tenantId: string, metricType: MetricType, since?: Date) {
    const points = await this.repository.listMetrics(tenantId, { metricType, since, limit: 2000 });
    if (!points.length) {
      return { metricType, count: 0, avg: 0, min: 0, max: 0, p50: 0, p95: 0, p99: 0 };
    }

    const values = points.map((p) => p.value).sort((a, b) => a - b);
    const sum = values.reduce((acc, v) => acc + v, 0);
    const percentile = (p: number) => values[Math.min(values.length - 1, Math.floor((p / 100) * values.length))] ?? 0;

    return {
      metricType,
      count: values.length,
      avg: Number((sum / values.length).toFixed(4)),
      min: values[0] ?? 0,
      max: values[values.length - 1] ?? 0,
      p50: percentile(50),
      p95: percentile(95),
      p99: percentile(99),
    };
  }

  async getMetricsByModel(tenantId: string, modelId: string, since?: Date) {
    const types: MetricType[] = ["latency", "error_rate", "throughput", "token_usage"];
    const results = await Promise.all(
      types.map(async (metricType) => {
        const points = await this.repository.listMetrics(tenantId, { metricType, modelId, since, limit: 500 });
        const values = points.map((p) => p.value);
        const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        return { metricType, count: values.length, avg: Number(avg.toFixed(4)) };
      }),
    );
    return { modelId, metrics: results };
  }

  async getMetricsByRegion(tenantId: string, region: string, since?: Date) {
    const types: MetricType[] = ["latency", "error_rate", "throughput"];
    const results = await Promise.all(
      types.map(async (metricType) => {
        const points = await this.repository.listMetrics(tenantId, { metricType, region, since, limit: 500 });
        const values = points.map((p) => p.value);
        const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        return { metricType, count: values.length, avg: Number(avg.toFixed(4)) };
      }),
    );
    return { region, metrics: results };
  }

  async getLatencyPercentiles(tenantId: string, modelId?: string, region?: string) {
    const points = await this.repository.listMetrics(tenantId, {
      metricType: "latency",
      modelId,
      region,
      limit: 2000,
    });
    const values = points.map((p) => p.value).sort((a, b) => a - b);
    if (!values.length) return { p50: 0, p95: 0, p99: 0, count: 0 };

    const at = (p: number) => values[Math.min(values.length - 1, Math.floor((p / 100) * values.length))] ?? 0;
    return { p50: at(50), p95: at(95), p99: at(99), count: values.length };
  }
}
