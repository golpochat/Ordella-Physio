"use client";

import { PharmacyInvoiceDetail } from "@/components/pharmacy-portal/invoice-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyInvoice } from "@/hooks/usePharmacyPortal";

type PharmacyInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function PharmacyInvoiceDetailPage({ params }: PharmacyInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyInvoice(params.invoiceId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoice detail</h1>
      </div>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PharmacyInvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </div>
  );
}
