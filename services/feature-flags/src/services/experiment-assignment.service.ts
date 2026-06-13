import { Injectable } from "@nestjs/common";
import { hashBucket } from "@/models/FeatureFlag";
import type { ExperimentVariant } from "@/models/Experiment";
import { ExperimentRepository } from "@/repositories/feature-flag.repository";

@Injectable()
export class ExperimentAssignmentService {
  constructor(private readonly repository: ExperimentRepository) {}

  async assignVariant(experimentId: string, tenantId: string, userId?: string) {
    const experiment = await this.repository.findById(experimentId);
    if (!experiment || experiment.tenantId !== tenantId) {
      throw new Error("Experiment not found.");
    }
    if (experiment.status !== "RUNNING") {
      throw new Error("Experiment is not running.");
    }

    if (userId) {
      const existing = await this.repository.getAssignment(experimentId, userId);
      if (existing) {
        return { variant: existing.variant, assigned: false };
      }
    }

    const variants = experiment.variants as ExperimentVariant[];
    const variantKey = this.pickVariant(variants, `${tenantId}:${userId ?? "anon"}:${experimentId}`);
    await this.repository.createAssignment({
      experimentId,
      tenantId,
      userId,
      variant: variantKey,
    });
    return { variant: variantKey, assigned: true };
  }

  async getAssignment(experimentId: string, userId: string) {
    const row = await this.repository.getAssignment(experimentId, userId);
    return row?.variant ?? null;
  }

  pickVariant(variants: ExperimentVariant[], seed: string) {
    const total = variants.reduce((sum, v) => sum + v.weight, 0) || 100;
    const bucket = hashBucket(seed);
    let cursor = 0;
    for (const variant of variants) {
      cursor += (variant.weight / total) * 100;
      if (bucket < cursor) return variant.key;
    }
    return variants[0]?.key ?? "A";
  }
}
