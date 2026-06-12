"use client";

import Link from "next/link";
import { FeatureStatus } from "@/components/billing/FeatureStatus";
import { UsageChart } from "@/components/billing/UsageChart";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  usePlanFeatures,
  useUsageHistory,
  useUsageSummary,
} from "@/hooks/useSubscriptionBilling";
import { WithAllPermissions } from "@/lib/auth/withPermission";

function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function formatPeriod(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat("en-IE", { dateStyle: "medium" });
  return `${formatter.format(new Date(start))} – ${formatter.format(new Date(end))}`;
}

const METRIC_LABELS: Record<string, string> = {
  PATIENT_COUNT: "Patients",
  APPOINTMENT_COUNT: "Appointments",
  STORAGE_MB: "Storage (MB)",
  SMS_SENT: "SMS sent",
};

export default function BillingUsagePage() {
  const usageQuery = useUsageSummary();
  const featuresQuery = usePlanFeatures();
  const historyQuery = useUsageHistory();

  if (usageQuery.isLoading || featuresQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (usageQuery.isError || featuresQuery.isError || !usageQuery.data) {
    return (
      <PageError
        onRetry={() => {
          void usageQuery.refetch();
          void featuresQuery.refetch();
        }}
      />
    );
  }

  const usage = usageQuery.data;
  const features = featuresQuery.data ?? [];

  const chartMetrics = [
    { label: "Patients", summary: usage.patients },
    { label: "Appointments", summary: usage.appointments },
    { label: "Storage (MB)", summary: usage.storageMB },
    { label: "SMS sent", summary: usage.smsSent },
    { label: "Staff seats", summary: usage.staff },
  ];

  return (
    <WithAllPermissions permissions={["subscription.read"]}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Usage & limits</h1>
            <p className="text-muted-foreground">
              Current billing period: {formatPeriod(usage.periodStart, usage.periodEnd)}
            </p>
          </div>
          <Button type="button" variant="outline" asChild>
            <Link href="/settings/billing">Back to billing</Link>
          </Button>
        </div>

        <UsageChart metrics={chartMetrics} />

        {usage.overage.hasOverage ? (
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle>Overage charges</CardTitle>
              <CardDescription>
                Usage above your plan limits is billed at the rates below.
              </CardDescription>
            </CardHeader>
            <CardBody className="space-y-3">
              <p className="text-lg font-semibold">
                Estimated overage:{" "}
                {formatCurrency(usage.overage.totalOverageCents, usage.overage.currency)}
              </p>
              <ul className="space-y-2 text-sm">
                {usage.overage.items.map((item) => (
                  <li
                    key={item.metric}
                    className="flex flex-wrap justify-between gap-2 rounded-md border px-3 py-2"
                  >
                    <span>
                      {METRIC_LABELS[item.metric] ?? item.metric}: {item.used.toLocaleString()} /{" "}
                      {item.limit.toLocaleString()} ({item.overageUnits.toLocaleString()} over)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.totalCostCents, usage.overage.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ) : null}

        <FeatureStatus features={features} />

        {historyQuery.data?.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Usage history</CardTitle>
              <CardDescription>Recorded usage snapshots for recent billing periods.</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2 pr-4">Metric</th>
                      <th className="py-2 pr-4">Quantity</th>
                      <th className="py-2 pr-4">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyQuery.data.map((record) => (
                      <tr key={record.id} className="border-b border-border/60">
                        <td className="py-2 pr-4">
                          {METRIC_LABELS[record.metric] ?? record.metric}
                        </td>
                        <td className="py-2 pr-4">{record.quantity.toLocaleString()}</td>
                        <td className="py-2 pr-4">
                          {formatPeriod(record.periodStart, record.periodEnd)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        ) : null}
      </div>
    </WithAllPermissions>
  );
}
