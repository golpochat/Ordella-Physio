"use client";

import { UserInvoiceDetail } from "@/components/user-portal/invoice-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useUserInvoice } from "@/hooks/useUserPortal";

type UserInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function UserInvoiceDetailPage({ params }: UserInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = useUserInvoice(params.invoiceId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoice detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <UserInvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </div>
  );
}
