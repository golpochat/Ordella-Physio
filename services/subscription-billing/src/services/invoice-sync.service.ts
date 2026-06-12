import { Injectable } from "@nestjs/common";
import type Stripe from "stripe";
import { toSubscriptionInvoiceResponse } from "@/models/SubscriptionInvoice";
import { SubscriptionInvoiceRepository } from "@/repositories/subscription-invoice.repository";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { BillingNotificationClient } from "@/integrations/billing-notification.client";
import { DunningService } from "@/services/dunning.service";
import { StripeService } from "@/services/stripe.service";
import { resolveStripeConfig } from "@/config/stripe.config";

@Injectable()
export class InvoiceSyncService {
  constructor(
    private readonly invoiceRepository: SubscriptionInvoiceRepository,
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly stripeService: StripeService,
    private readonly dunningService: DunningService,
    private readonly billingNotificationClient: BillingNotificationClient,
  ) {}

  async syncInvoice(stripeInvoice: Stripe.Invoice, eventType?: string) {
    const subscriptionId =
      typeof stripeInvoice.subscription === "string"
        ? stripeInvoice.subscription
        : stripeInvoice.subscription?.id;

    const subscription = subscriptionId
      ? await this.subscriptionRepository.findByStripeSubscriptionId(subscriptionId)
      : null;

    if (!subscription) {
      return { synced: false, reason: "subscription_not_found" };
    }

    const record = await this.invoiceRepository.upsertByStripeInvoiceId({
      tenantId: subscription.tenantId,
      stripeInvoiceId: stripeInvoice.id,
      amountDue: stripeInvoice.amount_due ?? 0,
      amountPaid: stripeInvoice.amount_paid ?? 0,
      currency: (stripeInvoice.currency ?? "eur").toUpperCase(),
      status: this.stripeService.mapInvoiceStatus(stripeInvoice.status),
      periodStart: stripeInvoice.period_start
        ? new Date(stripeInvoice.period_start * 1000)
        : null,
      periodEnd: stripeInvoice.period_end ? new Date(stripeInvoice.period_end * 1000) : null,
      hostedInvoiceUrl: stripeInvoice.hosted_invoice_url ?? null,
      invoicePdf: stripeInvoice.invoice_pdf ?? null,
      paidAt:
        stripeInvoice.status === "paid" && stripeInvoice.status_transitions?.paid_at
          ? new Date(stripeInvoice.status_transitions.paid_at * 1000)
          : null,
    });

    if (stripeInvoice.period_start && stripeInvoice.period_end) {
      await this.subscriptionRepository.update(subscription.tenantId, {
        currentPeriodStart: new Date(stripeInvoice.period_start * 1000),
        currentPeriodEnd: new Date(stripeInvoice.period_end * 1000),
      });
    }

    if (eventType === "invoice.payment_succeeded") {
      await this.subscriptionRepository.update(subscription.tenantId, {
        status: "ACTIVE",
      });
      await this.dunningService.resolveFailedPayment(subscription.tenantId);
      void this.billingNotificationClient.notifyPaymentSucceeded(subscription.tenantId, {
        email: stripeInvoice.customer_email ?? "billing@tenant.local",
        amount: this.formatAmount(stripeInvoice.amount_paid ?? 0, stripeInvoice.currency ?? "eur"),
        invoiceUrl: stripeInvoice.hosted_invoice_url ?? undefined,
      });
    }

    if (eventType === "invoice.payment_failed") {
      await this.dunningService.handleFailedPayment(subscription.tenantId, {
        email: stripeInvoice.customer_email ?? "billing@tenant.local",
        invoiceId: stripeInvoice.id,
      });
    }

    return { synced: true, invoice: toSubscriptionInvoiceResponse(record) };
  }

  async syncAllInvoices(tenantId: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription?.stripeCustomerId) {
      return [];
    }

    const response = await this.stripeService.listInvoices(subscription.stripeCustomerId);
    const synced = [];

    for (const invoice of response.data) {
      const result = await this.syncInvoice(invoice);
      if (result.synced && result.invoice) {
        synced.push(result.invoice);
      }
    }

    return synced;
  }

  async listTenantInvoices(tenantId: string) {
    const records = await this.invoiceRepository.listByTenantId(tenantId);
    return records.map(toSubscriptionInvoiceResponse);
  }

  async handleStripeInvoiceEvent(event: Stripe.Event) {
    const invoice = event.data.object as Stripe.Invoice;
    return this.syncInvoice(invoice, event.type);
  }

  private formatAmount(cents: number, currency: string) {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  }
}
