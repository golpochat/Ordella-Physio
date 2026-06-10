"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicPatientList } from "@/components/clinic-portal/patient-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicPatients } from "@/hooks/useClinicPortal";

export default function ClinicPatientsPage() {
  const { data, isLoading, isError, refetch } = useClinicPatients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Patients</h1>
          <p className="text-muted-foreground">Manage patient records for your clinic.</p>
        </div>
        <Button asChild>
          <Link href="/clinic/patients/create">Register patient</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <ClinicPatientList patients={data ?? []} /> : null}
    </div>
  );
}
