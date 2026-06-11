"use client";

import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PlatformRoleDetail } from "@/components/super-admin-portal/role-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformRole } from "@/hooks/useSuperAdminPortal";

type SuperAdminRoleDetailPageProps = {
  params: { id: string };
};

export default function SuperAdminRoleDetailPage({ params }: SuperAdminRoleDetailPageProps) {
  const { data, isLoading, isError, refetch } = usePlatformRole(params.id);

  return (
    <>
      <PageHeader
        title={data?.name ?? "Role"}
        subtitle={data?.description ?? "Review and manage role permissions."}
        action={
          <Button asChild variant="ghost">
            <Link href="/super-admin/roles">&larr; Back to roles</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PlatformRoleDetail role={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Role not found." /> : null}
    </>
  );
}
