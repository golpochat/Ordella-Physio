"use client";

import { StaffBillingList } from "@/components/staff-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffBilling } from "@/hooks/useStaffPortal";

export default function StaffBillingPage() {
  const { data, isLoading, isError, refetch } = useStaffBilling();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">View patient invoices for front-desk reference.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <StaffBillingList invoices={data ?? []} /> : null}
    </div>
  );
}
