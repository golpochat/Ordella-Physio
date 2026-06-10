"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicStaffDetail } from "@/components/clinic-portal/staff-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicStaffMember } from "@/hooks/useClinicPortal";

type ClinicStaffDetailPageProps = {
  params: { id: string };
};

export default function ClinicStaffDetailPage({ params }: ClinicStaffDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicStaffMember(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/clinic/staff">&larr; Back to staff</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? (
        <ClinicStaffDetail member={data} backHref="/clinic/staff" backLabel="Back to staff" />
      ) : null}
      {!isLoading && !isError && !data ? <PageError message="Staff member not found." /> : null}
    </div>
  );
}
