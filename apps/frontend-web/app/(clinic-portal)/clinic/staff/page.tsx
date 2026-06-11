"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListPage } from "@/components/dashboard/ListPage";
import { ClinicStaffList } from "@/components/clinic-portal/staff-list";
import { useClinicStaffOnly } from "@/hooks/useClinicPortal";

export default function ClinicStaffPage() {
  const { data, isLoading, isError, refetch } = useClinicStaffOnly();

  return (
    <ListPage
      title="Staff"
      subtitle="Manage non-clinical staff for your clinic."
      action={
        <Button asChild>
          <Link href="/clinic/staff/create">Add staff</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <ClinicStaffList
        members={data ?? []}
        basePath="/clinic/staff"
        emptyTitle="No staff found"
        emptyDescription="Add staff members to support clinic operations."
      />
    </ListPage>
  );
}
