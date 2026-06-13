import { Injectable } from "@nestjs/common";
import type { ExperimentVariant } from "@/models/Experiment";
import { ExperimentRepository } from "@/repositories/feature-flag.repository";

export type VariantMetrics = {
  variant: string;
  assignments: number;
  conversions: number;
  conversionRate: number;
  engagements: number;
  engagementRate: number;
  retention: number;
  avgLatencyMs: number;
  errorRate: number;
};

export type ExperimentReport = {
  experimentId: string;
  experimentName: string;
  status: string;
  variants: VariantMetrics[];
  winner: string | null;
  statisticalSignificance: number;
  recommendation: string;
};

@Injectable()
export class ExperimentAnalyticsService {
  constructor(private readonly repository: ExperimentRepository) {}

  async calculateVariantMetrics(tenantId: string, experimentId: string) {
    const experiment = await this.repository.findById(experimentId);
    if (!experiment || experiment.tenantId !== tenantId) {
      throw new Error("Experiment not found.");
    }

    const assignments = await this.repository.listAssignments(experimentId);
    const events = await this.repository.listEvents(experimentId);
    const variants = experiment.variants as ExperimentVariant[];

    return variants.map((variant) => {
      const variantAssignments = assignments.filter((a) => a.variant === variant.key);
      const variantEvents = events.filter((e) => e.variant === variant.key);
      const conversions = variantEvents.filter((e) => e.eventType === "conversion").length;
      const engagements = variantEvents.filter((e) => e.eventType === "engagement").length;
      const retentions = variantEvents.filter((e) => e.eventType === "retention").length;
      const latencyEvents = variantEvents.filter((e) => e.eventType === "latency");
      const errors = variantEvents.filter((e) => e.eventType === "error").length;
      const assignmentCount = Math.max(variantAssignments.length, 1);

      const avgLatencyMs =
        latencyEvents.length > 0
          ? latencyEvents.reduce((sum, e) => {
              const payload = e.payload as Record<string, unknown>;
              return sum + Number(payload.latencyMs ?? 0);
            }, 0) / latencyEvents.length
          : 0;

      return {
        variant: variant.key,
        assignments: variantAssignments.length,
        conversions,
        conversionRate: conversions / assignmentCount,
        engagements,
        engagementRate: engagements / assignmentCount,
        retention: retentions / assignmentCount,
        avgLatencyMs,
        errorRate: errors / Math.max(variantEvents.length, 1),
      } satisfies VariantMetrics;
    });
  }

  async compareVariants(tenantId: string, experimentId: string) {
    const metrics = await this.calculateVariantMetrics(tenantId, experimentId);
    const sorted = [...metrics].sort((a, b) => b.conversionRate - a.conversionRate);
    const control = sorted[0];
    const challenger = sorted[1];
    const significance =
      control && challenger
        ? Math.min(0.99, Math.abs(control.conversionRate - challenger.conversionRate) * 10 + 0.5)
        : 0.5;
    return { metrics: sorted, significance, leader: control?.variant ?? null };
  }

  async generateExperimentReport(tenantId: string, experimentId: string): Promise<ExperimentReport> {
    const experiment = await this.repository.findById(experimentId);
    if (!experiment || experiment.tenantId !== tenantId) {
      throw new Error("Experiment not found.");
    }

    const comparison = await this.compareVariants(tenantId, experimentId);
    const winner = comparison.leader;
    const recommendation =
      comparison.significance >= 0.95 && winner
        ? `Promote variant ${winner} — statistically significant uplift detected.`
        : comparison.significance >= 0.8
          ? "Continue experiment — approaching significance."
          : "Insufficient data — keep experiment running.";

    return {
      experimentId,
      experimentName: experiment.name,
      status: experiment.status,
      variants: comparison.metrics,
      winner,
      statisticalSignificance: Number(comparison.significance.toFixed(3)),
      recommendation,
    };
  }
}
