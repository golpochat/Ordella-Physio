"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListPage } from "@/components/dashboard/ListPage";
import { ClinicPatientList } from "@/components/clinic-portal/patient-list";
import { useClinicPatients } from "@/hooks/useClinicPortal";

export default function ClinicPatientsPage() {
  const { data, isLoading, isError, refetch } = useClinicPatients();

  return (
    <ListPage
      title="Patients"
      subtitle="Manage patient records for your clinic."
      action={
        <Button asChild>
          <Link href="/clinic/patients/create">Register patient</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <ClinicPatientList patients={data ?? []} />
    </ListPage>
  );
}
