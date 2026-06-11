"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TenantDomainForm } from "@/components/tenants/TenantDomainForm";
import { TenantDomainList } from "@/components/tenants/TenantDomainList";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenant, usePlatformTenantDomains } from "@/hooks/useSuperAdminPortal";
import { ApiError } from "@/lib/api-client";
import { parseTenantDomainErrors } from "@/lib/tenant-api-errors";

type SuperAdminTenantDomainsPageProps = {
  params: { id: string };
};

export default function SuperAdminTenantDomainsPage({ params }: SuperAdminTenantDomainsPageProps) {
  const router = useRouter();
  const tenantQuery = usePlatformTenant(params.id);
  const domainsQuery = usePlatformTenantDomains(params.id);

  const isLoading = tenantQuery.isLoading || domainsQuery.isLoading;
  const loadError = tenantQuery.error ?? domainsQuery.error;

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed = parseTenantDomainErrors(loadError);
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
        title={tenantQuery.data?.name ? `Domains — ${tenantQuery.data.name}` : "Tenant domains"}
        subtitle="Manage primary and custom domain mappings."
        action={
          <Button asChild variant="ghost">
            <Link href={`/super-admin/tenants/${params.id}`}>&larr; Back to tenant</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading ? (
        <PageError onRetry={() => void domainsQuery.refetch()} />
      ) : null}
      {!isLoading && !loadError && tenantQuery.data ? (
        <div className="tenant-domains-page">
          <TenantDomainList
            tenantId={params.id}
            domains={domainsQuery.data ?? []}
            onForbidden={() => router.replace("/forbidden")}
          />
          <TenantDomainForm
            tenantId={params.id}
            onForbidden={() => router.replace("/forbidden")}
            onCreated={() => void domainsQuery.refetch()}
          />
        </div>
      ) : null}
    </>
  );
}
