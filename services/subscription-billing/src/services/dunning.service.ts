import { Injectable } from "@nestjs/common";
import { resolveStripeConfig } from "@/config/stripe.config";
import { DunningRecordRepository } from "@/repositories/dunning-record.repository";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { BillingNotificationClient } from "@/integrations/billing-notification.client";
import { StripeService } from "@/services/stripe.service";

const RETRY_DELAYS_MS = [1, 3, 7].map((days) => days * 24 * 60 * 60 * 1000);
const MAX_ATTEMPTS = RETRY_DELAYS_MS.length;

@Injectable()
export class DunningService {
  constructor(
    private readonly dunningRepository: DunningRecordRepository,
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly stripeService: StripeService,
    private readonly billingNotificationClient: BillingNotificationClient,
  ) {}

  async handleFailedPayment(
    tenantId: string,
    contact: { email: string; phone?: string; invoiceId?: string },
  ) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription) {
      return { handled: false };
    }

    await this.subscriptionRepository.update(tenantId, { status: "PAST_DUE" });

    const existing = await this.dunningRepository.findByTenantId(tenantId);
    const attemptCount = (existing?.attemptCount ?? 0) + 1;
    const now = new Date();

    if (attemptCount > MAX_ATTEMPTS) {
      await this.finalizeDunning(tenantId, contact.email);
      return { handled: true, canceled: true, attemptCount };
    }

    const delayMs = RETRY_DELAYS_MS[attemptCount - 1] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]!;
    const nextRetryAt = new Date(now.getTime() + delayMs);

    await this.dunningRepository.upsertActive(tenantId, {
      attemptCount,
      nextRetryAt,
      lastFailedAt: now,
    });

    const config = resolveStripeConfig();
    const portalUrl = subscription.stripeCustomerId
      ? await this.stripeService.getBillingPortalUrl(
          subscription.stripeCustomerId,
          `${config.frontendUrl}/settings/billing/portal`,
        )
      : `${config.frontendUrl}/settings/billing/portal`;

    void this.billingNotificationClient.notifyPaymentFailed(tenantId, {
      email: contact.email,
      phone: contact.phone,
      portalUrl,
    });

    if (contact.invoiceId) {
      void this.scheduleRetry(tenantId, contact.invoiceId, nextRetryAt);
    }

    return { handled: true, attemptCount, nextRetryAt: nextRetryAt.toISOString() };
  }

  async resolveFailedPayment(tenantId: string) {
    const existing = await this.dunningRepository.findByTenantId(tenantId);
    if (!existing) {
      return { resolved: false };
    }

    await this.dunningRepository.resolve(tenantId);
    return { resolved: true };
  }

  async processDueRetries() {
    const due = await this.dunningRepository.listDueRetries(new Date());
    const results = [];

    for (const record of due) {
      const subscription = await this.subscriptionRepository.findByTenantId(record.tenantId);
      if (!subscription?.stripeCustomerId) {
        continue;
      }

      const invoices = await this.stripeService.listInvoices(subscription.stripeCustomerId, 1);
      const openInvoice = invoices.data.find((invoice) => invoice.status === "open");

      if (!openInvoice) {
        if (record.attemptCount >= MAX_ATTEMPTS) {
          await this.finalizeDunning(record.tenantId, "billing@tenant.local");
          results.push({ tenantId: record.tenantId, canceled: true });
        }
        continue;
      }

      try {
        await this.stripeService.retryInvoicePayment(openInvoice.id);
        await this.dunningRepository.resolve(record.tenantId);
        results.push({ tenantId: record.tenantId, retried: true });
      } catch {
        await this.handleFailedPayment(record.tenantId, {
          email: openInvoice.customer_email ?? "billing@tenant.local",
          invoiceId: openInvoice.id,
        });
        results.push({ tenantId: record.tenantId, retried: false });
      }
    }

    return results;
  }

  private async finalizeDunning(tenantId: string, email: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);

    if (subscription?.stripeSubscriptionId) {
      await this.stripeService.cancelSubscription(subscription.stripeSubscriptionId, false);
    }

    await this.subscriptionRepository.update(tenantId, {
      plan: { connect: { id: "plan_free" } },
      status: "CANCELED",
      cancelAtPeriodEnd: false,
      scheduledPlanId: null,
      scheduledChangeAt: null,
    });

    await this.dunningRepository.cancel(tenantId);
    void this.billingNotificationClient.notifySubscriptionCanceled(tenantId, { email });
  }

  private scheduleRetry(tenantId: string, invoiceId: string, nextRetryAt: Date) {
    const delayMs = Math.max(nextRetryAt.getTime() - Date.now(), 0);
    setTimeout(() => {
      void this.stripeService.retryInvoicePayment(invoiceId).catch(() => {
        void this.handleFailedPayment(tenantId, {
          email: "billing@tenant.local",
          invoiceId,
        });
      });
    }, delayMs);
  }
}
