"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { AppointmentEditForm } from "@/components/appointments/AppointmentEditForm";
import { useClinicAppointment } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseAppointmentUpdateErrors } from "@/lib/appointment-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicAppointmentEditPageProps = {
  params: { id: string };
};

export default function ClinicAppointmentEditPage({ params }: ClinicAppointmentEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicAppointment(params.id);

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parseAppointmentUpdateErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.generalError ?? "Appointment does not exist.");
      router.replace("/clinic/appointments");
    }
  }, [error, isError, isLoading, router]);

  return (
    <WithPermission permission="appointment.manage">
      <PageHeader
        title="Edit appointment"
        subtitle="Reschedule or update appointment details."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/appointments/${params.id}`}>&larr; Back to appointment</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? <AppointmentEditForm appointment={data} /> : null}
    </WithPermission>
  );
}
