"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePharmacyAppointments,
  usePharmacyBilling,
  usePharmacyContext,
  usePharmacyFulfillmentOrders,
  usePharmacyPatients,
  usePharmacyPrescriptions,
} from "@/hooks/usePharmacyPortal";
import { getTodaysAppointments } from "@/lib/pharmacy-portal-utils";

export function PharmacyHomeOverview() {
  const { displayName } = usePharmacyContext();
  const prescriptionsQuery = usePharmacyPrescriptions();
  const fulfillmentQuery = usePharmacyFulfillmentOrders();
  const patientsQuery = usePharmacyPatients();
  const appointmentsQuery = usePharmacyAppointments();
  const billingQuery = usePharmacyBilling();

  const isLoading =
    prescriptionsQuery.isLoading ||
    fulfillmentQuery.isLoading ||
    patientsQuery.isLoading ||
    appointmentsQuery.isLoading ||
    billingQuery.isLoading;
  const isError =
    prescriptionsQuery.isError ||
    fulfillmentQuery.isError ||
    patientsQuery.isError ||
    appointmentsQuery.isError ||
    billingQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void prescriptionsQuery.refetch();
          void fulfillmentQuery.refetch();
          void patientsQuery.refetch();
          void appointmentsQuery.refetch();
          void billingQuery.refetch();
        }}
      />
    );
  }

  const prescriptions = prescriptionsQuery.data ?? [];
  const fulfillment = fulfillmentQuery.data ?? [];
  const patients = patientsQuery.data ?? [];
  const appointments = appointmentsQuery.data ?? [];
  const invoices = billingQuery.data ?? [];
  const pendingRx = prescriptions.filter((item) => item.status === "PENDING").length;
  const activeFulfillment = fulfillment.filter(
    (item) => item.status !== "DELIVERED",
  ).length;
  const todaysAppointments = getTodaysAppointments(appointments);

  return (
    <>
      <PageHeader
        title={`Welcome, ${displayName}`}
        subtitle="Prescription requests, fulfillment, and patient lookup for your pharmacy."
      />

      <div className="dashboard-stat-grid">
        <Card compact>
          <p className="dashboard-stat-label">Pending Rx</p>
          <p className="dashboard-stat-value">{pendingRx}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Fulfillment</p>
          <p className="dashboard-stat-value">{activeFulfillment}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Patients</p>
          <p className="dashboard-stat-value">{patients.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Today&apos;s visits</p>
          <p className="dashboard-stat-value">{todaysAppointments.length}</p>
        </Card>
      </div>

      <Card>
        <p className="dashboard-section-title">Quick actions</p>
        <div className="dashboard-actions">
          <Button asChild variant="outline" size="sm">
            <Link href="/pharmacy/prescriptions">Prescriptions</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/pharmacy/fulfillment">Fulfillment</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/pharmacy/patients">Patient lookup</Link>
          </Button>
        </div>
        <p className="dashboard-empty">
          {invoices.length} billing records available for view-only reference.
        </p>
      </Card>
    </>
  );
}
