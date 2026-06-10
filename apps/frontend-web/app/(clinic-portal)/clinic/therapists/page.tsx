"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicStaffList } from "@/components/clinic-portal/staff-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicTherapists } from "@/hooks/useClinicPortal";

export default function ClinicTherapistsPage() {
  const { data, isLoading, isError, refetch } = useClinicTherapists();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Therapists</h1>
          <p className="text-muted-foreground">Manage therapists assigned to your clinic.</p>
        </div>
        <Button asChild>
          <Link href="/clinic/therapists/create">Add therapist</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? (
        <ClinicStaffList
          members={data ?? []}
          basePath="/clinic/therapists"
          emptyTitle="No therapists found"
          emptyDescription="Add therapists to build your clinical team."
        />
      ) : null}
    </div>
  );
}
