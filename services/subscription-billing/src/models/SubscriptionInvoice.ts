import type { SubscriptionInvoice as SubscriptionInvoiceModel } from "@/generated/prisma";

export type { SubscriptionInvoiceModel as SubscriptionInvoiceRecord };

export type SubscriptionInvoiceResponse = {
  id: string;
  tenantId: string;
  stripeInvoiceId: string;
  amountDue: number;
  amountPaid: number;
  currency: string;
  status: string;
  periodStart: string | null;
  periodEnd: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  paidAt: string | null;
  createdAt: string;
};

export function toSubscriptionInvoiceResponse(
  record: SubscriptionInvoiceModel,
): SubscriptionInvoiceResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    stripeInvoiceId: record.stripeInvoiceId,
    amountDue: record.amountDue,
    amountPaid: record.amountPaid,
    currency: record.currency,
    status: record.status,
    periodStart: record.periodStart?.toISOString() ?? null,
    periodEnd: record.periodEnd?.toISOString() ?? null,
    hostedInvoiceUrl: record.hostedInvoiceUrl,
    invoicePdf: record.invoicePdf,
    paidAt: record.paidAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
  };
}
