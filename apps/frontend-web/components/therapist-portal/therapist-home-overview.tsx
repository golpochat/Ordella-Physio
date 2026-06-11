"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
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
    <>
      <PageHeader
        title={`Welcome, ${displayName}`}
        subtitle="Your schedule, patients, and clinical notes in one workspace."
      />

      <div className="dashboard-stat-grid">
        <Card compact>
          <p className="dashboard-stat-label">Today</p>
          <p className="dashboard-stat-value">{today.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Upcoming</p>
          <p className="dashboard-stat-value">{upcoming.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Patients</p>
          <p className="dashboard-stat-value">{patients.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Notes</p>
          <p className="dashboard-stat-value">{notes.length}</p>
        </Card>
      </div>

      <Card>
        <p className="dashboard-section-title">Today&apos;s appointments</p>
        <div className="dashboard-actions">
          <Button asChild variant="outline" size="sm">
            <Link href="/therapist/appointments">View all</Link>
          </Button>
        </div>
        <TherapistAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Your schedule is clear for today."
        />
      </Card>

      <Card>
        <p className="dashboard-section-title">Upcoming appointments</p>
        <div className="dashboard-actions">
          <Button asChild variant="outline" size="sm">
            <Link href="/therapist/appointments">View all</Link>
          </Button>
        </div>
        <TherapistAppointmentList
          appointments={upcoming.slice(0, 3)}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </Card>
    </>
  );
}
