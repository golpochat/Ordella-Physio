"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListPage } from "@/components/dashboard/ListPage";
import { ClinicStaffList } from "@/components/clinic-portal/staff-list";
import { useClinicTherapists } from "@/hooks/useClinicPortal";

export default function ClinicTherapistsPage() {
  const { data, isLoading, isError, refetch } = useClinicTherapists();

  return (
    <ListPage
      title="Therapists"
      subtitle="Manage therapists assigned to your clinic."
      action={
        <Button asChild>
          <Link href="/clinic/therapists/create">Add therapist</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <ClinicStaffList
        members={data ?? []}
        basePath="/clinic/therapists"
        emptyTitle="No therapists found"
        emptyDescription="Add therapists to build your clinical team."
      />
    </ListPage>
  );
}
