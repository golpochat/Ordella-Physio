import type { InvoiceWithRelations } from "./billing.types";

export function mapInvoiceBalance(invoice: InvoiceWithRelations, paidTotal: number) {
  const total = Number(invoice.total);
  const outstanding = Math.max(0, total - paidTotal);

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    currency: invoice.currency,
    total,
    paid: paidTotal,
    outstanding,
    isFullyPaid: outstanding <= 0 && paidTotal > 0,
  };
}

export function enrichInvoiceWithBalance(invoice: InvoiceWithRelations, paidTotal: number) {
  return {
    ...invoice,
    subtotal: Number(invoice.subtotal),
    tax: Number(invoice.tax),
    total: Number(invoice.total),
    balance: mapInvoiceBalance(invoice, paidTotal),
    payments: invoice.payments.map((payment) => ({
      ...payment,
      amount: Number(payment.amount),
    })),
  };
}
