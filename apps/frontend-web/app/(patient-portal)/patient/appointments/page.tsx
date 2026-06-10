"use client";

import { AppointmentList } from "@/components/patient-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientAppointments } from "@/hooks/usePatientPortal";
import { splitAppointments } from "@/lib/patient-portal-utils";

export default function PatientAppointmentsPage() {
  const { data, isLoading, isError, refetch } = usePatientAppointments();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  const { upcoming, past } = splitAppointments(data ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-muted-foreground">View upcoming and past appointments.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming</h2>
        <AppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Your scheduled visits will appear here."
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Past appointments</h2>
        <AppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed and cancelled visits will appear here."
        />
      </section>
    </div>
  );
}
