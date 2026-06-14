"use client";

import { AppointmentCalendar } from "@/components/clinic-ui";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTherapistAppointments } from "@/hooks/useTherapistPortal";

export default function TherapistSchedulePage() {
  const { data, isLoading, isError, refetch } = useTherapistAppointments();

  return (
    <ListPage
      title="Schedule"
      subtitle="Weekly view of your clinical sessions."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <AppointmentCalendar
        appointments={(data ?? []).map((appointment) => ({
          id: appointment.id,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          status: appointment.status,
          type: appointment.type,
          patientId: appointment.patientId,
        }))}
        appointmentLinkPrefix="/therapist/appointments"
      />
    </ListPage>
  );
}
