import { Injectable, Logger } from "@nestjs/common";
import { toDriftEventRecord } from "@/models/AIDriftEvent";
import type { DriftSeverity, DriftType } from "@/models/AIDriftEvent";
import { AiTrainingMitigationClient } from "@/integrations/ai-training-mitigation.client";
import { AiDriftEventRepository } from "@/repositories/drift.repository";
import { DriftAlertService } from "@/services/drift-alert.service";
import { DriftMetricsService } from "@/services/drift-metrics.service";
import { DriftMitigationService } from "@/services/drift-mitigation.service";
import {
  cosineDistance,
  jensenShannonDivergence,
  klDivergence,
  kolmogorovSmirnovStatistic,
  populationStabilityIndex,
  severityFromScore,
} from "@/utils/drift-math";

@Injectable()
export class DriftDetectionService {
  private readonly logger = new Logger(DriftDetectionService.name);

  constructor(
    private readonly eventRepository: AiDriftEventRepository,
    private readonly metricsService: DriftMetricsService,
    private readonly alertService: DriftAlertService,
    private readonly mitigationService: DriftMitigationService,
    private readonly trainingClient: AiTrainingMitigationClient,
  ) {}

  async runFullDetection(
    tenantId: string,
    modelId: string,
    headers: Record<string, string>,
  ) {
    const model = await this.trainingClient.getModel(modelId, headers);
    const modelName = model?.modelName ?? modelId;

    await this.metricsService.collectInferenceStats(tenantId, modelId, modelName, headers);
    const baseline = await this.metricsService.getBaselineStats(tenantId, modelId);
    const currentStats = await this.metricsService.collectInferenceStats(
      tenantId,
      modelId,
      modelName,
      headers,
    );

    const results = await Promise.all([
      this.detectDataDrift(tenantId, modelId, baseline.inputStats, currentStats.inputStats),
      this.detectConceptDrift(tenantId, modelId, baseline.outputStats, currentStats.outputStats),
      this.detectEmbeddingDrift(
        tenantId,
        modelId,
        baseline.embeddingStats,
        currentStats.embeddingStats,
      ),
      this.detectPerformanceDrift(
        tenantId,
        modelId,
        baseline.performanceStats,
        currentStats.performanceStats,
      ),
    ]);

    const events = results.filter((result) => result !== null);
    for (const event of events) {
      if (event.severity === "CRITICAL" || event.severity === "HIGH") {
        await this.mitigationService.applyAutomaticMitigation({
          tenantId,
          modelId,
          severity: event.severity,
          driftType: event.driftType,
          headers,
        });
      }
    }

    return { modelId, events, detectedAt: new Date().toISOString() };
  }

  async detectDataDrift(
    tenantId: string,
    modelId: string,
    baselineInput: Record<string, unknown>,
    currentInput: Record<string, unknown>,
  ) {
    const baseline = (baselineInput.tokenDistribution as number[]) ?? [0.25, 0.25, 0.25, 0.25];
    const current = (currentInput.tokenDistribution as number[]) ?? [0.2, 0.3, 0.3, 0.2];
    const psi = populationStabilityIndex(baseline, current);
    const ks = kolmogorovSmirnovStatistic(baseline, current);
    const kl = klDivergence(baseline, current);
    const score = Math.max(psi / 0.5, ks, kl / 2);
    const severity = severityFromScore(score);

    if (severity === "LOW") {
      return null;
    }

    return this.generateDriftEvent(tenantId, modelId, "DATA", severity, {
      psi,
      ksStatistic: ks,
      klDivergence: kl,
      score,
    });
  }

  async detectConceptDrift(
    tenantId: string,
    modelId: string,
    baselineOutput: Record<string, unknown>,
    currentOutput: Record<string, unknown>,
  ) {
    const baseline = (baselineOutput.responseDistribution as number[]) ?? [0.25, 0.25, 0.25, 0.25];
    const current = (currentOutput.responseDistribution as number[]) ?? [0.18, 0.32, 0.3, 0.2];
    const js = jensenShannonDivergence(baseline, current);
    const score = js;
    const severity = severityFromScore(score);

    if (severity === "LOW") {
      return null;
    }

    return this.generateDriftEvent(tenantId, modelId, "CONCEPT", severity, {
      jensenShannonDivergence: js,
      score,
    });
  }

