"use client";

import { TherapistAppointmentList } from "@/components/therapist-portal/appointment-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTherapistAppointments } from "@/hooks/useTherapistPortal";
import { partitionTherapistAppointments } from "@/lib/therapist-portal-utils";

export default function TherapistAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useTherapistAppointments();
  const { today, upcoming, past } = partitionTherapistAppointments(data ?? []);

  return (
    <ListPage
      title="Appointments"
      subtitle="Manage your daily schedule and upcoming sessions."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <section>
        <h2>Today</h2>
        <TherapistAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Your schedule is clear for today."
        />
      </section>

      <section>
        <h2>Upcoming</h2>
        <TherapistAppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>

      <section>
        <h2>Past appointments</h2>
        <TherapistAppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed sessions will appear here."
        />
      </section>
    </ListPage>
  );
}
