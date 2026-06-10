"use client";

import { StaffInvoiceDetail } from "@/components/staff-portal/invoice-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffInvoice } from "@/hooks/useStaffPortal";

type StaffInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function StaffInvoiceDetailPage({ params }: StaffInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = useStaffInvoice(params.invoiceId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoice detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <StaffInvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </div>
  );
}
