"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PharmacyFulfillmentDetail } from "@/components/pharmacy-portal/fulfillment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyFulfillmentOrder } from "@/hooks/usePharmacyPortal";

type PharmacyFulfillmentDetailPageProps = {
  params: { id: string };
};

export default function PharmacyFulfillmentDetailPage({
  params,
}: PharmacyFulfillmentDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyFulfillmentOrder(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/pharmacy/fulfillment">&larr; Back to fulfillment</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PharmacyFulfillmentDetail order={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Fulfillment order not found." /> : null}
    </div>
  );
}
