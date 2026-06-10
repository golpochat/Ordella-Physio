"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppointmentDetail } from "@/components/patient-portal/appointment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientAppointment } from "@/hooks/usePatientPortal";

type PatientAppointmentDetailPageProps = {
  params: { id: string };
};

export default function PatientAppointmentDetailPage({ params }: PatientAppointmentDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePatientAppointment(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/patient/appointments">&larr; Back to appointments</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <AppointmentDetail appointment={data} /> : null}
      {!isLoading && !isError && !data ? (
        <PageError message="Appointment not found." />
      ) : null}
    </div>
  );
}
