"use client";

import { StaffBillingList } from "@/components/staff-portal/billing-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useStaffBilling } from "@/hooks/useStaffPortal";

export default function StaffBillingPage() {
  const { data, isLoading, isError, refetch } = useStaffBilling();

  return (
    <ListPage
      title="Billing"
      subtitle="View patient invoices for front-desk reference."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <StaffBillingList invoices={data ?? []} />
    </ListPage>
  );
}
