export type SubscriptionEnforcementAction =
  | "PATIENT_CREATE"
  | "APPOINTMENT_CREATE"
  | "FILE_UPLOAD"
  | "SMS_SEND"
  | "STAFF_SEAT"
  | "FEATURE";

export type SubscriptionEnforceInput = {
  tenantId: string;
  action: SubscriptionEnforcementAction;
  featureKey?: string;
  quantity?: number;
};

export type SubscriptionBillingClientOptions = {
  baseUrl?: string;
  logger?: Pick<Console, "warn">;
  failOpen?: boolean;
};

export class SubscriptionBillingHttpClient {
  private readonly baseUrl: string;
  private readonly logger: Pick<Console, "warn">;
  private readonly failOpen: boolean;

  constructor(options: SubscriptionBillingClientOptions = {}) {
    this.baseUrl = (
      options.baseUrl ??
      process.env.SUBSCRIPTION_BILLING_SERVICE_URL ??
      "http://localhost:3074"
    ).replace(/\/$/, "");
    this.logger = options.logger ?? console;
    this.failOpen = options.failOpen ?? process.env.NODE_ENV !== "production";
  }

  async enforce(input: SubscriptionEnforceInput): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/subscription-billing/internal/enforce`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: { message?: string; metadata?: { error?: string } };
        } | null;
        const message = body?.error?.message ?? `Subscription enforcement failed (${response.status})`;
        const code = body?.error?.metadata?.error;
        const error = new Error(message) as Error & { code?: string; statusCode?: number };
        error.code = code;
        error.statusCode = response.status;
        throw error;
      }
    } catch (error) {
      if (!this.failOpen) {
        throw error;
      }
      this.logger.warn(
        `Subscription enforcement skipped for ${input.action}`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  async recordUsage(tenantId: string, metric: string, quantity = 1): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/subscription-billing/internal/usage`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ tenantId, metric, quantity }),
      });
    } catch (error) {
      this.logger.warn(
        `Usage record failed for ${metric}`,
        error instanceof Error ? error.message : error,
      );
    }
  }
}
