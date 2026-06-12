"use client";

import { BarChart } from "@/components/charts/bar-chart";
import { Card } from "@/components/dashboard/Card";
import type { DashboardMetricsResponse } from "@/lib/reporting-types";

type AppointmentsByStatusChartProps = {
  data?: DashboardMetricsResponse["appointmentsByStatus"];
  isLoading?: boolean;
};

export function AppointmentsByStatusChart({ data, isLoading }: AppointmentsByStatusChartProps) {
  const chartData = [
    { label: "Scheduled", value: data?.SCHEDULED ?? 0 },
    { label: "Completed", value: data?.COMPLETED ?? 0 },
    { label: "Cancelled", value: data?.CANCELLED ?? 0 },
    { label: "No-show", value: data?.NO_SHOW ?? 0 },
  ];

  return (
    <Card>
      <h2 className="dashboard-card-title">Appointments by status</h2>
      {isLoading ? (
        <div className="dashboard-skeleton dashboard-skeleton-chart" />
      ) : (
        <BarChart data={chartData} />
      )}
    </Card>
  );
}
