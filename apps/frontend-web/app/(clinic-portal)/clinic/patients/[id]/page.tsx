"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicPatientDetail } from "@/components/clinic-portal/patient-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicPatient } from "@/hooks/useClinicPortal";

type ClinicPatientDetailPageProps = {
  params: { id: string };
};

export default function ClinicPatientDetailPage({ params }: ClinicPatientDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicPatient(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/clinic/patients">&larr; Back to patients</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <ClinicPatientDetail patient={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Patient not found." /> : null}
    </div>
  );
}
