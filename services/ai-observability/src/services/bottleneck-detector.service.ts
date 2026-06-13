import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { ObservabilityRepository } from "@/repositories/observability.repository";

const LATENCY_THRESHOLD_MS = 500;
const ERROR_RATE_THRESHOLD = 0.05;
const THROUGHPUT_DROP_THRESHOLD = 0.4;

@Injectable()
export class BottleneckDetectorService {
  constructor(private readonly repository: ObservabilityRepository) {}

  async detectBottlenecks(tenantId: string) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const metrics = await this.repository.listMetrics(tenantId, { since, limit: 5000 });
    const alerts: Array<{
      alertType: string;
      entity: string;
      severity: string;
      message: string;
      metadata: Record<string, unknown>;
    }> = [];

    const byModel = this.groupBy(metrics, (m) => m.modelId ?? "unknown");
    for (const [modelId, points] of Object.entries(byModel)) {
      const latencyPoints = points.filter((p) => p.metricType === "latency");
      const avgLatency = this.average(latencyPoints);
      if (avgLatency > LATENCY_THRESHOLD_MS) {
        alerts.push({
          alertType: "slow_model",
          entity: modelId,
          severity: avgLatency > LATENCY_THRESHOLD_MS * 2 ? "high" : "medium",
          message: `Model ${modelId} average latency ${avgLatency.toFixed(0)}ms exceeds threshold.`,
          metadata: { avgLatency, threshold: LATENCY_THRESHOLD_MS },
        });
      }

      const errorPoints = points.filter((p) => p.metricType === "error_rate");
      const avgError = this.average(errorPoints);
      if (avgError > ERROR_RATE_THRESHOLD) {
        alerts.push({
          alertType: "error_cluster",
          entity: modelId,
          severity: avgError > 0.1 ? "critical" : "high",
          message: `Model ${modelId} error rate ${(avgError * 100).toFixed(1)}% exceeds threshold.`,
          metadata: { avgError, threshold: ERROR_RATE_THRESHOLD },
        });
      }
    }

    const byRegion = this.groupBy(metrics, (m) => m.region ?? "global");
    for (const [region, points] of Object.entries(byRegion)) {
      const latencyPoints = points.filter((p) => p.metricType === "latency");
      const avgLatency = this.average(latencyPoints);
      if (avgLatency > LATENCY_THRESHOLD_MS) {
        alerts.push({
          alertType: "slow_region",
          entity: region,
          severity: "medium",
          message: `Region ${region} average latency ${avgLatency.toFixed(0)}ms is elevated.`,
          metadata: { avgLatency },
        });
      }
    }

    const byTenant = this.groupBy(metrics, (m) => m.tenantId);
    for (const [tid, points] of Object.entries(byTenant)) {
      const throughput = points.filter((p) => p.metricType === "throughput");
      const avgThroughput = this.average(throughput);
      if (avgThroughput > 0 && avgThroughput < THROUGHPUT_DROP_THRESHOLD * 1000) {
        alerts.push({
          alertType: "slow_tenant",
          entity: tid,
          severity: "low",
          message: `Tenant ${tid} throughput is below expected baseline.`,
          metadata: { avgThroughput },
        });
      }
    }

    const providers = this.detectProviderDegradation(metrics);
    alerts.push(...providers);

    const persisted = [];
    for (const alert of alerts) {
      const row = await this.repository.createBottleneckAlert({
        tenantId,
        ...alert,
        metadata: alert.metadata as Prisma.InputJsonValue,
      });
      persisted.push(row);
    }

    return {
      detectedAt: new Date().toISOString(),
      count: persisted.length,
      alerts: persisted,
      recommendations: persisted.map((a) => ({
        alertId: a.id,
        action: a.alertType === "error_cluster" ? "canary_rollback" : "investigate",
        entity: a.entity,
      })),
    };
  }

  async listAlerts(tenantId: string, unresolvedOnly = true) {
    return this.repository.listBottleneckAlerts(tenantId, unresolvedOnly);
  }

  async resolveAlert(id: string, tenantId: string) {
    const result = await this.repository.resolveBottleneckAlert(id, tenantId);
    return { resolved: result.count > 0, id };
  }

  private detectProviderDegradation(
    metrics: Awaited<ReturnType<ObservabilityRepository["listMetrics"]>>,
  ) {
    const providers = ["OPENAI", "AZURE", "LOCAL"];
    const alerts: Array<{
      alertType: string;
      entity: string;
      severity: string;
      message: string;
      metadata: Record<string, unknown>;
    }> = [];

    for (const provider of providers) {
      const providerMetrics = metrics.filter(
        (m) => m.modelId?.toUpperCase().includes(provider) || m.region?.includes(provider.toLowerCase()),
      );
      const errorRate = this.average(providerMetrics.filter((m) => m.metricType === "error_rate"));
      if (errorRate > ERROR_RATE_THRESHOLD) {
        alerts.push({
          alertType: "provider_degradation",
          entity: provider,
          severity: "high",
          message: `Provider ${provider} showing elevated error rate ${(errorRate * 100).toFixed(1)}%.`,
          metadata: { errorRate },
        });
      }
    }

    return alerts;
  }

  private groupBy<T>(items: T[], keyFn: (item: T) => string) {
    return items.reduce<Record<string, T[]>>((acc, item) => {
      const key = keyFn(item);
      acc[key] = acc[key] ?? [];
      acc[key].push(item);
      return acc;
    }, {});
  }

  private average(points: Array<{ value: number }>) {
    if (!points.length) return 0;
    return points.reduce((sum, p) => sum + p.value, 0) / points.length;
  }
}
