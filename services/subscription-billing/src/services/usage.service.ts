import { Injectable } from "@nestjs/common";
import type { UsageMetric } from "@/generated/prisma";
import { UsageMetricsClient } from "@/integrations/usage-metrics.client";
import { toUsageRecordResponse } from "@/models/UsageRecord";
import type { PlanLimits } from "@/models/Plan";
import { UsageRecordRepository } from "@/repositories/usage-record.repository";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { OverageService } from "@/services/overage.service";
import { StripeService } from "@/services/stripe.service";
import { validateRecordUsage, validateUsageMetric } from "@/validators/usage.validator";

export type UsageSummary = {
  patients: { used: number; limit: number };
  appointments: { used: number; limit: number };
  storageMB: { used: number; limit: number };
  smsSent: { used: number; limit: number };
  staff: { used: number; limit: number };
  overage: Awaited<ReturnType<OverageService["checkOverage"]>>;
  periodStart: string;
  periodEnd: string;
};

@Injectable()
export class UsageService {
  constructor(
    private readonly usageRecordRepository: UsageRecordRepository,
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly usageMetricsClient: UsageMetricsClient,
    private readonly stripeService: StripeService,
    private readonly overageService: OverageService,
  ) {}

  resolveBillingPeriod(subscription: {
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
    createdAt: Date;
  }) {
    const periodStart = subscription.currentPeriodStart ?? subscription.createdAt;
    const periodEnd =
      subscription.currentPeriodEnd ??
      new Date(periodStart.getTime() + 30 * 24 * 60 * 60 * 1000);
    return { periodStart, periodEnd };
  }

  async recordUsage(tenantId: string, metricInput: string, quantity: number) {
    const metric = validateUsageMetric(metricInput);
    const input = validateRecordUsage({ quantity });
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const { periodStart, periodEnd } = this.resolveBillingPeriod(
      subscription ?? { currentPeriodStart: null, currentPeriodEnd: null, createdAt: new Date() },
    );

    const record = await this.usageRecordRepository.incrementQuantity({
      tenantId,
      metric,
      periodStart,
      periodEnd,
      delta: input.quantity,
    });

    if (subscription?.stripeSubscriptionItemId) {
      const stripeRecordId = await this.stripeService.reportUsage(
        subscription.stripeSubscriptionItemId,
        input.quantity,
      );
      if (stripeRecordId) {
        await this.usageRecordRepository.upsertPeriod({
          tenantId,
          metric,
          quantity: record.quantity,
          periodStart,
          periodEnd,
          stripeUsageRecordId: stripeRecordId,
        });
      }
    }

    return toUsageRecordResponse(record);
  }

  async syncLiveUsage(tenantId: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const { periodStart, periodEnd } = this.resolveBillingPeriod(
      subscription ?? { currentPeriodStart: null, currentPeriodEnd: null, createdAt: new Date() },
    );

    const live = await this.usageMetricsClient.fetchLiveMetrics(tenantId, periodStart, periodEnd);
    const entries: Array<{ metric: UsageMetric; quantity: number }> = [
      { metric: "PATIENT_COUNT", quantity: live.patients ?? 0 },
      { metric: "APPOINTMENT_COUNT", quantity: live.appointments ?? 0 },
      { metric: "STORAGE_MB", quantity: live.storageMB ?? 0 },
    ];

    for (const entry of entries) {
      await this.usageRecordRepository.upsertPeriod({
        tenantId,
        metric: entry.metric,
        quantity: entry.quantity,
        periodStart,
        periodEnd,
      });
    }

    return live;
  }

  async getUsageSummary(tenantId: string): Promise<UsageSummary> {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const limits = (subscription?.plan?.limits ?? {}) as PlanLimits & {
      maxAppointments?: number;
      maxSmsSent?: number;
    };
    const { periodStart, periodEnd } = this.resolveBillingPeriod(
      subscription ?? { currentPeriodStart: null, currentPeriodEnd: null, createdAt: new Date() },
    );

    const live = await this.syncLiveUsage(tenantId);
    const records = await this.usageRecordRepository.findCurrentPeriod(tenantId, periodStart);
    const smsRecord = records.find((record) => record.metric === "SMS_SENT");

    const patients = live.patients ?? 0;
    const appointments = live.appointments ?? 0;
    const storageMB = live.storageMB ?? 0;
    const smsSent = smsRecord?.quantity ?? 0;
    const staff = live.staff ?? 0;

    const overage = await this.overageService.checkOverage(tenantId, {
      patients,
      appointments,
      storageMB,
      smsSent,
    });

    return {
      patients: { used: patients, limit: limits.maxPatients ?? -1 },
      appointments: { used: appointments, limit: limits.maxAppointments ?? -1 },
      storageMB: { used: storageMB, limit: limits.maxStorageMB ?? -1 },
      smsSent: { used: smsSent, limit: limits.maxSmsSent ?? -1 },
      staff: { used: staff, limit: limits.maxStaff ?? -1 },
      overage,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
    };
  }

  async getUsageHistory(tenantId: string) {
    const records = await this.usageRecordRepository.listHistory(tenantId);
    return records.map(toUsageRecordResponse);
  }
}
