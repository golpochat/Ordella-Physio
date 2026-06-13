import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toGatewayKeyRecord } from "@/models/AIGatewayKey";
import { toBudgetRecord } from "@/models/AIBudget";
import { toRateLimitRecord } from "@/models/AIRateLimit";
import { toUsageEventRecord } from "@/models/AIUsageEvent";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class GatewayRepository {
  constructor(private readonly db: DatabaseService) {}

  findKeyByHash(keyHash: string) {
    return this.db.aIGatewayKey.findUnique({ where: { keyHash } });
  }

  listKeys(tenantId: string) {
    return this.db.aIGatewayKey.findMany({ where: { tenantId, revokedAt: null }, orderBy: { createdAt: "desc" } });
  }

  findKey(id: string) {
    return this.db.aIGatewayKey.findUnique({ where: { id } });
  }

  createKey(data: {
    tenantId: string;
    name: string;
    keyHash: string;
    keyPrefix: string;
    scopes: Prisma.InputJsonValue;
    rateLimitProfileId?: string;
    budgetProfileId?: string;
  }) {
    return this.db.aIGatewayKey.create({ data });
  }

  updateKey(id: string, data: Partial<{
    name: string;
    scopes: Prisma.InputJsonValue;
    rateLimitProfileId: string | null;
    budgetProfileId: string | null;
    isActive: boolean;
    isFlagged: boolean;
    isThrottled: boolean;
    lastUsedAt: Date;
    revokedAt: Date | null;
    keyHash: string;
    keyPrefix: string;
  }>) {
    return this.db.aIGatewayKey.update({ where: { id }, data });
  }

  getRateLimit(id: string) {
    return this.db.aIRateLimit.findUnique({ where: { id } });
  }

  getDefaultRateLimit(tenantId: string) {
    return this.db.aIRateLimit.findFirst({ where: { OR: [{ tenantId }, { tenantId: null }] }, orderBy: { tenantId: "desc" } });
  }

  listRateLimits(tenantId: string) {
    return this.db.aIRateLimit.findMany({ where: { OR: [{ tenantId }, { tenantId: null }] } });
  }

  async upsertRateLimit(tenantId: string | null, data: Omit<Prisma.AIRateLimitCreateInput, "tenantId"> & { name: string }) {
    const existing = tenantId
      ? await this.db.aIRateLimit.findFirst({ where: { tenantId, name: data.name } })
      : await this.db.aIRateLimit.findFirst({ where: { tenantId: null, name: data.name } });
    if (existing) {
      return this.db.aIRateLimit.update({ where: { id: existing.id }, data });
    }
    return this.db.aIRateLimit.create({ data: { ...data, tenantId } });
  }

  getBudget(tenantId: string) {
    return this.db.aIBudget.findUnique({ where: { tenantId } });
  }

  upsertBudget(tenantId: string, data: Partial<{
    monthlyTokenBudget: number;
    monthlyCostBudget: number;
    softLimitPercentage: number;
    hardLimitPercentage: number;
    currentTokensUsed: number;
    currentCostUsed: number;
    periodStart: Date;
    periodEnd: Date;
  }>) {
    const periodEnd = data.periodEnd ?? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    return this.db.aIBudget.upsert({
      where: { tenantId },
      create: {
        tenantId,
        periodEnd,
        monthlyTokenBudget: data.monthlyTokenBudget ?? 1_000_000,
        monthlyCostBudget: data.monthlyCostBudget ?? 100,
        softLimitPercentage: data.softLimitPercentage ?? 80,
        hardLimitPercentage: data.hardLimitPercentage ?? 100,
      },
      update: data,
    });
  }

  recordUsage(data: {
    tenantId: string;
    gatewayKeyId?: string;
    modelId?: string;
    tokensPrompt?: number;
    tokensCompletion?: number;
    cost?: number;
    latencyMs?: number;
    success?: boolean;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aIUsageEvent.create({ data });
  }

  listUsage(tenantId: string, since?: Date) {
    return this.db.aIUsageEvent.findMany({
      where: { tenantId, ...(since ? { timestamp: { gte: since } } : {}) },
      orderBy: { timestamp: "desc" },
      take: 5000,
    });
  }

  mapKey(row: NonNullable<Awaited<ReturnType<GatewayRepository["findKey"]>>>) {
    return toGatewayKeyRecord(row);
  }

  mapBudget(row: NonNullable<Awaited<ReturnType<GatewayRepository["getBudget"]>>>) {
    return toBudgetRecord(row);
  }

  mapRateLimit(row: NonNullable<Awaited<ReturnType<GatewayRepository["getRateLimit"]>>>) {
    return toRateLimitRecord(row);
  }

  mapUsage(row: Awaited<ReturnType<GatewayRepository["listUsage"]>>[number]) {
    return toUsageEventRecord(row);
  }
}
