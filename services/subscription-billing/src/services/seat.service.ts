import { Injectable } from "@nestjs/common";
import type { PlanRecord } from "@/models/Plan";
import type { PlanLimits } from "@/models/Plan";
import { UsageMetricsClient } from "@/integrations/usage-metrics.client";
import { seatLimitExceededError } from "@/utils/subscription-errors";

@Injectable()
export class SeatService {
  constructor(private readonly usageMetricsClient: UsageMetricsClient) {}

  async getSeatCount(tenantId: string) {
    const metrics = await this.usageMetricsClient.fetchLiveMetrics(
      tenantId,
      new Date(0),
      new Date(),
    );
    return metrics.staff ?? 0;
  }

  enforceSeatLimit(seatCount: number, plan: PlanRecord | { limits: unknown }) {
    const limits = (plan.limits ?? {}) as PlanLimits;
    const maxStaff = limits.maxStaff ?? -1;
    if (maxStaff >= 0 && seatCount > maxStaff) {
      throw seatLimitExceededError();
    }
  }

  async enforceSeatLimitForTenant(tenantId: string, plan: PlanRecord | { limits: unknown }) {
    const seatCount = await this.getSeatCount(tenantId);
    this.enforceSeatLimit(seatCount, plan);
    return seatCount;
  }
}
