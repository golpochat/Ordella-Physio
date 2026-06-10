"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PharmacyPatientDetail } from "@/components/pharmacy-portal/patient-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyPatient } from "@/hooks/usePharmacyPortal";

type PharmacyPatientDetailPageProps = {
  params: { id: string };
};

export default function PharmacyPatientDetailPage({ params }: PharmacyPatientDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePharmacyPatient(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/pharmacy/patients">&larr; Back to patients</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PharmacyPatientDetail patient={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Patient not found." /> : null}
    </div>
  );
}
