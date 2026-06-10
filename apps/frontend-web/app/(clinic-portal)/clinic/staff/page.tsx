"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicStaffList } from "@/components/clinic-portal/staff-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicStaffOnly } from "@/hooks/useClinicPortal";

export default function ClinicStaffPage() {
  const { data, isLoading, isError, refetch } = useClinicStaffOnly();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Staff</h1>
          <p className="text-muted-foreground">Manage non-clinical staff for your clinic.</p>
        </div>
        <Button asChild>
          <Link href="/clinic/staff/create">Add staff</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? (
        <ClinicStaffList
          members={data ?? []}
          basePath="/clinic/staff"
          emptyTitle="No staff found"
          emptyDescription="Add staff members to support clinic operations."
        />
      ) : null}
    </div>
  );
}
