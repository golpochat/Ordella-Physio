"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StaffAppointmentList } from "@/components/staff-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useStaffAppointments,
  useStaffBilling,
  useStaffContext,
  useStaffNotes,
  useStaffPatients,
} from "@/hooks/useStaffPortal";
import { partitionStaffAppointments } from "@/lib/staff-portal-utils";

export function StaffHomeOverview() {
  const { displayName } = useStaffContext();
  const appointmentsQuery = useStaffAppointments();
  const patientsQuery = useStaffPatients();
  const notesQuery = useStaffNotes();
  const billingQuery = useStaffBilling();

  const isLoading =
    appointmentsQuery.isLoading ||
    patientsQuery.isLoading ||
    notesQuery.isLoading ||
    billingQuery.isLoading;
  const isError =
    appointmentsQuery.isError ||
    patientsQuery.isError ||
    notesQuery.isError ||
    billingQuery.isError;

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
          void billingQuery.refetch();
        }}
      />
    );
  }

  const { today, upcoming } = partitionStaffAppointments(appointmentsQuery.data ?? []);
  const patients = patientsQuery.data ?? [];
  const notes = notesQuery.data ?? [];
  const invoices = billingQuery.data ?? [];

  return (
    <>
      <PageHeader
        title={`Welcome, ${displayName}`}
        subtitle="Front-desk support for scheduling, patients, and clinic coordination."
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
          <p className="dashboard-stat-label">Invoices</p>
          <p className="dashboard-stat-value">{invoices.length}</p>
        </Card>
      </div>

      <Card>
        <p className="dashboard-section-title">Today&apos;s appointments</p>
        <div className="dashboard-actions">
          <Button asChild variant="outline" size="sm">
            <Link href="/staff/appointments">View all</Link>
          </Button>
        </div>
        <StaffAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="The clinic schedule is clear for today."
        />
      </Card>

      <Card>
        <p className="dashboard-empty">
          {notes.length} clinical notes available for read-only reference.
        </p>
      </Card>
    </>
  );
}
