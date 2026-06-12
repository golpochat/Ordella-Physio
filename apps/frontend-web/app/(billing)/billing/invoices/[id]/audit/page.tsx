"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { EntityAuditLogPanel } from "@/components/audit/EntityAuditLogPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoice } from "@/hooks/useClinicPortal";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function InvoiceAuditPage() {
  const params = useParams<{ id: string }>();
  const invoiceQuery = useClinicInvoice(params.id);
  const title = invoiceQuery.data?.invoiceNumber ?? `Invoice ${params.id}`;

  return (
    <WithAllPermissions permissions={["billing.manage", "audit.view"]}>
      <div className="dashboard-page space-y-6">
        <PageHeader
          title={`Audit log — ${title}`}
          subtitle="Immutable activity history for this invoice."
          action={
            <Button asChild variant="ghost">
              <Link href={`/billing/invoices/${params.id}`}>&larr; Back to invoice</Link>
            </Button>
          }
        />

        {invoiceQuery.isLoading ? <PageLoading rows={4} /> : null}
        {invoiceQuery.isError ? <PageError onRetry={() => void invoiceQuery.refetch()} /> : null}
        {!invoiceQuery.isLoading && !invoiceQuery.isError ? (
          <EntityAuditLogPanel entityType="INVOICE" entityId={params.id} />
        ) : null}
      </div>
    </WithAllPermissions>
  );
}
