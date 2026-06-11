"use client";

import { PharmacyBillingList } from "@/components/pharmacy-portal/billing-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePharmacyBilling } from "@/hooks/usePharmacyPortal";

export default function PharmacyBillingPage() {
  const { data, isLoading, isError, refetch } = usePharmacyBilling();

  return (
    <ListPage
      title="Billing"
      subtitle="View patient invoices for pharmacy reference."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <PharmacyBillingList invoices={data ?? []} />
    </ListPage>
  );
}
