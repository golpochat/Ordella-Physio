"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { ClinicInvoice } from "@/lib/clinic-portal-types";
import { formatCurrency, formatPortalDate } from "@/lib/clinic-portal-utils";

export function ClinicBillingList({ invoices }: { invoices: ClinicInvoice[] }) {
  if (!invoices.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No invoices found</p>
        <p className="mt-2">Patient billing records will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice) => (
        <Card key={invoice.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{invoice.invoiceNumber}</p>
                <Badge>{invoice.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Patient: {invoice.patientId}
                {invoice.dueDate ? ` · Due ${formatPortalDate(invoice.dueDate)}` : ""}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="font-semibold">{formatCurrency(invoice.total, invoice.currency)}</p>
              <Link
                href={`/clinic/billing/${invoice.id}`}
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
