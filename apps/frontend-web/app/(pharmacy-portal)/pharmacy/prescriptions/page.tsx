"use client";

import { useState } from "react";
import { PharmacyPrescriptionList } from "@/components/pharmacy-portal/prescription-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePharmacyPrescriptions } from "@/hooks/usePharmacyPortal";
import type { PrescriptionStatus } from "@/lib/clinic-pharmacy-types";

export default function PharmacyPrescriptionsPage() {
  const [statusFilter, setStatusFilter] = useState<PrescriptionStatus | "ALL">("ALL");
  const queryFilters = statusFilter === "ALL" ? undefined : { status: statusFilter };
  const { data, isLoading, isError, refetch } = usePharmacyPrescriptions(queryFilters);

  return (
    <ListPage
      title="Prescription requests"
      subtitle="Create, review, and manage prescription requests."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <PharmacyPrescriptionList
        prescriptions={data ?? []}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </ListPage>
  );
}
