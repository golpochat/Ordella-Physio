"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InvoiceDetail } from "@/components/patient-portal/invoice-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientInvoice } from "@/hooks/usePatientPortal";

type PatientInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function PatientInvoiceDetailPage({ params }: PatientInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePatientInvoice(params.invoiceId);

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/patient/billing">&larr; Back to billing</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <InvoiceDetail invoice={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Invoice not found." /> : null}
    </>
  );
}
