"use client";

import { ListPage } from "@/components/dashboard/ListPage";
import { UserBillingList } from "@/components/user-portal/billing-list";
import { useUserBilling } from "@/hooks/useUserPortal";

export default function UserBillingPage() {
  const { data, isLoading, isError, refetch } = useUserBilling();

  return (
    <ListPage
      title="Billing"
      subtitle="Read-only view of your invoices."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <UserBillingList invoices={data ?? []} />
    </ListPage>
  );
}
