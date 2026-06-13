import { Injectable } from "@nestjs/common";
import { BottleneckDetectorService } from "@/services/bottleneck-detector.service";
import { HeatmapService } from "@/services/heatmap.service";
import { LoggingService } from "@/services/logging.service";
import { MetricsService } from "@/services/metrics.service";
import { TraceSpanService } from "@/services/trace.service";
import { ObservabilityRepository } from "@/repositories/observability.repository";

@Injectable()
export class ObservabilityDashboardService {
  constructor(
    private readonly traceService: TraceSpanService,
    private readonly loggingService: LoggingService,
    private readonly metricsService: MetricsService,
    private readonly heatmapService: HeatmapService,
    private readonly bottleneckDetector: BottleneckDetectorService,
    private readonly repository: ObservabilityRepository,
  ) {}

  async getDashboard(tenantId: string) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [traces, logs, latencyHeatmap, errorHeatmap, bottlenecks, latencyPercentiles] = await Promise.all([
      this.traceService.searchTraces(tenantId, { since, limit: 50 }),
      this.loggingService.getLogs(tenantId, { since, limit: 20 }),
      this.heatmapService.generateLatencyHeatmap(tenantId, since),
      this.heatmapService.generateErrorRateHeatmap(tenantId, since),
      this.bottleneckDetector.listAlerts(tenantId),
      this.metricsService.getLatencyPercentiles(tenantId),
    ]);

    const modelMetrics = await this.getModelPerformanceSummary(tenantId, since);
    const regionMetrics = await this.getRegionPerformanceSummary(tenantId, since);

    return {
      generatedAt: new Date().toISOString(),
      summary: {
        traceCount: traces.length,
        logCount: logs.length,
        openAlerts: bottlenecks.length,
        latencyP95: latencyPercentiles.p95,
      },
      heatmaps: {
        latency: latencyHeatmap,
        errorRate: errorHeatmap,
      },
      bottlenecks,
      modelPerformance: modelMetrics,
      regionPerformance: regionMetrics,
      recentTraces: traces.slice(0, 10),
      recentLogs: logs.slice(0, 10),
      overlays: {
        drift: { status: "available", endpoint: "/ai/drift" },
        cost: { status: "available", endpoint: "/ai/cost" },
        security: { status: "available", endpoint: "/ai/security/audit" },
      },
    };
  }

  async getPipelineView(tenantId: string) {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [datasetLogs, trainingLogs, deploymentLogs, inferenceLogs] = await Promise.all([
      this.loggingService.getLogs(tenantId, { service: "dataset", since, limit: 50 }),
      this.loggingService.getLogs(tenantId, { service: "training", since, limit: 50 }),
      this.loggingService.getLogs(tenantId, { service: "deployment", since, limit: 50 }),
      this.loggingService.getLogs(tenantId, { service: "inference", since, limit: 50 }),
    ]);

    const stages = [
      { stage: "dataset", label: "Dataset", events: datasetLogs.length, status: datasetLogs.length ? "active" : "idle" },
      { stage: "training", label: "Training", events: trainingLogs.length, status: trainingLogs.length ? "active" : "idle" },
      { stage: "deployment", label: "Deployment", events: deploymentLogs.length, status: deploymentLogs.length ? "active" : "idle" },
      { stage: "inference", label: "Inference", events: inferenceLogs.length, status: inferenceLogs.length ? "active" : "idle" },
    ];

    const traces = await this.traceService.searchTraces(tenantId, { since, limit: 100 });
    const pipelineTraces = traces.filter((t) =>
      ["dataset", "training", "deployment", "inference", "gateway"].includes(t.service),
    );

    return {
      stages,
      endToEndTraces: pipelineTraces.slice(0, 20),
      flow: stages.map((s, i) => ({
        ...s,
        next: stages[i + 1]?.stage ?? null,
      })),
    };
  }

  private async getModelPerformanceSummary(tenantId: string, since: Date) {
    const metrics = await this.repository.listMetrics(tenantId, { since, limit: 2000 });
    const models = [...new Set(metrics.map((m) => m.modelId).filter(Boolean))] as string[];
    return Promise.all(
      models.slice(0, 10).map((modelId) => this.metricsService.getMetricsByModel(tenantId, modelId, since)),
    );
  }

  private async getRegionPerformanceSummary(tenantId: string, since: Date) {
    const regions = ["us-east-1", "eu-west-1", "ap-southeast-1"];
    return Promise.all(regions.map((region) => this.metricsService.getMetricsByRegion(tenantId, region, since)));
  }
}
