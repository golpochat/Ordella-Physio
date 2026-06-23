"use client";

import Link from "next/link";
import { PlatformBillingOverview } from "@/components/super-admin-portal/billing-overview";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { RoleGuard } from "@/components/navigation/role-guard";
import { Button } from "@/components/ui/button";
import { usePlatformBillingMetrics } from "@/hooks/usePlatformBillingMetrics";
import { usePlatformCurrency } from "@/hooks/useSuperAdminPortal";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function AdminRevenuePage() {
  const metricsQuery = usePlatformBillingMetrics();
  const platformCurrency = usePlatformCurrency();

  if (metricsQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (metricsQuery.isError) {
    return <PageError onRetry={() => void metricsQuery.refetch()} />;
  }

  return (
    <RoleGuard allowedRoles={["OWNER", "ADMIN", "SYSTEM"]}>
      <WithAllPermissions permissions={["billing.analytics.view"]}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Revenue analytics</h1>
              <p className="text-muted-foreground">
                Stripe-live platform MRR, churn, and subscription revenue from billing-service.
              </p>
            </div>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin">Back to admin</Link>
            </Button>
          </div>

          <PlatformBillingOverview
            metrics={metricsQuery.data ?? null}
            currency={platformCurrency}
          />
        </div>
      </WithAllPermissions>
    </RoleGuard>
  );
}
