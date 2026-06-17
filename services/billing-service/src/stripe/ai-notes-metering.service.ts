import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { billingConfig } from "@ordella/config";
import { isOrganizationLevelBilling } from "@ordella/shared";
import type Stripe from "stripe";
import { BillingTruthClient } from "@/stripe/billing-truth.client";
import { AiNotesMeteringRepository } from "@/stripe/ai-notes-metering.repository";
import { StripeBillingRepository } from "@/stripe/stripe-billing.repository";
import { StripeClient } from "@/stripe/stripe.client";
import { isAiNotesPrice } from "@/stripe/stripe-platform-metrics.utils";

type BillingEntity = "tenant" | "organization";

type ResolvedMeteringAccount = {
  entity: BillingEntity;
  tenantId: string;
  organizationId?: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  cachedSubscriptionItemId?: string | null;
};

@Injectable()
export class AiNotesMeteringService {
  private readonly logger = new Logger(AiNotesMeteringService.name);

  constructor(
    private readonly stripeClient: StripeClient,
    private readonly billingRepository: StripeBillingRepository,
    private readonly meteringRepository: AiNotesMeteringRepository,
    private readonly billingTruthClient: BillingTruthClient,
  ) {}

  async recordRealtimeUsage(tenantId: string, quantity = 1): Promise<{
    synced: true;
    tenantId: string;
    quantity: number;
    billedTo: BillingEntity;
    stripeUsageRecordIds: string[];
  }> {
    const resolved = await this.resolveMeteringAccount(tenantId);
    const events = Math.max(1, quantity);

    if (this.stripeClient.isMockMode()) {
      const aiNotesPriceId =
        billingConfig.stripePriceAiNotes ??
        process.env.STRIPE_PRICE_AI_NOTES ??
        "price_e2e_ai_notes_mock";
      const subscriptionItemId =
        resolved.cachedSubscriptionItemId ?? `si_mock_ai_${resolved.tenantId.slice(0, 18)}`;
      const usageRecordIds: string[] = [];

      for (let index = 0; index < events; index += 1) {
        const mockUsageRecordId = `ur_mock_${resolved.tenantId}_${Date.now()}_${index}`;
        usageRecordIds.push(mockUsageRecordId);

        await this.meteringRepository.createUsageRecord({
          tenantId: resolved.tenantId,
          organizationId: resolved.organizationId ?? null,
          billingEntity: resolved.entity,
          stripeCustomerId: resolved.stripeCustomerId,
          stripeSubscriptionId: resolved.stripeSubscriptionId,
          stripeSubscriptionItemId: subscriptionItemId,
          stripeUsageRecordId: mockUsageRecordId,
          quantity: 1,
        });
      }

      await this.persistSubscriptionItemId(resolved, subscriptionItemId);
      this.logger.log(
        `Recorded ${events} mock AI notes usage event(s) for tenant ${tenantId} (Stripe mock mode)`,
      );

      return {
        synced: true,
        tenantId,
        quantity: events,
        billedTo: resolved.entity,
        stripeUsageRecordIds: usageRecordIds,
      };
    }

    const aiNotesPriceId = billingConfig.stripePriceAiNotes ?? process.env.STRIPE_PRICE_AI_NOTES;
    if (!aiNotesPriceId) {
      throw new BadRequestException("STRIPE_PRICE_AI_NOTES is not configured");
    }

    const subscriptionItemId = await this.ensureAiNotesSubscriptionItem(resolved, aiNotesPriceId);
    const stripe = this.stripeClient.getClient();
    const usageRecordIds: string[] = [];

    for (let index = 0; index < events; index += 1) {
      const usageRecord = await stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
        quantity: 1,
        timestamp: Math.floor(Date.now() / 1000),
        action: "increment",
      });

      usageRecordIds.push(usageRecord.id);

