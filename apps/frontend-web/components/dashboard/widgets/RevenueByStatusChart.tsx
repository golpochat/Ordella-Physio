"use client";

import { DonutChart } from "@/components/charts/donut-chart";
import { Card } from "@/components/dashboard/Card";
import type { DashboardMetricsResponse } from "@/lib/reporting-types";

type RevenueByStatusChartProps = {
  data?: DashboardMetricsResponse["revenueByStatus"];
  isLoading?: boolean;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RevenueByStatusChart({ data, isLoading }: RevenueByStatusChartProps) {
  const chartData = [
    { name: `Paid (${formatCurrency(data?.PAID ?? 0)})`, value: data?.PAID ?? 0 },
    { name: `Issued (${formatCurrency(data?.ISSUED ?? 0)})`, value: data?.ISSUED ?? 0 },
    { name: `Void (${formatCurrency(data?.VOID ?? 0)})`, value: data?.VOID ?? 0 },
  ].filter((slice) => slice.value > 0);

  return (
    <Card>
      <h2 className="dashboard-card-title">Revenue by status</h2>
      {isLoading ? (
        <div className="dashboard-skeleton dashboard-skeleton-chart" />
      ) : chartData.length ? (
        <DonutChart data={chartData} />
      ) : (
        <p className="dashboard-empty-state">No revenue recorded for this period.</p>
      )}
    </Card>
  );
}
