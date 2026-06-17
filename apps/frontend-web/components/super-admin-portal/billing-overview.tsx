import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlatformBillingMetrics } from "@/lib/super-admin-portal-types";

function formatUsd(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function PlatformBillingOverview({ metrics }: { metrics: PlatformBillingMetrics | null }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Paid invoices</CardTitle>
          <CardDescription>Clinical invoices marked paid</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold tabular-nums">{metrics?.paidInvoiceCount ?? "—"}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">MRR</CardTitle>
          <CardDescription>Estimated monthly recurring revenue</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold tabular-nums">
            {metrics ? formatUsd(metrics.mrrCents, metrics.currency) : "—"}
          </p>
          <p className="text-sm text-muted-foreground">
            {metrics
              ? `${metrics.activeSubscriptions} active platform subscriptions`
              : "billing-service platform-metrics unavailable"}
          </p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Collections</CardTitle>
          <CardDescription>Paid vs issued clinical invoices</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold tabular-nums">
            {metrics?.collectionsRatePercent != null ? `${metrics.collectionsRatePercent}%` : "—"}
          </p>
        </CardBody>
      </Card>
      <p className="text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
        Platform MRR is aggregated from active Stripe subscriptions in billing-service (tenant +
        organization accounts). See docs/billing-architecture.md.
      </p>
    </div>
  );
}
