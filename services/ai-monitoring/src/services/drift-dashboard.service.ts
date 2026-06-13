import { Injectable } from "@nestjs/common";
import { toDriftEventRecord } from "@/models/AIDriftEvent";
import { AiDriftEventRepository } from "@/repositories/drift.repository";
import { DriftMetricsService } from "@/services/drift-metrics.service";

@Injectable()
export class DriftDashboardService {
  constructor(
    private readonly eventRepository: AiDriftEventRepository,
    private readonly metricsService: DriftMetricsService,
  ) {}

  async getSummary(tenantId: string, modelId: string) {
    const events = await this.eventRepository.listByModel(tenantId, modelId, 20);
    const metrics = await this.metricsService.listMetrics(tenantId, modelId);
    const unresolved = events.filter((event) => !event.resolvedAt);

    const byType = {
      DATA: events.filter((event) => event.driftType === "DATA"),
      CONCEPT: events.filter((event) => event.driftType === "CONCEPT"),
      EMBEDDING: events.filter((event) => event.driftType === "EMBEDDING"),
      PERFORMANCE: events.filter((event) => event.driftType === "PERFORMANCE"),
    };

    const highestSeverity = events.reduce<string | null>((current, event) => {
      const order = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
      if (!current) {
        return event.severity;
      }
      return order.indexOf(event.severity) > order.indexOf(current) ? event.severity : current;
    }, null);

    const latestByType = {
      data: byType.DATA[0] ? toDriftEventRecord(byType.DATA[0]) : null,
      concept: byType.CONCEPT[0] ? toDriftEventRecord(byType.CONCEPT[0]) : null,
      embedding: byType.EMBEDDING[0] ? toDriftEventRecord(byType.EMBEDDING[0]) : null,
      performance: byType.PERFORMANCE[0] ? toDriftEventRecord(byType.PERFORMANCE[0]) : null,
    };

    return {
      modelId,
      highestSeverity,
      unresolvedCount: unresolved.length,
      latestByType,
      recentEvents: events.slice(0, 10).map(toDriftEventRecord),
      metricsSeries: metrics.slice(0, 48),
      recommendedAction:
        unresolved[0]
          ? (toDriftEventRecord(unresolved[0]).recommendedActions[0] ?? "Review drift event.")
          : "No active drift alerts.",
    };
  }

  async listEvents(tenantId: string, modelId: string) {
    const events = await this.eventRepository.listByModel(tenantId, modelId);
    return events.map(toDriftEventRecord);
  }
}
