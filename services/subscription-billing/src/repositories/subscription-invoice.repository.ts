import { Injectable } from "@nestjs/common";
import type { InvoiceStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class SubscriptionInvoiceRepository {
  constructor(private readonly database: DatabaseService) {}

  upsertByStripeInvoiceId(data: {
    tenantId: string;
    stripeInvoiceId: string;
    amountDue: number;
    amountPaid: number;
    currency: string;
    status: InvoiceStatus;
    periodStart?: Date | null;
    periodEnd?: Date | null;
    hostedInvoiceUrl?: string | null;
    invoicePdf?: string | null;
    paidAt?: Date | null;
  }) {
    return this.database.subscriptionInvoice.upsert({
      where: { stripeInvoiceId: data.stripeInvoiceId },
      create: data,
      update: data,
    });
  }

  listByTenantId(tenantId: string) {
    return this.database.subscriptionInvoice.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  listAll(where?: Prisma.SubscriptionInvoiceWhereInput) {
    return this.database.subscriptionInvoice.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }
}
