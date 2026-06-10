"use client";

import { PharmacyFulfillmentList } from "@/components/pharmacy-portal/fulfillment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyFulfillmentOrders } from "@/hooks/usePharmacyPortal";

export default function PharmacyFulfillmentPage() {
  const { data, isLoading, isError, refetch } = usePharmacyFulfillmentOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Medication fulfillment</h1>
        <p className="text-muted-foreground">Track medication preparation and delivery orders.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PharmacyFulfillmentList orders={data ?? []} /> : null}
    </div>
  );
}
