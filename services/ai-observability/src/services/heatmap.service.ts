import { Injectable } from "@nestjs/common";
import { MetricsService } from "@/services/metrics.service";
import { ObservabilityRepository } from "@/repositories/observability.repository";

const DEFAULT_REGIONS = ["us-east-1", "eu-west-1", "ap-southeast-1"];

@Injectable()
export class HeatmapService {
  constructor(
    private readonly repository: ObservabilityRepository,
    private readonly metricsService: MetricsService,
  ) {}

  async generateLatencyHeatmap(tenantId: string, since?: Date) {
    const points = await this.repository.listMetrics(tenantId, {
      metricType: "latency",
      since,
      limit: 3000,
    });

    const grid = this.buildGrid(points, DEFAULT_REGIONS);
    return { type: "latency", regions: DEFAULT_REGIONS, cells: grid, generatedAt: new Date().toISOString() };
  }

  async generateErrorRateHeatmap(tenantId: string, since?: Date) {
    const points = await this.repository.listMetrics(tenantId, {
      metricType: "error_rate",
      since,
      limit: 3000,
    });

    const grid = this.buildGrid(points, DEFAULT_REGIONS);
    return { type: "error_rate", regions: DEFAULT_REGIONS, cells: grid, generatedAt: new Date().toISOString() };
  }

  async generateThroughputHeatmap(tenantId: string, since?: Date) {
    const points = await this.repository.listMetrics(tenantId, {
      metricType: "throughput",
      since,
      limit: 3000,
    });

    const grid = this.buildGrid(points, DEFAULT_REGIONS);
    return { type: "throughput", regions: DEFAULT_REGIONS, cells: grid, generatedAt: new Date().toISOString() };
  }

  private buildGrid(
    points: Awaited<ReturnType<ObservabilityRepository["listMetrics"]>>,
    regions: string[],
  ) {
    const models = [...new Set(points.map((p) => p.modelId).filter(Boolean))] as string[];
    const modelList = models.length ? models : ["all-models"];

    return modelList.map((modelId) => ({
      modelId,
      regions: regions.map((region) => {
        const regionPoints = points.filter(
          (p) => (p.modelId ?? "all-models") === modelId && (p.region ?? region) === region,
        );
        const values = regionPoints.map((p) => p.value);
        const value = values.length
          ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(4))
          : 0;
        return { region, value, sampleCount: values.length };
      }),
    }));
  }
}
