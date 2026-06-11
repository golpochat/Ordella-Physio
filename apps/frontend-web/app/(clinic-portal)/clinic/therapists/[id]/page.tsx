"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicStaffDetail } from "@/components/clinic-portal/staff-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicStaffMember } from "@/hooks/useClinicPortal";

type ClinicTherapistDetailPageProps = {
  params: { id: string };
};

export default function ClinicTherapistDetailPage({ params }: ClinicTherapistDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicStaffMember(params.id);

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/therapists">&larr; Back to therapists</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? (
        <ClinicStaffDetail
          member={data}
          backHref="/clinic/therapists"
          backLabel="Back to therapists"
        />
      ) : null}
      {!isLoading && !isError && !data ? <PageError message="Therapist not found." /> : null}
    </>
  );
}
