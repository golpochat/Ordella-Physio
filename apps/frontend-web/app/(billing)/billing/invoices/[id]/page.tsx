"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { AIWorkflowSuggestions } from "@/components/ai/AIWorkflowSuggestions";
import { CopilotEntityProvider } from "@/components/ai/CopilotEntityContext";
import { InvoiceAIInsights } from "@/components/ai/InvoiceAIInsights";
import {
  InvoiceStatusActions,
  InvoiceStatusBadge,
} from "@/components/billing/invoices/InvoiceStatusActions";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoice } from "@/hooks/useClinicPortal";
import { IfHasPermission, WithPermission } from "@/lib/auth/withPermission";
import type { ClinicInvoice } from "@/lib/clinic-portal-types";
import { formatCurrency, formatPortalDateTime } from "@/lib/clinic-portal-utils";

export default function InvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useClinicInvoice(params.id);
  const [invoice, setInvoice] = useState<ClinicInvoice | null>(null);
  const detail = invoice ?? data;
  const canEdit = detail && detail.status !== "PAID" && detail.status !== "VOIDED";

  useEffect(() => {
    if (data) {
      setInvoice(data);
    }
  }, [data]);

  return (
    <WithPermission permission="billing.manage">
      <PageHeader
        title={detail?.invoiceNumber ?? `Invoice ${params.id}`}
        subtitle="Review invoice details and manage lifecycle status."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/billing/invoices">&larr; Back to invoices</Link>
            </Button>
            <IfHasPermission permission="audit.view">
              <Button asChild variant="outline">
                <Link href={`/billing/invoices/${params.id}/audit`}>View audit log</Link>
              </Button>
            </IfHasPermission>
            <IfHasPermission permission="files.view">
              <Button asChild variant="outline">
                <Link href={`/billing/invoices/${params.id}/attachments`}>Attachments</Link>
              </Button>
            </IfHasPermission>
            {canEdit ? (
              <Button asChild variant="outline">
                <Link href={`/billing/invoices/${params.id}/edit`}>Edit invoice</Link>
              </Button>
            ) : null}
          </div>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}

      {detail ? (
        <CopilotEntityProvider entityType="invoice" entityId={detail.id}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <InvoiceStatusBadge status={detail.status} />
            <InvoiceStatusActions invoice={detail} onStatusChange={setInvoice} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-medium">Patient</p>
                <p className="text-muted-foreground">{detail.patientId}</p>
              </div>
              <div>
                <p className="font-medium">Created</p>
                <p className="text-muted-foreground">{formatPortalDateTime(detail.createdAt)}</p>
              </div>
              {detail.issuedAt ? (
                <div>
                  <p className="font-medium">Issued</p>
                  <p className="text-muted-foreground">{formatPortalDateTime(detail.issuedAt)}</p>
                </div>
              ) : null}
              {detail.paidAt ? (
                <div>
                  <p className="font-medium">Paid</p>
                  <p className="text-muted-foreground">{formatPortalDateTime(detail.paidAt)}</p>
                </div>
              ) : null}
              {detail.paymentReference ? (
                <div>
                  <p className="font-medium">Payment reference</p>
                  <p className="text-muted-foreground">{detail.paymentReference}</p>
                </div>
              ) : null}
              <div>
                <p className="font-medium">Subtotal</p>
                <p>{formatCurrency(detail.subtotal, detail.currency)}</p>
              </div>
              <div>
                <p className="font-medium">Tax</p>
                <p>{formatCurrency(detail.tax, detail.currency)}</p>
              </div>
              <div>
                <p className="font-medium">Discount</p>
                <p>{formatCurrency(detail.discount, detail.currency)}</p>
              </div>
              <div>
                <p className="font-medium">Total</p>
                <p className="font-semibold">{formatCurrency(detail.total, detail.currency)}</p>
              </div>
              {detail.notes ? (
                <div className="sm:col-span-2">
                  <p className="font-medium">Notes</p>
                  <p className="text-muted-foreground">{detail.notes}</p>
                </div>
              ) : null}
            </CardBody>
          </Card>

          <InvoiceAIInsights invoiceId={detail.id} patientId={detail.patientId} />
          <AIWorkflowSuggestions
            entityType="invoice"
            entityId={detail.id}
            patientId={detail.patientId}
            invoiceId={detail.id}
          />

          <Card>
            <CardHeader>
              <CardTitle>Line items</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              {(detail.items ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No line items.</p>
              ) : (
                (detail.items ?? []).map((item) => (
                  <div key={item.id} className="rounded-md border p-3 text-sm">
                    <p className="font-medium">{item.description}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} × {formatCurrency(item.unitPrice, detail.currency)} · Tax{" "}
                      {item.taxRate}% · Line total{" "}
                      {formatCurrency(item.lineTotal, detail.currency)}
                    </p>
                  </div>
                ))
              )}
            </CardBody>
          </Card>
        </div>
        </CopilotEntityProvider>
      ) : null}
    </WithPermission>
  );
}
