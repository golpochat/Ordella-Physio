"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformTenantList } from "@/components/super-admin-portal/tenant-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenants } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminTenantsPage() {
  const { data, isLoading, isError, refetch } = usePlatformTenants();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tenants</h1>
          <p className="text-muted-foreground">Manage clinic tenants across the platform.</p>
        </div>
        <Button asChild>
          <Link href="/super-admin/tenants/create">Create tenant</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PlatformTenantList tenants={data ?? []} /> : null}
    </div>
  );
}
