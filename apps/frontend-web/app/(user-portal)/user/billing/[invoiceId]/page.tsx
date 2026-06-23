"use client";

import { ListPage } from "@/components/dashboard/ListPage";
import { UserInvoiceDetail } from "@/components/user-portal/invoice-detail";
import { PageError } from "@/components/patient-portal/page-state";
import { useUserInvoice } from "@/hooks/useUserPortal";

type UserInvoiceDetailPageProps = {
  params: { invoiceId: string };
};

export default function UserInvoiceDetailPage({ params }: UserInvoiceDetailPageProps) {
  const { data, isLoading, isError, refetch } = useUserInvoice(params.invoiceId);

  return (
    <ListPage
      title="Invoice detail"
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      loadingRows={2}
    >
      {data ? <UserInvoiceDetail invoice={data} /> : <PageError message="Invoice not found." />}
    </ListPage>
  );
}
