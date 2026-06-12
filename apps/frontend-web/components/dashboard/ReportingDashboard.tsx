"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { DashboardDateRangeFilter } from "@/components/dashboard/DashboardDateRangeFilter";
import { AppointmentsByStatusChart } from "@/components/dashboard/widgets/AppointmentsByStatusChart";
import { NewPatients } from "@/components/dashboard/widgets/NewPatients";
import { Revenue } from "@/components/dashboard/widgets/Revenue";
import { RevenueByStatusChart } from "@/components/dashboard/widgets/RevenueByStatusChart";
import { TopServicesTable } from "@/components/dashboard/widgets/TopServicesTable";
import { TopStaffTable } from "@/components/dashboard/widgets/TopStaffTable";
import { TotalAppointments } from "@/components/dashboard/widgets/TotalAppointments";
import { TotalPatients } from "@/components/dashboard/widgets/TotalPatients";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError } from "@/components/patient-portal/page-state";
import { useDashboardMetrics } from "@/hooks/useReports";
import { parseDashboardMetricsErrors } from "@/lib/reporting-api-errors";
import type { DashboardRangeType } from "@/lib/reporting-types";

function defaultCustomDates() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function readRangeType(value: string | null): DashboardRangeType {
  const allowed: DashboardRangeType[] = [
    "today",
    "yesterday",
    "last_7_days",
    "last_30_days",
    "this_month",
    "last_month",
    "custom",
  ];
  return allowed.includes(value as DashboardRangeType) ? (value as DashboardRangeType) : "last_7_days";
}

export function ReportingDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaults = defaultCustomDates();

  const [rangeType, setRangeType] = useState<DashboardRangeType>(
    readRangeType(searchParams.get("rangeType")),
  );
  const [startDate, setStartDate] = useState(searchParams.get("startDate") ?? defaults.startDate);
  const [endDate, setEndDate] = useState(searchParams.get("endDate") ?? defaults.endDate);

  const query = useMemo(
    () => ({
      rangeType,
      ...(rangeType === "custom" ? { startDate, endDate } : {}),
    }),
    [rangeType, startDate, endDate],
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useDashboardMetrics(query);
  const controlsDisabled = isLoading || isFetching;

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("rangeType", rangeType);
    if (rangeType === "custom") {
      params.set("startDate", startDate);
      params.set("endDate", endDate);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [rangeType, startDate, endDate, router]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    const parsed = parseDashboardMetricsErrors(error);
    if (parsed.forbidden) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.invalidDateRange && parsed.generalError) {
      toast.error(parsed.generalError);
    }
  }, [isError, error, router]);

  if (isError) {
    const parsed = parseDashboardMetricsErrors(error);
    if (parsed.forbidden) {
      return null;
    }

    return <PageError message={parsed.generalError ?? undefined} onRetry={() => void refetch()} />;
  }

  return (
    <>
      <PageHeader
        title="Analytics dashboard"
        subtitle="Aggregated clinic metrics across patients, appointments, and billing."
      />

      <DashboardDateRangeFilter
        rangeType={rangeType}
        startDate={startDate}
        endDate={endDate}
        disabled={controlsDisabled}
        onRangeTypeChange={setRangeType}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {data?.dateRange ? (
        <p className="dashboard-range-summary">
          Showing data from {data.dateRange.start} to {data.dateRange.end}
        </p>
      ) : null}

      <div className="dashboard-stat-grid">
        <TotalPatients value={data?.totals.patients} isLoading={isLoading} />
        <NewPatients value={data?.totals.newPatients} isLoading={isLoading} />
        <TotalAppointments value={data?.totals.appointments} isLoading={isLoading} />
        <Revenue value={data?.totals.revenue} isLoading={isLoading} />
      </div>

      <div className="dashboard-widget-grid">
        <AppointmentsByStatusChart data={data?.appointmentsByStatus} isLoading={isLoading} />
        <RevenueByStatusChart data={data?.revenueByStatus} isLoading={isLoading} />
        <TopStaffTable rows={data?.topStaff} isLoading={isLoading} />
        <TopServicesTable rows={data?.topServices} isLoading={isLoading} />
      </div>
    </>
  );
}
