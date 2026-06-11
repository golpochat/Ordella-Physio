"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TenantLocalizationForm } from "@/components/tenants/TenantLocalizationForm";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenant, usePlatformTenantLocalization } from "@/hooks/useSuperAdminPortal";
import { ApiError } from "@/lib/api-client";
import { parseTenantLocalizationErrors } from "@/lib/tenant-api-errors";
import { useTenantStore } from "@/store/tenant.store";

type SuperAdminTenantLocalizationPageProps = {
  params: { id: string };
};

export default function SuperAdminTenantLocalizationPage({
  params,
}: SuperAdminTenantLocalizationPageProps) {
  const router = useRouter();
  const tenantQuery = usePlatformTenant(params.id);
  const localizationQuery = usePlatformTenantLocalization(params.id);
  const setTenantLocalization = useTenantStore((state) => state.setTenantLocalization);

  const isLoading = tenantQuery.isLoading || localizationQuery.isLoading;
  const loadError = tenantQuery.error ?? localizationQuery.error;

  useEffect(() => {
    if (localizationQuery.data) {
      setTenantLocalization({
        timezone: localizationQuery.data.timezone,
        currency: localizationQuery.data.currency,
        dateFormat: localizationQuery.data.dateFormat,
        timeFormat: localizationQuery.data.timeFormat,
        numberFormat: localizationQuery.data.numberFormat,
      });
    }
  }, [localizationQuery.data, setTenantLocalization]);

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed = parseTenantLocalizationErrors(loadError);
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
          tenantQuery.data?.name
            ? `Localization — ${tenantQuery.data.name}`
            : "Tenant localization"
        }
        subtitle="Configure timezone, currency, and regional formatting."
        action={
          <Button asChild variant="ghost">
            <Link href={`/super-admin/tenants/${params.id}`}>&larr; Back to tenant</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading ? (
        <PageError onRetry={() => void localizationQuery.refetch()} />
      ) : null}
      {!isLoading && !loadError && tenantQuery.data && localizationQuery.data ? (
        <TenantLocalizationForm
          tenantId={params.id}
          tenantName={tenantQuery.data.name}
          initialValues={localizationQuery.data}
          onForbidden={() => router.replace("/forbidden")}
        />
      ) : null}
    </>
  );
}
