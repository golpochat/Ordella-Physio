import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiNotesMeteringRepository {
  constructor(private readonly database: DatabaseService) {}

  createUsageRecord(data: Prisma.AiNotesUsageRecordCreateInput) {
    return this.database.aiNotesUsageRecord.create({ data });
  }

  upsertInvoiceItem(data: {
    stripeInvoiceId: string;
    stripeLineItemId: string | null;
    stripeCustomerId: string;
    tenantId: string | null;
    organizationId: string | null;
    billingEntity: string;
    priceId: string;
    quantity: number;
    amountCents: number;
    invoiceStatus: string;
  }) {
    const lineKey = data.stripeLineItemId ?? "aggregate";

    return this.database.aiNotesInvoiceItem.upsert({
      where: {
        stripeInvoiceId_stripeLineItemId: {
          stripeInvoiceId: data.stripeInvoiceId,
          stripeLineItemId: lineKey,
        },
      },
      create: {
        ...data,
        stripeLineItemId: lineKey,
      },
      update: {
        quantity: data.quantity,
        amountCents: data.amountCents,
        invoiceStatus: data.invoiceStatus,
        verifiedAt: new Date(),
      },
    });
  }

  countUsageRecords() {
    return this.database.aiNotesUsageRecord.count();
  }

  sumVerifiedInvoiceRevenueCents() {
    return this.database.aiNotesInvoiceItem.aggregate({
      _sum: { amountCents: true },
      _count: { id: true },
    });
  }

  updateTenantAiNotesSubscriptionItemId(tenantId: string, subscriptionItemId: string) {
    return this.database.tenantBillingAccount.update({
      where: { tenantId },
      data: { stripeAiNotesSubscriptionItemId: subscriptionItemId },
    });
  }

  updateOrganizationAiNotesSubscriptionItemId(organizationId: string, subscriptionItemId: string) {
    return this.database.organizationBillingAccount.update({
      where: { organizationId },
      data: { stripeAiNotesSubscriptionItemId: subscriptionItemId },
    });
  }
}
