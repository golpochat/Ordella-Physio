import { Injectable } from "@nestjs/common";
import type { Prisma, StripeSubscriptionStatus } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class StripeBillingRepository {
  constructor(private readonly database: DatabaseService) {}

  findAccountByTenantId(tenantId: string) {
    return this.database.tenantBillingAccount.findUnique({
      where: { tenantId },
      include: { subscription: true },
    });
  }

  findAccountByStripeCustomerId(stripeCustomerId: string) {
    return this.database.tenantBillingAccount.findUnique({
      where: { stripeCustomerId },
      include: { subscription: true },
    });
  }

  createAccount(data: Prisma.TenantBillingAccountCreateInput) {
    return this.database.tenantBillingAccount.create({ data });
  }

  updateAccount(tenantId: string, data: Prisma.TenantBillingAccountUpdateInput) {
    return this.database.tenantBillingAccount.update({ where: { tenantId }, data });
  }

  upsertSubscription(
    tenantBillingId: string,
    data: Omit<Prisma.TenantStripeSubscriptionUncheckedCreateInput, "tenantBillingId">,
  ) {
    return this.database.tenantStripeSubscription.upsert({
      where: { tenantBillingId },
      create: { tenantBillingId, ...data },
      update: {
        stripeSubscriptionId: data.stripeSubscriptionId,
        stripePriceId: data.stripePriceId,
        plan: data.plan,
        status: data.status,
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
        canceledAt: data.canceledAt,
      },
    });
  }

  deleteSubscription(tenantBillingId: string) {
    return this.database.tenantStripeSubscription.deleteMany({ where: { tenantBillingId } });
  }

  recordWebhookEvent(stripeEventId: string, eventType: string) {
    return this.database.stripeWebhookEvent.create({
      data: { stripeEventId, eventType },
    });
  }

  hasWebhookEvent(stripeEventId: string) {
    return this.database.stripeWebhookEvent.findUnique({ where: { stripeEventId } });
  }

  mapStripeStatus(status: string): StripeSubscriptionStatus {
    const normalized = status.toUpperCase().replace(/-/g, "_");
    const allowed: StripeSubscriptionStatus[] = [
      "ACTIVE",
      "TRIALING",
      "PAST_DUE",
      "CANCELED",
      "UNPAID",
      "INCOMPLETE",
      "INCOMPLETE_EXPIRED",
      "PAUSED",
    ];
    return allowed.includes(normalized as StripeSubscriptionStatus)
      ? (normalized as StripeSubscriptionStatus)
      : "ACTIVE";
  }
}
