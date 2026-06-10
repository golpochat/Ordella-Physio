"use client";

import { UserBillingList } from "@/components/user-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useUserBilling } from "@/hooks/useUserPortal";

export default function UserBillingPage() {
  const { data, isLoading, isError, refetch } = useUserBilling();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">Read-only view of your invoices.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <UserBillingList invoices={data ?? []} /> : null}
    </div>
  );
}
