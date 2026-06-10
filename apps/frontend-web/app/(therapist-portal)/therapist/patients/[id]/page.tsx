"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TherapistPatientDetail } from "@/components/therapist-portal/patient-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistPatient } from "@/hooks/useTherapistPortal";

type TherapistPatientDetailPageProps = {
  params: { id: string };
};

export default function TherapistPatientDetailPage({ params }: TherapistPatientDetailPageProps) {
  const { data, isLoading, isError, refetch } = useTherapistPatient(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/therapist/patients">&larr; Back to patients</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <TherapistPatientDetail patient={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Patient not found." /> : null}
    </div>
  );
}
