"use client";

import type { SubscriptionInvoice } from "@/lib/subscription-billing-types";

type InvoiceTableProps = {
  invoices: SubscriptionInvoice[];
};

function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }
  return new Intl.DateTimeFormat("en-IE", { dateStyle: "medium" }).format(new Date(value));
}

function statusClass(status: string) {
  switch (status) {
    case "PAID":
      return "text-emerald-600";
    case "OPEN":
      return "text-amber-600";
    case "UNCOLLECTIBLE":
    case "VOID":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  if (!invoices.length) {
    return <p className="text-sm text-muted-foreground">No invoices synced yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Amount</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Download</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-border/60">
              <td className="py-2 pr-4">{formatDate(invoice.paidAt ?? invoice.createdAt)}</td>
              <td className="py-2 pr-4">
                {formatCurrency(invoice.amountPaid || invoice.amountDue, invoice.currency)}
              </td>
              <td className={`py-2 pr-4 capitalize ${statusClass(invoice.status)}`}>
                {invoice.status.toLowerCase()}
              </td>
              <td className="py-2 pr-4">
                {invoice.invoicePdf || invoice.hostedInvoiceUrl ? (
                  <a
                    href={invoice.invoicePdf ?? invoice.hostedInvoiceUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    PDF
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
