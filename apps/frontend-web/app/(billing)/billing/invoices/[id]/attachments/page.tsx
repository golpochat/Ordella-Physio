"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FileList } from "@/components/files/FileList";
import { FileUploadField } from "@/components/files/FileUploadField";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoice } from "@/hooks/useClinicPortal";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function InvoiceAttachmentsPage() {
  const params = useParams<{ id: string }>();
  const invoiceQuery = useClinicInvoice(params.id);
  const [fileListKey, setFileListKey] = useState(0);
  const title = invoiceQuery.data?.invoiceNumber ?? `Invoice ${params.id}`;

  return (
    <WithAllPermissions permissions={["billing.manage", "files.view"]}>
      <div className="dashboard-page space-y-6">
        <PageHeader
          title={`Attachments — ${title}`}
          subtitle="Supporting documents for this invoice."
          action={
            <Button asChild variant="ghost">
              <Link href={`/billing/invoices/${params.id}`}>&larr; Back to invoice</Link>
            </Button>
          }
        />

        {invoiceQuery.isLoading ? <PageLoading rows={4} /> : null}
        {invoiceQuery.isError ? <PageError onRetry={() => void invoiceQuery.refetch()} /> : null}

        {!invoiceQuery.isLoading && !invoiceQuery.isError ? (
          <>
            <WithAllPermissions permissions={["files.upload"]}>
              <FileUploadField
                entityType="INVOICE"
                entityId={params.id}
                onUploaded={() => setFileListKey((value) => value + 1)}
              />
            </WithAllPermissions>

            <FileList key={fileListKey} entityType="INVOICE" entityId={params.id} />
          </>
        ) : null}
      </div>
    </WithAllPermissions>
  );
}
