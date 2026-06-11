"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TenantEditForm } from "@/components/tenants/TenantEditForm";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformTenant } from "@/hooks/useSuperAdminPortal";

type SuperAdminTenantEditPageProps = {
  params: { id: string };
};

export default function SuperAdminTenantEditPage({ params }: SuperAdminTenantEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = usePlatformTenant(params.id);

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      toast.error("Tenant not found.");
      router.replace("/super-admin/tenants");
    }
  }, [data, isError, isLoading, router]);

  return (
    <>
      <PageHeader
        title={data?.name ? `Edit ${data.name}` : "Edit tenant"}
        subtitle="Update tenant configuration and status."
        action={
          <Button asChild variant="ghost">
            <Link href={`/super-admin/tenants/${params.id}`}>&larr; Back to tenant</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <TenantEditForm tenant={data} /> : null}
    </>
  );
}
