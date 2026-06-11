"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ClinicAppointmentList } from "@/components/clinic-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useClinicAppointments,
  useClinicBilling,
  useClinicContext,
  useClinicPatients,
  useClinicTherapists,
} from "@/hooks/useClinicPortal";
import { partitionClinicAppointments } from "@/lib/clinic-portal-utils";

export function ClinicHomeOverview() {
  const { displayName } = useClinicContext();
  const appointmentsQuery = useClinicAppointments();
  const patientsQuery = useClinicPatients();
  const therapistsQuery = useClinicTherapists();
  const billingQuery = useClinicBilling();

  const isLoading =
    appointmentsQuery.isLoading ||
    patientsQuery.isLoading ||
    therapistsQuery.isLoading ||
    billingQuery.isLoading;
  const isError =
    appointmentsQuery.isError ||
    patientsQuery.isError ||
    therapistsQuery.isError ||
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
          void therapistsQuery.refetch();
          void billingQuery.refetch();
        }}
      />
    );
  }

  const { today, upcoming } = partitionClinicAppointments(appointmentsQuery.data ?? []);
  const patients = patientsQuery.data ?? [];
  const therapists = therapistsQuery.data ?? [];
  const invoices = billingQuery.data ?? [];

  return (
    <>
      <PageHeader
        title={`Welcome, ${displayName}`}
        subtitle="Manage therapists, patients, appointments, and clinic operations."
      />

      <div className="dashboard-stat-grid">
        <Card compact>
          <p className="dashboard-stat-label">Therapists</p>
          <p className="dashboard-stat-value">{therapists.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Patients</p>
          <p className="dashboard-stat-value">{patients.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Today</p>
          <p className="dashboard-stat-value">{today.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Invoices</p>
          <p className="dashboard-stat-value">{invoices.length}</p>
        </Card>
      </div>

      <Card>
        <div className="page-header">
          <p className="dashboard-section-title">Today&apos;s appointments</p>
          <div className="page-header-action">
            <Button asChild className="btn-secondary" variant="outline" size="sm">
              <Link href="/clinic/appointments">View all</Link>
            </Button>
          </div>
        </div>
        <ClinicAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Scheduled visits will appear here."
        />
      </Card>

      <Card>
        <div className="page-header">
          <p className="dashboard-section-title">Upcoming appointments</p>
          <div className="page-header-action">
            <Button asChild className="btn-secondary" variant="outline" size="sm">
              <Link href="/clinic/appointments">View all</Link>
            </Button>
          </div>
        </div>
        <ClinicAppointmentList
          appointments={upcoming.slice(0, 3)}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </Card>
    </>
  );
}
