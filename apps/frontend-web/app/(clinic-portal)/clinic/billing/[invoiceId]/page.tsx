"use client";

import { ClinicInvoiceDetail } from "@/components/clinic-portal/invoice-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoice } from "@/hooks/useClinicPortal";

type ClinicInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function ClinicInvoiceDetailPage({ params }: ClinicInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicInvoice(params.invoiceId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoice detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <ClinicInvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </div>
  );
}
