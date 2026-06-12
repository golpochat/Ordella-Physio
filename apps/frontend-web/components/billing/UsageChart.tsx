"use client";

import { DonutChart, type DonutChartSlice } from "@/components/charts/donut-chart";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { UsageMetricSummary } from "@/lib/subscription-billing-types";

export type UsageChartMetric = {
  label: string;
  summary: UsageMetricSummary;
};

type UsageChartProps = {
  metrics: UsageChartMetric[];
};

function usageStatus(used: number, limit: number): "under" | "near" | "over" {
  if (limit < 0) {
    return "under";
  }
  if (used > limit) {
    return "over";
  }
  if (limit > 0 && used / limit >= 0.85) {
    return "near";
  }
  return "under";
}

const STATUS_COLORS = {
  under: "hsl(142 76% 36%)",
  near: "hsl(45 93% 47%)",
  over: "hsl(0 84% 60%)",
} as const;

function formatLimit(limit: number) {
  return limit < 0 ? "Unlimited" : limit.toLocaleString();
}

function buildSlices(summary: UsageMetricSummary): DonutChartSlice[] {
  const { used, limit } = summary;
  if (limit < 0) {
    return [{ name: "Used", value: used || 1, color: STATUS_COLORS.under }];
  }

  const status = usageStatus(used, limit);
  const remaining = Math.max(limit - used, 0);

  if (used === 0 && limit === 0) {
    return [{ name: "Empty", value: 1, color: STATUS_COLORS.under }];
  }

  return [
    { name: "Used", value: used || 0.001, color: STATUS_COLORS[status] },
    { name: "Remaining", value: remaining || 0.001, color: "hsl(var(--muted))" },
  ];
}

export function UsageChart({ metrics }: UsageChartProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => {
        const status = usageStatus(metric.summary.used, metric.summary.limit);
        return (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle className="text-base">{metric.label}</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              <DonutChart data={buildSlices(metric.summary)} />
              <div className="text-center text-sm">
                <p className="font-medium">
                  {metric.summary.used.toLocaleString()} / {formatLimit(metric.summary.limit)}
                </p>
                <p
                  className={
                    status === "over"
                      ? "text-destructive"
                      : status === "near"
                        ? "text-amber-600"
                        : "text-muted-foreground"
                  }
                >
                  {status === "over"
                    ? "Over limit"
                    : status === "near"
                      ? "Near limit"
                      : "Within limit"}
                </p>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
