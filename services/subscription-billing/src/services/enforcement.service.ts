import { Injectable } from "@nestjs/common";
import type { PlanLimits } from "@/models/Plan";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { FeatureGateService } from "@/services/feature-gate.service";
import { SeatService } from "@/services/seat.service";
import { UsageService } from "@/services/usage.service";
import {
  subscriptionInactiveError,
  usageLimitExceededError,
} from "@/utils/subscription-errors";
import { validateEnforcementAction } from "@/validators/usage.validator";

@Injectable()
export class EnforcementService {
  constructor(
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly usageService: UsageService,
    private readonly seatService: SeatService,
    private readonly featureGateService: FeatureGateService,
  ) {}

  async enforce(input: {
    tenantId: string;
    action: string;
    featureKey?: string;
    quantity?: number;
  }) {
    const tenantId = input.tenantId.trim();
    const action = validateEnforcementAction(input.action);
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const plan = subscription?.plan;
    const limits = (plan?.limits ?? {}) as PlanLimits & {
      maxAppointments?: number;
      maxSmsSent?: number;
    };

    this.assertSubscriptionActive(subscription?.status);

    const summary = await this.usageService.getUsageSummary(tenantId);

    switch (action) {
      case "PATIENT_CREATE":
        this.assertUnderLimit(summary.patients.used + 1, limits.maxPatients);
        return { allowed: true };
      case "APPOINTMENT_CREATE":
        this.assertUnderLimit(summary.appointments.used + 1, limits.maxAppointments ?? -1);
        return { allowed: true };
      case "FILE_UPLOAD": {
        const deltaMb = Math.max(1, Math.ceil((input.quantity ?? 1) / (1024 * 1024)));
        this.assertUnderLimit(summary.storageMB.used + deltaMb, limits.maxStorageMB);
        return { allowed: true };
      }
      case "SMS_SEND":
        this.assertUnderLimit(summary.smsSent.used + 1, limits.maxSmsSent ?? -1);
        return { allowed: true };
      case "STAFF_SEAT":
        await this.seatService.enforceSeatLimitForTenant(tenantId, plan ?? { limits });
        return { allowed: true };
      case "FEATURE":
        if (!input.featureKey) {
          throw usageLimitExceededError("featureKey is required for FEATURE enforcement.");
        }
        await this.featureGateService.enforceFeature(tenantId, input.featureKey);
        return { allowed: true };
      default:
        return { allowed: true };
    }
  }

  private assertSubscriptionActive(status?: string) {
    if (!status) {
      return;
    }

    if (!["ACTIVE", "TRIALING"].includes(status)) {
      throw subscriptionInactiveError();
    }
  }

  private assertUnderLimit(nextValue: number, limit: number) {
    if (limit >= 0 && nextValue > limit) {
      throw usageLimitExceededError();
    }
  }
}
