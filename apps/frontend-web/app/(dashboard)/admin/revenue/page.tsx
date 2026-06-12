"use client";

import Link from "next/link";
import { RevenueCharts } from "@/components/billing/RevenueCharts";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { RoleGuard } from "@/components/navigation/role-guard";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { useRevenueMetrics, useRevenueTrend } from "@/hooks/useSubscriptionBilling";
import { WithAllPermissions } from "@/lib/auth/withPermission";

function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function AdminRevenuePage() {
  const metricsQuery = useRevenueMetrics();
  const trendQuery = useRevenueTrend(6);

  if (metricsQuery.isLoading || trendQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (metricsQuery.isError || trendQuery.isError || !metricsQuery.data) {
    return (
      <PageError
        onRetry={() => {
          void metricsQuery.refetch();
          void trendQuery.refetch();
        }}
      />
    );
  }

  const metrics = metricsQuery.data;

  return (
    <RoleGuard allowedRoles={["OWNER", "ADMIN", "SYSTEM"]}>
      <WithAllPermissions permissions={["billing.analytics.view"]}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Revenue analytics</h1>
              <p className="text-muted-foreground">
                Platform MRR, churn, LTV, and subscription revenue breakdown.
              </p>
            </div>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin">Back to admin</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">MRR</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-2xl font-semibold">
                  {formatCurrency(metrics.mrr.cents, metrics.mrr.currency)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {metrics.mrr.activeSubscriptions} active subscriptions
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ARR</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-2xl font-semibold">
                  {formatCurrency(metrics.arr.cents, metrics.arr.currency)}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Churn rate (30d)</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-2xl font-semibold">
                  {(metrics.churnRate.rate * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {metrics.churnRate.canceledLast30Days} cancellations
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">LTV (est.)</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-2xl font-semibold">
                  {formatCurrency(metrics.ltv.cents, metrics.ltv.currency)}
                </p>
                <p className="text-sm text-muted-foreground">
                  ~{metrics.ltv.estimatedLifetimeMonths} months lifetime
                </p>
              </CardBody>
            </Card>
          </div>

          <RevenueCharts metrics={metrics} trend={trendQuery.data ?? []} />
        </div>
      </WithAllPermissions>
    </RoleGuard>
  );
}
