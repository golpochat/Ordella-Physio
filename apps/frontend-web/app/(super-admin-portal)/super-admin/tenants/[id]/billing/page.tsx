"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TenantBillingForm } from "@/components/tenants/TenantBillingForm";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenant, usePlatformTenantBilling } from "@/hooks/useSuperAdminPortal";
import { ApiError } from "@/lib/api-client";
import { parseTenantBillingErrors } from "@/lib/tenant-api-errors";

type SuperAdminTenantBillingPageProps = {
  params: { id: string };
};

export default function SuperAdminTenantBillingPage({ params }: SuperAdminTenantBillingPageProps) {
  const router = useRouter();
  const tenantQuery = usePlatformTenant(params.id);
  const billingQuery = usePlatformTenantBilling(params.id);

  const isLoading = tenantQuery.isLoading || billingQuery.isLoading;
  const loadError = tenantQuery.error ?? billingQuery.error;

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed = parseTenantBillingErrors(loadError);
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
        title={tenantQuery.data?.name ? `Billing — ${tenantQuery.data.name}` : "Tenant billing"}
        subtitle="Manage invoice and billing contact details."
        action={
          <Button asChild variant="ghost">
            <Link href={`/super-admin/tenants/${params.id}`}>&larr; Back to tenant</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading ? (
        <PageError onRetry={() => void billingQuery.refetch()} />
      ) : null}
      {!isLoading && !loadError && tenantQuery.data ? (
        <TenantBillingForm
          tenant={tenantQuery.data}
          initialValues={billingQuery.data ?? null}
          onForbidden={() => router.replace("/forbidden")}
        />
      ) : null}
    </>
  );
}
