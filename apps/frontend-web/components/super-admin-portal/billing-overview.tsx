import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatPlatformCurrencyCents,
  PLATFORM_FALLBACK_CURRENCY,
} from "@/lib/platform-formatting";
import type { PlatformBillingMetrics } from "@/lib/super-admin-portal-types";

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

type MetricTone = "positive" | "warning" | "danger" | "neutral";

const toneClass: Record<MetricTone, string> = {
  positive: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-red-600 dark:text-red-400",
  neutral: "text-foreground",
};

function MetricTile({
  title,
  description,
  value,
  tone = "neutral",
}: {
  title: string;
  description: string;
  value: string;
  tone?: MetricTone;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardBody>
        <p className={`text-3xl font-bold tabular-nums ${toneClass[tone]}`}>{value}</p>
      </CardBody>
    </Card>
  );
}

function BillingMetricsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`row1-${index}`}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardHeader>
            <CardBody>
              <Skeleton className="h-9 w-28" />
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`row2-${index}`}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardHeader>
            <CardBody>
              <Skeleton className="h-9 w-20" />
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={`row3-${index}`}>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardHeader>
            <CardBody>
              <Skeleton className="h-9 w-36" />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PlatformBillingOverview({
  metrics,
  isLoading = false,
  currency = PLATFORM_FALLBACK_CURRENCY,
}: {
  metrics: PlatformBillingMetrics | null;
  isLoading?: boolean;
  currency?: string;
}) {
  const formatMoney = (cents: number) => formatPlatformCurrencyCents(cents, currency);
  if (isLoading) {
    return <BillingMetricsSkeleton />;
  }

  if (!metrics) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile
          title="Stripe-live MRR"
          description="Monthly recurring revenue from Stripe subscriptions and usage"
          value={formatMoney(metrics.mrrStripeLive)}
          tone="positive"
        />
        <MetricTile
          title="ARR"
          description="Annualized recurring revenue (MRR × 12)"
          value={formatMoney(metrics.arrStripeLive)}
          tone="positive"
        />
        <MetricTile
          title="Active subscriptions"
          description="Stripe subscriptions in active status"
          value={String(metrics.activeSubscriptions)}
          tone="positive"
        />
        <MetricTile
          title="Trialing subscriptions"
          description="Stripe subscriptions currently in trial"
          value={String(metrics.trialingSubscriptions)}
          tone="positive"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile
          title="Past due"
          description="Subscriptions with failed or overdue payments"
          value={String(metrics.pastDueSubscriptions)}
          tone="warning"
        />
        <MetricTile
          title="Canceled"
          description="Subscriptions canceled in Stripe"
          value={String(metrics.canceledSubscriptions)}
          tone="danger"
        />
        <MetricTile
          title="Churn rate"
          description="Canceled subscriptions over total tracked subscriptions"
          value={formatPercent(metrics.churnRate)}
          tone="danger"
        />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue breakdown</CardTitle>
            <CardDescription>Monthly MRR split by billing entity metadata</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Tenant-level revenue</span>
              <span className={`font-semibold tabular-nums ${toneClass.positive}`}>
                {formatMoney(metrics.tenantRevenue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Organization-level revenue</span>
              <span className={`font-semibold tabular-nums ${toneClass.positive}`}>
                {formatMoney(metrics.organizationRevenue)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span>Usage revenue (metered)</span>
              <span className={`font-semibold tabular-nums ${toneClass.positive}`}>
                {formatMoney(metrics.usageRevenue)}
              </span>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Notes usage</CardTitle>
            <CardDescription>Total metered usage and revenue from Stripe this period</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Usage this period</p>
              <p className={`text-3xl font-bold tabular-nums ${toneClass.positive}`}>
                {metrics.aiNotesUsage.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Usage revenue</p>
              <p className={`text-2xl font-semibold tabular-nums ${toneClass.positive}`}>
                {formatMoney(metrics.aiNotesRevenue)}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Last updated</CardTitle>
            <CardDescription>Stripe-live metrics cache timestamp from billing-service</CardDescription>
          </CardHeader>
          <CardBody>
            <p className="text-lg font-medium tabular-nums">
              {new Date(metrics.lastUpdatedAt).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Metrics refresh automatically every 60 seconds. Backend cache TTL is 5 minutes and
              invalidates on Stripe billing webhooks.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
