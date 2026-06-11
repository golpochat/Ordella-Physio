"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TenantConfigEditor } from "@/components/tenants/TenantConfigEditor";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenant, usePlatformTenantConfigNamespaces } from "@/hooks/useSuperAdminPortal";
import { ApiError } from "@/lib/api-client";
import { parseTenantConfigErrors } from "@/lib/tenant-api-errors";

type SuperAdminTenantConfigPageProps = {
  params: { id: string };
};

export default function SuperAdminTenantConfigPage({ params }: SuperAdminTenantConfigPageProps) {
  const router = useRouter();
  const tenantQuery = usePlatformTenant(params.id);
  const namespacesQuery = usePlatformTenantConfigNamespaces(params.id);

  const isLoading = tenantQuery.isLoading || namespacesQuery.isLoading;
  const loadError = tenantQuery.error ?? namespacesQuery.error;

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed = parseTenantConfigErrors(loadError);
    if (parsed.notFound || (loadError instanceof ApiError && loadError.status === 404)) {
      toast.error("Tenant not found.");
      router.replace("/super-admin/tenants");
      return;
    }

    if (parsed.tenantMismatch || (loadError instanceof ApiError && loadError.status === 403)) {
      router.replace("/forbidden");
    }
  }, [isLoading, loadError, router]);

  useEffect(() => {
    if (!tenantQuery.isLoading && !tenantQuery.isError && !tenantQuery.data) {
      toast.error("Tenant not found.");
      router.replace("/super-admin/tenants");
    }
  }, [tenantQuery.data, tenantQuery.isError, tenantQuery.isLoading, router]);

  return (
    <>
      <PageHeader
        title={
          tenantQuery.data?.name ? `Configuration — ${tenantQuery.data.name}` : "Tenant configuration"
        }
        subtitle="Manage branding, features, integrations, and preferences."
        action={
          <Button asChild variant="ghost">
            <Link href={`/super-admin/tenants/${params.id}`}>&larr; Back to tenant</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading ? (
        <PageError onRetry={() => void namespacesQuery.refetch()} />
      ) : null}
      {!isLoading && !loadError && tenantQuery.data ? (
        <TenantConfigEditor
          tenantId={params.id}
          tenantName={tenantQuery.data.name}
          onForbidden={() => router.replace("/forbidden")}
        />
      ) : null}
    </>
  );
}
