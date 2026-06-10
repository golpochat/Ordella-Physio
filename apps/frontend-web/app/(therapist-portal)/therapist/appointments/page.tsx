"use client";

import { TherapistAppointmentList } from "@/components/therapist-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistAppointments } from "@/hooks/useTherapistPortal";
import { partitionTherapistAppointments } from "@/lib/therapist-portal-utils";

export default function TherapistAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useTherapistAppointments();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  const { today, upcoming, past } = partitionTherapistAppointments(data ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-muted-foreground">Manage your daily schedule and upcoming sessions.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Today</h2>
        <TherapistAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Your schedule is clear for today."
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming</h2>
        <TherapistAppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Past appointments</h2>
        <TherapistAppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed sessions will appear here."
        />
      </section>
    </div>
  );
}
