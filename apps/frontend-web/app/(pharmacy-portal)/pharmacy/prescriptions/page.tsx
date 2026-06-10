"use client";

import { PharmacyPrescriptionList } from "@/components/pharmacy-portal/prescription-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyPrescriptions } from "@/hooks/usePharmacyPortal";

export default function PharmacyPrescriptionsPage() {
  const { data, isLoading, isError, refetch } = usePharmacyPrescriptions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Prescription requests</h1>
        <p className="text-muted-foreground">Review incoming prescription requests from clinicians.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PharmacyPrescriptionList prescriptions={data ?? []} /> : null}
    </div>
  );
}
