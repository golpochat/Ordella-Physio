"use client";

import { AppointmentList } from "@/components/patient-portal/appointment-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePatientAppointments } from "@/hooks/usePatientPortal";
import { splitAppointments } from "@/lib/patient-portal-utils";

export default function PatientAppointmentsPage() {
  const { data, isLoading, isError, refetch } = usePatientAppointments();
  const { upcoming, past } = splitAppointments(data ?? []);

  return (
    <ListPage
      title="Appointments"
      subtitle="View upcoming and past appointments."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <section>
        <h2>Upcoming</h2>
        <AppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Your scheduled visits will appear here."
        />
      </section>

      <section>
        <h2>Past appointments</h2>
        <AppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed and cancelled visits will appear here."
        />
      </section>
    </ListPage>
  );
}
