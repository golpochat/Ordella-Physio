"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformTenantDetail } from "@/components/super-admin-portal/tenant-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenant } from "@/hooks/useSuperAdminPortal";

type SuperAdminTenantDetailPageProps = {
  params: { id: string };
};

export default function SuperAdminTenantDetailPage({ params }: SuperAdminTenantDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePlatformTenant(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/super-admin/tenants">&larr; Back to tenants</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PlatformTenantDetail tenant={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Tenant not found." /> : null}
    </div>
  );
}
