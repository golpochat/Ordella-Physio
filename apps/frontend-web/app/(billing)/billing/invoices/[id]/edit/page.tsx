"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { InvoiceEditForm } from "@/components/billing/invoices/InvoiceEditForm";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoice } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";

export default function InvoiceEditPage() {
  const params = useParams<{ id: string }>();
  const invoiceId = params.id;
  const { data, isLoading, isError, refetch } = useClinicInvoice(invoiceId);

  return (
    <WithPermission permission="billing.manage">
      <PageHeader
        title="Edit invoice"
        subtitle="Update invoice details, line items, and status."
        action={
          <Button asChild variant="ghost">
            <Link href={`/billing/invoices/${invoiceId}`}>&larr; Back to invoice</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? (
        <InvoiceEditForm invoice={data} items={data.items ?? []} />
      ) : null}
    </WithPermission>
  );
}
