"use client";

import { PharmacyFulfillmentList } from "@/components/pharmacy-portal/fulfillment-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePharmacyFulfillmentOrders } from "@/hooks/usePharmacyPortal";

export default function PharmacyFulfillmentPage() {
  const { data, isLoading, isError, refetch } = usePharmacyFulfillmentOrders();

  return (
    <ListPage
      title="Medication fulfillment"
      subtitle="Track medication preparation and delivery orders."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <PharmacyFulfillmentList orders={data ?? []} />
    </ListPage>
  );
}
