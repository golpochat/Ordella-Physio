"use client";

import { ClinicInvoiceDetail } from "@/components/clinic-portal/invoice-detail";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicInvoice } from "@/hooks/useClinicPortal";

type ClinicInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function ClinicInvoiceDetailPage({ params }: ClinicInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicInvoice(params.invoiceId);

  return (
    <>
      <PageHeader title="Invoice detail" />

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <ClinicInvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </>
  );
}
