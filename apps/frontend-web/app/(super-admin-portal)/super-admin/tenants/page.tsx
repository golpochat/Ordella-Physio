"use client";

import Link from "next/link";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { TenantList } from "@/components/super-admin/tenants/TenantList";
import { usePlatformTenants } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminTenantsPage() {
  const { data, isLoading, isError, refetch } = usePlatformTenants();

  return (
    <ListPage
      title="Tenants"
      subtitle="Manage clinic tenants across the platform."
      action={
        <Button asChild className="btn-primary">
          <Link href="/super-admin/tenants/create">Create tenant</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <TenantList tenants={data ?? []} />
    </ListPage>
  );
}
