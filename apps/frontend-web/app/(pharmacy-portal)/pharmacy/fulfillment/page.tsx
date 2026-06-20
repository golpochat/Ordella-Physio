"use client";

import { useState } from "react";
import { PharmacyFulfillmentList } from "@/components/pharmacy-portal/fulfillment-list";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePharmacyFulfillmentOrders } from "@/hooks/usePharmacyPortal";
import type { FulfillmentStatus } from "@/lib/clinic-pharmacy-types";

const FULFILLMENT_FILTERS: Array<{ value: FulfillmentStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All orders" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "FAILED", label: "Failed" },
];

export default function PharmacyFulfillmentPage() {
  const [statusFilter, setStatusFilter] = useState<FulfillmentStatus | "ALL">("ALL");
  const queryFilters =
    statusFilter === "ALL" ? undefined : { fulfillmentStatus: statusFilter };
  const { data, isLoading, isError, refetch } = usePharmacyFulfillmentOrders(queryFilters);

  return (
    <ListPage
      title="Medication fulfillment"
      subtitle="Track medication preparation and delivery orders."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <div className="mb-4">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as FulfillmentStatus | "ALL")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {FULFILLMENT_FILTERS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <PharmacyFulfillmentList orders={data ?? []} />
    </ListPage>
  );
}
