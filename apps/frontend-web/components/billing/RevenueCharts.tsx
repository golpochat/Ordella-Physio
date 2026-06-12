"use client";

import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { LineChart } from "@/components/charts/line-chart";
import type { MrrTrendPoint, RevenueMetrics } from "@/lib/subscription-billing-types";

type RevenueChartsProps = {
  metrics: RevenueMetrics;
  trend: MrrTrendPoint[];
};

function centsToUnits(cents: number) {
  return Number((cents / 100).toFixed(2));
}

export function RevenueCharts({ metrics, trend }: RevenueChartsProps) {
  const planChartData = metrics.breakdown.byPlan.map((entry) => ({
    label: entry.planName,
    value: centsToUnits(entry.mrrCents),
  }));

  const regionChartData = metrics.breakdown.byRegion.map((entry) => ({
    name: entry.region,
    value: centsToUnits(entry.mrrCents),
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <LineChart data={trend} title="MRR trend" />
      <BarChart data={planChartData} title="Revenue by plan (MRR)" />
      {regionChartData.length ? (
        <DonutChart data={regionChartData} title="Revenue by region (MRR)" />
      ) : null}
    </div>
  );
}
