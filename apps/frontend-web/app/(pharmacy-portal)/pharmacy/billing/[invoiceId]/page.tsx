"use client";

import { PharmacyInvoiceDetail } from "@/components/pharmacy-portal/invoice-detail";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyInvoice } from "@/hooks/usePharmacyPortal";

type PharmacyInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function PharmacyInvoiceDetailPage({ params }: PharmacyInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyInvoice(params.invoiceId);

  return (
    <>
      <PageHeader title="Invoice detail" />

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PharmacyInvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </>
  );
}
