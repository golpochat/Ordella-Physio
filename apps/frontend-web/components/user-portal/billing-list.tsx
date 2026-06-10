"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PortalUserInvoice } from "@/lib/user-portal-types";
import { formatCurrency, formatPortalDate } from "@/lib/user-portal-utils";

export function UserBillingList({ invoices }: { invoices: PortalUserInvoice[] }) {
  if (!invoices.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No billing records</p>
        <p className="mt-2">Your invoices will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Read-only view of your billing history.</p>
      {invoices.map((invoice) => (
        <Card key={invoice.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{invoice.invoiceNumber}</p>
                <Badge>{invoice.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {invoice.dueDate ? `Due ${formatPortalDate(invoice.dueDate)}` : "No due date"}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="font-semibold">{formatCurrency(invoice.total, invoice.currency)}</p>
              <Link
                href={`/user/billing/${invoice.id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View invoice
              </Link>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
