import { Injectable } from "@nestjs/common";
import type Stripe from "stripe";
import { BillingNotificationClient } from "@/integrations/billing-notification.client";
import { InvoiceSyncService } from "@/services/invoice-sync.service";
import { SubscriptionService } from "@/services/subscription.service";

@Injectable()
export class StripeWebhookService {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly invoiceSyncService: InvoiceSyncService,
    private readonly billingNotificationClient: BillingNotificationClient,
  ) {}

  async handleEvent(event: Stripe.Event) {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        return this.subscriptionService.handleSubscriptionStripeEvent(event);
      case "customer.subscription.trial_will_end":
        return this.handleTrialWillEnd(event);
      case "invoice.created":
      case "invoice.finalized":
      case "invoice.payment_succeeded":
      case "invoice.payment_failed":
      case "invoice.upcoming":
        return this.invoiceSyncService.handleStripeInvoiceEvent(event);
      default:
        return { received: true, ignored: event.type };
    }
  }

  private async handleTrialWillEnd(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription;
    const tenantId = subscription.metadata?.tenantId;
    if (!tenantId || !subscription.trial_end) {
      return { received: true, skipped: "missing trial metadata" };
    }

    void this.billingNotificationClient.notifyTrialEnding(tenantId, {
      email: "billing@tenant.local",
      trialEndsAt: new Date(subscription.trial_end * 1000).toISOString(),
    });

    return { received: true, notified: true };
  }
}
