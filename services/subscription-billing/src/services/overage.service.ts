import { Injectable } from "@nestjs/common";
import type { UsageMetric } from "@/generated/prisma";
import type { PlanLimits } from "@/models/Plan";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { StripeService } from "@/services/stripe.service";

type OverageRates = Partial<Record<UsageMetric, number>>;

const DEFAULT_OVERAGE_RATES: OverageRates = {
  PATIENT_COUNT: 2,
  APPOINTMENT_COUNT: 1,
  STORAGE_MB: 0,
  SMS_SENT: 5,
};

type UsageSnapshot = {
  patients: number;
  appointments: number;
  storageMB: number;
  smsSent: number;
};

@Injectable()
export class OverageService {
  constructor(
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly stripeService: StripeService,
  ) {}

  async checkOverage(tenantId: string, usage: UsageSnapshot) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const limits = (subscription?.plan?.limits ?? {}) as PlanLimits & {
      maxAppointments?: number;
      maxSmsSent?: number;
      overageRates?: OverageRates;
    };

    const rates = { ...DEFAULT_OVERAGE_RATES, ...(limits.overageRates ?? {}) };
    const items: Array<{
      metric: UsageMetric;
      limit: number;
      used: number;
      overageUnits: number;
      unitCostCents: number;
      totalCostCents: number;
    }> = [];

    const checks: Array<{ metric: UsageMetric; used: number; limit: number }> = [
      { metric: "PATIENT_COUNT", used: usage.patients, limit: limits.maxPatients ?? -1 },
      {
        metric: "APPOINTMENT_COUNT",
        used: usage.appointments,
        limit: limits.maxAppointments ?? -1,
      },
      { metric: "STORAGE_MB", used: usage.storageMB, limit: limits.maxStorageMB ?? -1 },
      { metric: "SMS_SENT", used: usage.smsSent, limit: limits.maxSmsSent ?? -1 },
    ];

    let totalOverageCents = 0;

    for (const check of checks) {
      if (check.limit < 0 || check.used <= check.limit) {
        continue;
      }

      const overageUnits = check.used - check.limit;
      const unitCostCents = rates[check.metric] ?? 0;
      const totalCostCents = overageUnits * unitCostCents;
      totalOverageCents += totalCostCents;

      items.push({
        metric: check.metric,
        limit: check.limit,
        used: check.used,
        overageUnits,
        unitCostCents,
        totalCostCents,
      });

      if (subscription?.stripeSubscriptionItemId && overageUnits > 0) {
        await this.stripeService.reportUsage(subscription.stripeSubscriptionItemId, overageUnits);
      }
    }

    return {
      hasOverage: items.length > 0,
      totalOverageCents,
      items,
      currency: subscription?.plan?.currency ?? "EUR",
    };
  }
}
