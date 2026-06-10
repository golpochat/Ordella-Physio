"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicAppointmentDetail } from "@/components/clinic-portal/appointment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicAppointment } from "@/hooks/useClinicPortal";

type ClinicAppointmentDetailPageProps = {
  params: { id: string };
};

export default function ClinicAppointmentDetailPage({ params }: ClinicAppointmentDetailPageProps) {
  const { data, isLoading, isError, refetch } = useClinicAppointment(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/clinic/appointments">&larr; Back to appointments</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <ClinicAppointmentDetail appointment={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Appointment not found." /> : null}
    </div>
  );
}
