"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PatientInvoice } from "@/lib/patient-portal-types";
import { formatCurrency, formatPatientDate } from "@/lib/patient-portal-utils";

export function BillingList({ invoices }: { invoices: PatientInvoice[] }) {
  if (!invoices.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No billing history</p>
        <p className="mt-2">Invoices from your clinic will appear here.</p>
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
                {invoice.dueDate ? `Due ${formatPatientDate(invoice.dueDate)}` : "No due date"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold">{formatCurrency(invoice.total, invoice.currency)}</p>
              <Link
                href={`/patient/billing/${invoice.id}`}
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
