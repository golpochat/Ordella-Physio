"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StaffPatientDetail } from "@/components/staff-portal/patient-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffPatient } from "@/hooks/useStaffPortal";

type StaffPatientDetailPageProps = {
  params: { id: string };
};

export default function StaffPatientDetailPage({ params }: StaffPatientDetailPageProps) {
  const { data, isLoading, isError, refetch } = useStaffPatient(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/staff/patients">&larr; Back to patients</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <StaffPatientDetail patient={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Patient not found." /> : null}
    </div>
  );
}
