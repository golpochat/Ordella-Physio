"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { AppointmentList } from "@/components/patient-portal/appointment-list";
import { BillingList } from "@/components/patient-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePatientAppointments,
  usePatientBilling,
  usePatientContext,
  usePatientNotes,
} from "@/hooks/usePatientPortal";
import { splitAppointments } from "@/lib/patient-portal-utils";

export function PatientHomeOverview() {
  const { displayName } = usePatientContext();
  const appointmentsQuery = usePatientAppointments();
  const billingQuery = usePatientBilling();
  const notesQuery = usePatientNotes();

  const isLoading = appointmentsQuery.isLoading || billingQuery.isLoading || notesQuery.isLoading;
  const isError = appointmentsQuery.isError || billingQuery.isError || notesQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void appointmentsQuery.refetch();
          void billingQuery.refetch();
          void notesQuery.refetch();
        }}
      />
    );
  }

  const { upcoming, past } = splitAppointments(appointmentsQuery.data ?? []);
  const invoices = billingQuery.data ?? [];
  const notes = notesQuery.data ?? [];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${displayName}`}
        subtitle="Your appointments, billing, and care notes in one place."
      />

      <div className="dashboard-stat-grid">
        <Card compact>
          <p className="dashboard-stat-label">Upcoming</p>
          <p className="dashboard-stat-value">{upcoming.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Past visits</p>
          <p className="dashboard-stat-value">{past.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Invoices</p>
          <p className="dashboard-stat-value">{invoices.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Notes</p>
          <p className="dashboard-stat-value">{notes.length}</p>
        </Card>
      </div>

      <Card>
        <p className="dashboard-section-title">Upcoming appointments</p>
        <div className="dashboard-actions">
          <Button asChild variant="outline" size="sm">
            <Link href="/patient/appointments">View all</Link>
          </Button>
        </div>
        <AppointmentList
          appointments={upcoming.slice(0, 3)}
          emptyTitle="No upcoming appointments"
          emptyDescription="Book your next session through the clinic."
        />
      </Card>

      <Card>
        <p className="dashboard-section-title">Recent billing</p>
        <div className="dashboard-actions">
          <Button asChild variant="outline" size="sm">
            <Link href="/patient/billing">View all</Link>
          </Button>
        </div>
        <BillingList invoices={invoices.slice(0, 3)} />
      </Card>
    </>
  );
}