  async detectEmbeddingDrift(
    tenantId: string,
    modelId: string,
    baselineEmbedding: Record<string, unknown>,
    currentEmbedding: Record<string, unknown>,
  ) {
    const baselineCentroid = (baselineEmbedding.centroid as number[]) ?? [0.1, 0.2, 0.3, 0.4];
    const currentCentroid = (currentEmbedding.centroid as number[]) ?? [0.12, 0.34, 0.56, 0.78];
    const cosine = cosineDistance(baselineCentroid, currentCentroid);
    const baselineVariance = Number(baselineEmbedding.variance ?? 0.05);
    const currentVariance = Number(currentEmbedding.variance ?? 0.08);
    const varianceShift = Math.abs(currentVariance - baselineVariance);
    const score = Math.max(cosine, varianceShift * 2);
    const severity = severityFromScore(score);

    if (severity === "LOW") {
      return null;
    }

    return this.generateDriftEvent(tenantId, modelId, "EMBEDDING", severity, {
      cosineDistance: cosine,
      varianceShift,
      score,
    });
  }

  async detectPerformanceDrift(
    tenantId: string,
    modelId: string,
    baselinePerformance: Record<string, unknown>,
    currentPerformance: Record<string, unknown>,
  ) {
    const baselineLatency = Number(baselinePerformance.avgLatencyMs ?? 200);
    const currentLatency = Number(currentPerformance.avgLatencyMs ?? 220);
    const baselineError = Number(baselinePerformance.errorRate ?? 0.01);
    const currentError = Number(currentPerformance.errorRate ?? 0.01);
    const baselineHallucination = Number(baselinePerformance.hallucinationRate ?? 0.05);
    const currentHallucination = Number(currentPerformance.hallucinationRate ?? 0.06);

    const latencyDelta = Math.max(0, (currentLatency - baselineLatency) / baselineLatency);
    const errorDelta = Math.max(0, currentError - baselineError);
    const hallucinationDelta = Math.max(0, currentHallucination - baselineHallucination);
    const score = Math.max(latencyDelta, errorDelta * 5, hallucinationDelta * 3);
    const severity = severityFromScore(score);

    if (severity === "LOW") {
      return null;
    }

    return this.generateDriftEvent(tenantId, modelId, "PERFORMANCE", severity, {
      latencyDelta,
      errorDelta,
      hallucinationDelta,
      avgLatencyMs: currentLatency,
      errorRate: currentError,
      hallucinationRate: currentHallucination,
      score,
    });
  }

  async generateDriftEvent(
    tenantId: string,
    modelId: string,
    driftType: DriftType,
    severity: DriftSeverity,
    metrics: Record<string, unknown>,
  ) {
    const summary = `${driftType} drift detected with severity ${severity}`;
    const recommendedActions = this.recommendations(driftType, severity);

    const event = await this.eventRepository.create({
      tenantId,
      modelId,
      driftType,
      severity,
      metrics: metrics as never,
      summary,
      recommendedActions: recommendedActions as never,
    });

    const record = toDriftEventRecord(event);
    this.alertService.dispatchAlert(tenantId, {
      modelId,
      driftType,
      severity,
      summary,
      recommendedActions,
    });

    this.logger.log(`Drift event ${record.id} model=${modelId} type=${driftType} severity=${severity}`);
    return record;
  }

  private recommendations(driftType: DriftType, severity: DriftSeverity) {
    const actions = [`Review ${driftType.toLowerCase()} drift metrics in the dashboard.`];
    if (severity === "MEDIUM") {
      actions.push("Schedule retraining with updated dataset.");
    }
    if (severity === "HIGH") {
      actions.push("Reduce canary rollout to 10%.");
    }
    if (severity === "CRITICAL") {
      actions.push("Rollback to previous stable model immediately.");
    }
    return actions;
  }
}