      await this.meteringRepository.createUsageRecord({
        tenantId: resolved.tenantId,
        organizationId: resolved.organizationId ?? null,
        billingEntity: resolved.entity,
        stripeCustomerId: resolved.stripeCustomerId,
        stripeSubscriptionId: resolved.stripeSubscriptionId,
        stripeSubscriptionItemId: subscriptionItemId,
        stripeUsageRecordId: usageRecord.id,
        quantity: 1,
      });
    }

    await this.verifyUpcomingInvoice(resolved.stripeCustomerId, aiNotesPriceId);

    return {
      synced: true,
      tenantId,
      quantity: events,
      billedTo: resolved.entity,
      stripeUsageRecordIds: usageRecordIds,
    };
  }

  async verifyAndStoreInvoiceAiNotesLines(invoice: Stripe.Invoice): Promise<number> {
    const aiNotesPriceId = billingConfig.stripePriceAiNotes ?? process.env.STRIPE_PRICE_AI_NOTES;
    if (!aiNotesPriceId) {
      return 0;
    }

    const customerId = this.resolveCustomerId(invoice.customer);
    if (!customerId) {
      return 0;
    }

    const entity = await this.resolveEntityByCustomerId(customerId);
    if (!entity) {
      return 0;
    }

    const stripe = this.stripeClient.getClient();
    const fullInvoice = invoice.lines?.data?.length
      ? invoice
      : await stripe.invoices.retrieve(invoice.id, { expand: ["lines.data.price"] });

    let stored = 0;
    for (const line of fullInvoice.lines?.data ?? []) {
      const priceId =
        typeof line.price === "string" ? line.price : (line.price as Stripe.Price | null)?.id;
      const metadata = line.metadata ?? {};
      const isAiNotesLine =
        metadata.usageType === "ai_notes" || isAiNotesPrice(priceId, aiNotesPriceId);

      if (!isAiNotesLine) {
        continue;
      }

      await this.meteringRepository.upsertInvoiceItem({
        stripeInvoiceId: fullInvoice.id,
        stripeLineItemId: line.id,
        stripeCustomerId: customerId,
        tenantId: entity.tenantId,
        organizationId: entity.organizationId,
        billingEntity: entity.entity,
        priceId: priceId ?? aiNotesPriceId,
        quantity: line.quantity ?? 0,
        amountCents: line.amount ?? 0,
        invoiceStatus: fullInvoice.status ?? "unknown",
      });
      stored += 1;
    }

    return stored;
  }

  async getAiNotesMetricsSummary() {
    const [usageCount, invoiceAggregate] = await Promise.all([
      this.meteringRepository.countUsageRecords(),
      this.meteringRepository.sumVerifiedInvoiceRevenueCents(),
    ]);

    return {
      aiNotesUsageCount: usageCount,
      aiNotesRevenue: invoiceAggregate._sum.amountCents ?? 0,
      aiNotesInvoiceItems: invoiceAggregate._count.id ?? 0,
    };
  }

  private async verifyUpcomingInvoice(customerId: string, aiNotesPriceId: string) {
    const stripe = this.stripeClient.getClient();

    try {
      const preview = await stripe.invoices.retrieveUpcoming({
        customer: customerId,
        expand: ["lines.data.price"],
      });

      const hasAiNotesLine = (preview.lines?.data ?? []).some((line) => {
        const priceId =
          typeof line.price === "string" ? line.price : (line.price as Stripe.Price | null)?.id;
        return isAiNotesPrice(priceId, aiNotesPriceId);
      });

      if (!hasAiNotesLine) {
        this.logger.warn(
          `Upcoming invoice preview for customer ${customerId} is missing AI Notes metered line`,
        );
        return;
      }

      this.logger.log(
        `Upcoming invoice preview verified AI Notes metered line for customer ${customerId}`,
      );
    } catch (error) {
      this.logger.warn(
        `Unable to verify upcoming invoice preview for ${customerId}: ${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }

  private async ensureAiNotesSubscriptionItem(
    resolved: ResolvedMeteringAccount,
    aiNotesPriceId: string,
  ): Promise<string> {
    if (resolved.cachedSubscriptionItemId) {
      return resolved.cachedSubscriptionItemId;
    }

    const stripe = this.stripeClient.getClient();
    const subscription = await stripe.subscriptions.retrieve(resolved.stripeSubscriptionId, {
      expand: ["items.data.price"],
    });

    const existing = subscription.items.data.find((item) =>
      isAiNotesPrice(item.price?.id, aiNotesPriceId),
    );
    if (existing) {
      await this.persistSubscriptionItemId(resolved, existing.id);
      return existing.id;
    }

    const created = await stripe.subscriptionItems.create({
      subscription: resolved.stripeSubscriptionId,
      price: aiNotesPriceId,
      metadata: {
        usageType: "ai_notes",
        tenantId: resolved.tenantId,
        ...(resolved.organizationId ? { organizationId: resolved.organizationId } : {}),
      },
    });

    await this.persistSubscriptionItemId(resolved, created.id);
    return created.id;
  }

  private async persistSubscriptionItemId(
    resolved: ResolvedMeteringAccount,
    subscriptionItemId: string,
  ) {
    if (resolved.entity === "organization" && resolved.organizationId) {
      await this.meteringRepository.updateOrganizationAiNotesSubscriptionItemId(
        resolved.organizationId,
        subscriptionItemId,
      );
      return;
    }

    await this.meteringRepository.updateTenantAiNotesSubscriptionItemId(
      resolved.tenantId,
      subscriptionItemId,
    );
  }

  private async resolveMeteringAccount(tenantId: string): Promise<ResolvedMeteringAccount> {
    const context = await this.billingTruthClient.getContext(tenantId);
    if (!context) {
      throw new NotFoundException("Billing context not found for tenant");
    }

    if (isOrganizationLevelBilling(context.billingModel)) {
      if (!context.organizationId) {
        throw new BadRequestException("Organization is required for organization-level billing");
      }

      const account = await this.billingRepository.findOrganizationAccountByOrganizationId(
        context.organizationId,
      );
      if (!account?.subscription) {
        throw new BadRequestException("Active organization Stripe subscription required");
      }

      return {
        entity: "organization",
        tenantId,
        organizationId: context.organizationId,
        stripeCustomerId: account.stripeCustomerId,
        stripeSubscriptionId: account.subscription.stripeSubscriptionId,
        cachedSubscriptionItemId: account.stripeAiNotesSubscriptionItemId,
      };
    }

    const account = await this.billingRepository.findAccountByTenantId(tenantId);
    if (!account?.subscription) {
      throw new BadRequestException("Active tenant Stripe subscription required");
    }

    return {
      entity: "tenant",
      tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: account.subscription.stripeSubscriptionId,
      cachedSubscriptionItemId: account.stripeAiNotesSubscriptionItemId,
    };
  }

  private async resolveEntityByCustomerId(customerId: string): Promise<{
    entity: BillingEntity;
    tenantId: string | null;
    organizationId: string | null;
  } | null> {
    const tenantAccount = await this.billingRepository.findAccountByStripeCustomerId(customerId);
    if (tenantAccount) {
      return {
        entity: "tenant",
        tenantId: tenantAccount.tenantId,
        organizationId: null,
      };
    }

    const orgAccount =
      await this.billingRepository.findOrganizationAccountByStripeCustomerId(customerId);
    if (orgAccount) {
      return {
        entity: "organization",
        tenantId: null,
        organizationId: orgAccount.organizationId,
      };
    }

    return null;
  }

  private resolveCustomerId(
    customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined,
  ): string {
    if (!customer) return "";
    return typeof customer === "string" ? customer : customer.id;
  }
}
