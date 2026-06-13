import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import {
  hashBucket,
  toFeatureFlagRecord,
  type FlagEvaluationContext,
  type FlagEvaluationResult,
  type FlagVariant,
} from "@/models/FeatureFlag";
import { FeatureFlagRepository } from "@/repositories/feature-flag.repository";

@Injectable()
export class FeatureFlagService {
  constructor(private readonly repository: FeatureFlagRepository) {}

  async listFlags(tenantId: string) {
    const rows = await this.repository.list(tenantId);
    return this.repository.mapFlags(rows);
  }

  async getFlag(tenantId: string, key: string) {
    const row = await this.repository.findByKey(tenantId, key);
    return row ? toFeatureFlagRecord(row) : null;
  }

  async evaluateFlag(key: string, context: FlagEvaluationContext): Promise<FlagEvaluationResult | null> {
    const flag = await this.getFlag(context.tenantId, key);
    if (!flag || !flag.isActive) {
      return { key, enabled: false };
    }

    if (flag.type === "BOOLEAN") {
      const enabled = Boolean(flag.rollout.enabled ?? true);
      return { key, enabled };
    }

    if (flag.type === "PERCENTAGE") {
      const percentage = Number(flag.rollout.percentage ?? 0);
      const bucket = hashBucket(`${context.tenantId}:${context.userId ?? "anon"}:${key}`);
      return { key, enabled: bucket < percentage };
    }

    const variant = this.assignVariantFromFlag(flag.variants, flag.rollout, context, key);
    return { key, enabled: true, variant: variant.key, value: variant.value };
  }

  assignVariant(key: string, userId: string, tenantId: string) {
    return this.evaluateFlag(key, { userId, tenantId });
  }

  async updateRollout(tenantId: string, id: string, rollout: Record<string, unknown>) {
    const flag = await this.repository.findById(id);
    if (!flag || flag.tenantId !== tenantId) {
      throw new Error("Feature flag not found.");
    }
    const updated = await this.repository.update(id, { rollout: rollout as Prisma.InputJsonValue });
    return toFeatureFlagRecord(updated);
  }

  async createFlag(tenantId: string, input: {
    key: string;
    type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
    variants?: FlagVariant[];
    rollout?: Record<string, unknown>;
    isActive?: boolean;
  }) {
    const row = await this.repository.create({
      tenantId,
      key: input.key,
      type: input.type,
      variants: (input.variants ?? []) as Prisma.InputJsonValue,
      rollout: (input.rollout ?? {}) as Prisma.InputJsonValue,
      isActive: input.isActive ?? true,
    });
    return toFeatureFlagRecord(row);
  }

  async updateFlag(tenantId: string, id: string, input: Partial<{
    type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
    variants: FlagVariant[];
    rollout: Record<string, unknown>;
    isActive: boolean;
  }>) {
    const flag = await this.repository.findById(id);
    if (!flag || flag.tenantId !== tenantId) {
      throw new Error("Feature flag not found.");
    }
    const updated = await this.repository.update(id, {
      ...(input.type ? { type: input.type } : {}),
      ...(input.variants ? { variants: input.variants as Prisma.InputJsonValue } : {}),
      ...(input.rollout ? { rollout: input.rollout as Prisma.InputJsonValue } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    });
    return toFeatureFlagRecord(updated);
  }

  async evaluateMany(tenantId: string, keys: string[], context: Omit<FlagEvaluationContext, "tenantId">) {
    const results: FlagEvaluationResult[] = [];
    for (const key of keys) {
      const result = await this.evaluateFlag(key, { ...context, tenantId });
      if (result) results.push(result);
    }
    return results;
  }

  private assignVariantFromFlag(
    variants: FlagVariant[],
    rollout: Record<string, unknown>,
    context: FlagEvaluationContext,
    key: string,
  ) {
    const weights = variants.map((variant) => ({
      ...variant,
      weight: variant.weight ?? Number((rollout[variant.key] as number | undefined) ?? 0),
    }));
    const total = weights.reduce((sum, v) => sum + (v.weight ?? 0), 0) || 100;
    const bucket = hashBucket(`${context.tenantId}:${context.userId ?? "anon"}:${key}`);
    let cursor = 0;
    for (const variant of weights) {
      cursor += ((variant.weight ?? 0) / total) * 100;
      if (bucket < cursor) return variant;
    }
    return weights[0] ?? { key: "control", value: null };
  }
}
