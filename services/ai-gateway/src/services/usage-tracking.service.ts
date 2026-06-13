import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { UsageSummary } from "@/models/AIUsageEvent";
import { aiGatewayConfig } from "@/config/ai-gateway.config";
import { AiCostSyncClient } from "@/integrations/ai-cost-sync.client";
import { GatewayRepository } from "@/repositories/gateway.repository";
import { BudgetService } from "@/services/budget.service";

@Injectable()
export class UsageTrackingService {
  constructor(
    private readonly repository: GatewayRepository,
    private readonly budgetService: BudgetService,
    private readonly costSyncClient: AiCostSyncClient,
  ) {}

  estimateCost(tokens: number) {
    return (tokens / 1000) * aiGatewayConfig.defaultCostPer1kTokens;
  }

  async recordUsage(event: {
    tenantId: string;
    gatewayKeyId?: string;
    modelId?: string;
    tokensPrompt?: number;
    tokensCompletion?: number;
    latencyMs?: number;
    success?: boolean;
    metadata?: Record<string, unknown>;
  }) {
    const feature = String(event.metadata?.endpoint ?? event.metadata?.feature ?? "gateway");
    const costResult = await this.costSyncClient.recordCostEvent({
      tenantId: event.tenantId,
      modelId: event.modelId,
      feature,
      tokensPrompt: event.tokensPrompt ?? 0,
      tokensCompletion: event.tokensCompletion ?? 0,
      metadata: event.metadata,
    });
    const cost = costResult.cost ?? this.estimateCost((event.tokensPrompt ?? 0) + (event.tokensCompletion ?? 0));

    const row = await this.repository.recordUsage({
      tenantId: event.tenantId,
      gatewayKeyId: event.gatewayKeyId,
      modelId: event.modelId,
      tokensPrompt: event.tokensPrompt ?? 0,
      tokensCompletion: event.tokensCompletion ?? 0,
      cost,
      latencyMs: event.latencyMs ?? 0,
      success: event.success ?? true,
      metadata: {
        ...(event.metadata ?? {}),
        costEventId: costResult.eventId,
        costSource: "ai-cost-service",
      } as Prisma.InputJsonValue,
    });
    await this.budgetService.incrementBudget(event.tenantId, (event.tokensPrompt ?? 0) + (event.tokensCompletion ?? 0), cost);
    return this.repository.mapUsage(row);
  }

  async aggregateUsage(tenantId: string, since?: Date): Promise<UsageSummary> {
    const events = await this.repository.listUsage(tenantId, since);
    const byModel = new Map<string, { tokens: number; cost: number; requests: number }>();

    let totalTokens = 0;
    let totalCost = 0;
    let totalLatency = 0;

    for (const event of events) {
      const tokens = event.tokensPrompt + event.tokensCompletion;
      totalTokens += tokens;
      totalCost += event.cost;
      totalLatency += event.latencyMs;
      const modelId = event.modelId ?? "unknown";
      const current = byModel.get(modelId) ?? { tokens: 0, cost: 0, requests: 0 };
      byModel.set(modelId, {
        tokens: current.tokens + tokens,
        cost: current.cost + event.cost,
        requests: current.requests + 1,
      });
    }

    const topModels = [...byModel.entries()]
      .map(([modelId, stats]) => ({ modelId, ...stats }))
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 10);

    return {
      tenantId,
      totalRequests: events.length,
      totalTokens,
      totalCost,
      avgLatencyMs: events.length ? totalLatency / events.length : 0,
      topModels,
    };
  }

  async getUsageByModel(tenantId: string) {
    const summary = await this.aggregateUsage(tenantId);
    return summary.topModels;
  }

  async getUsageByKey(tenantId: string) {
    const events = await this.repository.listUsage(tenantId);
    const byKey = new Map<string, { keyId: string; tokens: number; cost: number; requests: number }>();
    for (const event of events) {
      if (!event.gatewayKeyId) continue;
      const current = byKey.get(event.gatewayKeyId) ?? {
        keyId: event.gatewayKeyId,
        tokens: 0,
        cost: 0,
        requests: 0,
      };
      byKey.set(event.gatewayKeyId, {
        keyId: event.gatewayKeyId,
        tokens: current.tokens + event.tokensPrompt + event.tokensCompletion,
        cost: current.cost + event.cost,
        requests: current.requests + 1,
      });
    }
    return [...byKey.values()].sort((a, b) => b.cost - a.cost);
  }
}
