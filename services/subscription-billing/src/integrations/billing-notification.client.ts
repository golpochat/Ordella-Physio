import { Injectable, Logger } from "@nestjs/common";
import { NotificationProviderHttpClient } from "@ordella/shared";

export type BillingNotificationEvent =
  | "BILLING_PAYMENT_SUCCESS"
  | "BILLING_PAYMENT_FAILED"
  | "BILLING_TRIAL_ENDING"
  | "BILLING_SUBSCRIPTION_CANCELED";

@Injectable()
export class BillingNotificationClient {
  private readonly client = new NotificationProviderHttpClient({
    logger: new Logger(BillingNotificationClient.name),
  });

  async notifyPaymentSucceeded(tenantId: string, input: { email: string; amount: string; invoiceUrl?: string }) {
    await this.safeQueue(tenantId, {
      channel: "EMAIL",
      to: input.email,
      templateId: "BILLING_PAYMENT_SUCCESS",
      subject: "Payment successful",
      variables: {
        amount: input.amount,
        invoiceUrl: input.invoiceUrl ?? "",
      },
    });
  }

  async notifyPaymentFailed(tenantId: string, input: { email: string; phone?: string; portalUrl: string }) {
    await this.safeQueue(tenantId, {
      channel: "EMAIL",
      to: input.email,
      templateId: "BILLING_PAYMENT_FAILED",
      subject: "Payment failed",
      variables: { portalUrl: input.portalUrl },
    });

    if (input.phone) {
      await this.safeQueue(tenantId, {
        channel: "SMS",
        to: input.phone,
        templateId: "BILLING_PAYMENT_FAILED",
        message: "Your Ordella payment failed. Update your payment method to avoid service interruption.",
        variables: { portalUrl: input.portalUrl },
      });
    }
  }

  async notifyTrialEnding(tenantId: string, input: { email: string; trialEndsAt: string }) {
    await this.safeQueue(tenantId, {
      channel: "EMAIL",
      to: input.email,
      templateId: "BILLING_TRIAL_ENDING",
      subject: "Your trial is ending soon",
      variables: { trialEndsAt: input.trialEndsAt },
    });
  }

  async notifySubscriptionCanceled(tenantId: string, input: { email: string }) {
    await this.safeQueue(tenantId, {
      channel: "EMAIL",
      to: input.email,
      templateId: "BILLING_SUBSCRIPTION_CANCELED",
      subject: "Subscription canceled",
      variables: {},
    });
  }

  private async safeQueue(
    tenantId: string,
    payload: Parameters<NotificationProviderHttpClient["queueDelivery"]>[1],
  ) {
    try {
      await this.client.queueDelivery(tenantId, payload);
    } catch (error) {
      Logger.warn(
        `Billing notification failed for tenant ${tenantId}`,
        error instanceof Error ? error.message : error,
      );
    }
  }
}
