"use client";

import { Badge } from "@/components/ui/badge";
import { FormErrorBanner } from "@/components/ui/form-feedback";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PortalReadOnlyBadge, PortalRoleGate } from "@/components/navigation/PortalRoleGate";
import { cn } from "@/lib/cn";
import { formatCurrency, formatPatientDate } from "@/lib/patient-portal-utils";
import type { ClinicInvoiceView } from "./types";
import { PdfDownloadButton } from "./pdf-download-button";
import { TenantScopeBanner } from "./tenant-scope-banner";
import { useClinicScope } from "./use-clinic-scope";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

export type InvoiceViewerProps = {
  invoice: ClinicInvoiceView;
  className?: string;
  showTenantBanner?: boolean;
  showPdfDownload?: boolean;
  pdfPath?: string;
};

export function InvoiceViewer({
  invoice,
  className,
  showTenantBanner = true,
  showPdfDownload = true,
  pdfPath,
}: InvoiceViewerProps) {
  const { can, hasTenant, tenantId } = useClinicScope();
  const canRead = can("billing:read");
  const canWrite = can("billing:write");

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  if (invoice.tenantId && tenantId && invoice.tenantId !== tenantId) {
    return <FormErrorBanner>Invoice belongs to a different tenant.</FormErrorBanner>;
  }

  if (!canRead) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        You do not have permission to view invoices.
      </div>
    );
  }

  const paidTotal =
    invoice.payments?.reduce((sum, payment) => sum + Number(payment.amount), 0) ??
    Math.max(0, Number(invoice.total) - Number(invoice.outstanding ?? invoice.total));

  return (
    <div className={cn("space-y-4", className)}>
      {showTenantBanner ? <TenantScopeBanner /> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{invoice.status}</Badge>
          <PortalRoleGate capability="billing:write" fallback={<PortalReadOnlyBadge />}>
            <Badge variant="secondary">Manage billing</Badge>
          </PortalRoleGate>
        </div>
        {showPdfDownload && pdfPath ? (
          <PdfDownloadButton
            service="billing"
            path={pdfPath}
            filename={`${invoice.invoiceNumber}.pdf`}
            label="Download PDF"
            readCapability="billing:read"
          />
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{invoice.invoiceNumber}</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <Field label="Patient" value={invoice.patientName ?? invoice.patientId} />
          <Field
            label="Due date"
            value={invoice.dueDate ? formatPatientDate(invoice.dueDate) : "Not set"}
          />
          {invoice.description ? <Field label="Description" value={invoice.description} /> : null}
          <Field label="Subtotal" value={formatCurrency(invoice.subtotal, invoice.currency)} />
          <Field label="Tax" value={formatCurrency(invoice.tax, invoice.currency)} />
          <Field label="Total" value={formatCurrency(invoice.total, invoice.currency)} />
          <Field label="Paid" value={formatCurrency(paidTotal, invoice.currency)} />
          {invoice.outstanding !== undefined ? (
            <Field label="Outstanding" value={formatCurrency(invoice.outstanding, invoice.currency)} />
          ) : null}
          {!canWrite ? (
            <p className="text-xs text-muted-foreground sm:col-span-2">Billing changes require staff or admin access.</p>
          ) : null}
        </CardBody>
      </Card>

      {invoice.payments?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {invoice.payments.map((payment, index) => (
              <div
                key={payment.id ?? `${payment.reference ?? "payment"}-${index}`}
                className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 text-sm last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{payment.method ?? "Payment"}</p>
                  <p className="text-muted-foreground">
                    {payment.paidAt ? formatPatientDate(payment.paidAt) : "Pending"}
                    {payment.reference ? ` · ${payment.reference}` : ""}
                  </p>
                </div>
                <p>{formatCurrency(payment.amount, invoice.currency)}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
