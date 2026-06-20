import { Injectable } from "@nestjs/common";
import { ERROR_CODES, HttpError } from "@ordella/errors";
import { UsageMetricsClient } from "@/integrations/usage-metrics.client";
import { TenantSubscriptionClient } from "@/enforcement/tenant-subscription.client";

type PlanLimits = {
  maxStaff: number;
  maxPatients: number;
  maxStorageMB: number;
  maxAppointments: number;
  maxSmsSent: number;
  features: {
    billing: boolean;
    reporting: boolean;
    ai: boolean;
  };
};

const PLAN_LIMITS: Record<string, PlanLimits> = {
  STARTER: {
    maxStaff: 2,
    maxPatients: 100,
    maxStorageMB: 512,
    maxAppointments: -1,
    maxSmsSent: -1,
    features: { billing: false, reporting: false, ai: false },
  },
  PROFESSIONAL: {
    maxStaff: 10,
    maxPatients: 2000,
    maxStorageMB: 5120,
    maxAppointments: -1,
    maxSmsSent: -1,
    features: { billing: true, reporting: true, ai: false },
  },
  ENTERPRISE: {
    maxStaff: -1,
    maxPatients: -1,
    maxStorageMB: 102400,
    maxAppointments: -1,
    maxSmsSent: -1,
    features: { billing: true, reporting: true, ai: true },
  },
};

const ENFORCEMENT_ACTIONS = [
  "PATIENT_CREATE",
  "APPOINTMENT_CREATE",
  "FILE_UPLOAD",
  "SMS_SEND",
  "STAFF_SEAT",
  "FEATURE",
] as const;

type EnforcementAction = (typeof ENFORCEMENT_ACTIONS)[number];

const FEATURE_KEYS = ["REPORTING", "AI_ASSISTANT", "ADVANCED_ANALYTICS", "BILLING"] as const;

@Injectable()
export class BillingEnforcementService {
  constructor(
    private readonly usageMetricsClient: UsageMetricsClient,
    private readonly tenantSubscriptionClient: TenantSubscriptionClient,
  ) {}

  async enforce(input: {
    tenantId: string;
    action: string;
    featureKey?: string;
    quantity?: number;
  }) {
    const tenantId = input.tenantId.trim();
    const action = this.validateAction(input.action);
    const subscription = await this.tenantSubscriptionClient.getSubscription(tenantId);
    const limits = PLAN_LIMITS[subscription?.plan ?? "STARTER"] ?? PLAN_LIMITS.STARTER;

    this.assertSubscriptionActive(subscription?.subscriptionStatus);

    const periodStart = new Date(0);
    const periodEnd = new Date();
    const live = await this.usageMetricsClient.fetchLiveMetrics(tenantId, periodStart, periodEnd);

    switch (action) {
      case "PATIENT_CREATE":
        this.assertUnderLimit((live.patients ?? 0) + 1, limits.maxPatients);
        return { allowed: true };
      case "APPOINTMENT_CREATE":
        this.assertUnderLimit((live.appointments ?? 0) + 1, limits.maxAppointments);
        return { allowed: true };
      case "FILE_UPLOAD": {
        const deltaMb = Math.max(1, Math.ceil((input.quantity ?? 1) / (1024 * 1024)));
        this.assertUnderLimit((live.storageMB ?? 0) + deltaMb, limits.maxStorageMB);
        return { allowed: true };
      }
      case "SMS_SEND":
        this.assertUnderLimit(1, limits.maxSmsSent);
        return { allowed: true };
      case "STAFF_SEAT":
        this.assertUnderLimit((live.staff ?? 0) + 1, limits.maxStaff);
        return { allowed: true };
      case "FEATURE":
        if (!input.featureKey) {
          throw this.usageLimitExceededError("featureKey is required for FEATURE enforcement.");
        }
        this.assertFeatureEnabled(input.featureKey, limits);
        return { allowed: true };
      default:
        return { allowed: true };
    }
  }

  async recordUsage(_tenantId: string, _metric: string, _quantity: number) {
    return { recorded: true };
  }

  private validateAction(value: string): EnforcementAction {
    const action = value.trim().toUpperCase() as EnforcementAction;
    if (!ENFORCEMENT_ACTIONS.includes(action)) {
      throw this.validationError("action", "Invalid enforcement action.");
    }
    return action;
  }

  private assertFeatureEnabled(featureKeyInput: string, limits: PlanLimits) {
    const featureKey = featureKeyInput.trim().toUpperCase();
    if (!FEATURE_KEYS.includes(featureKey as (typeof FEATURE_KEYS)[number])) {
      throw this.validationError("featureKey", "Invalid feature key.");
    }

    const enabled =
      featureKey === "BILLING"
        ? limits.features.billing
        : featureKey === "AI_ASSISTANT"
          ? limits.features.ai
          : limits.features.reporting;

    if (!enabled) {
      throw this.featureNotAvailableError();
    }
  }

  private assertSubscriptionActive(status?: string | null) {
    if (!status) {
      return;
    }

    const normalized = status.toUpperCase();
    if (!["ACTIVE", "TRIALING"].includes(normalized)) {
      throw this.subscriptionInactiveError();
    }
  }

  private assertUnderLimit(nextValue: number, limit: number) {
    if (limit >= 0 && nextValue > limit) {
      throw this.usageLimitExceededError();
    }
  }

  private validationError(field: string, message: string) {
    return new HttpError({
      statusCode: 400,
      code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
      message: "Validation failed.",
      metadata: { error: "VALIDATION_ERROR", fields: [{ field, message }] },
    });
  }

  private subscriptionInactiveError(message = "Your subscription is inactive.") {
    return new HttpError({
      statusCode: 402,
      code: ERROR_CODES.SUBSCRIPTION_BILLING.SUBSCRIPTION_INACTIVE,
      message,
      metadata: { error: "SUBSCRIPTION_INACTIVE" },
    });
  }

  private featureNotAvailableError(message = "This feature is not available on your plan.") {
    return new HttpError({
      statusCode: 402,
      code: ERROR_CODES.SUBSCRIPTION_BILLING.FEATURE_NOT_AVAILABLE,
      message,
      metadata: { error: "FEATURE_NOT_AVAILABLE" },
    });
  }

  private usageLimitExceededError(message = "You have exceeded your plan limits.") {
    return new HttpError({
      statusCode: 402,
      code: ERROR_CODES.SUBSCRIPTION_BILLING.USAGE_LIMIT_EXCEEDED,
      message,
      metadata: { error: "USAGE_LIMIT_EXCEEDED" },
    });
  }
}
