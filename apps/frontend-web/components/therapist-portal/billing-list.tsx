"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { TherapistInvoice } from "@/lib/therapist-portal-types";
import { formatCurrency, formatPortalDate } from "@/lib/therapist-portal-utils";

export function TherapistBillingList({ invoices }: { invoices: TherapistInvoice[] }) {
  if (!invoices.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No billing records</p>
        <p className="mt-2">Patient invoices will appear here for reference.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">View only — billing changes are managed by clinic admin.</p>
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
            <p className="font-semibold">{formatCurrency(invoice.total, invoice.currency)}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
