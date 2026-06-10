"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { TherapistAppointmentList } from "@/components/therapist-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useTherapistAppointments,
  useTherapistContext,
  useTherapistNotes,
  useTherapistPatients,
} from "@/hooks/useTherapistPortal";
import { partitionTherapistAppointments } from "@/lib/therapist-portal-utils";

export function TherapistHomeOverview() {
  const { displayName } = useTherapistContext();
  const appointmentsQuery = useTherapistAppointments();
  const patientsQuery = useTherapistPatients();
  const notesQuery = useTherapistNotes();

  const isLoading =
    appointmentsQuery.isLoading || patientsQuery.isLoading || notesQuery.isLoading;
  const isError = appointmentsQuery.isError || patientsQuery.isError || notesQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void appointmentsQuery.refetch();
          void patientsQuery.refetch();
          void notesQuery.refetch();
        }}
      />
    );
  }

  const { today, upcoming } = partitionTherapistAppointments(appointmentsQuery.data ?? []);
  const patients = patientsQuery.data ?? [];
  const notes = notesQuery.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">
          Your schedule, patients, and clinical notes in one workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{today.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{upcoming.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patients</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{patients.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{notes.length}</p>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Today&apos;s appointments</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/therapist/appointments">View all</Link>
          </Button>
        </div>
        <TherapistAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Your schedule is clear for today."
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Upcoming appointments</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/therapist/appointments">View all</Link>
          </Button>
        </div>
        <TherapistAppointmentList
          appointments={upcoming.slice(0, 3)}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>
    </div>
  );
}
