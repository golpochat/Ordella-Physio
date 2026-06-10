"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformRoleList } from "@/components/super-admin-portal/role-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformRoles } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminRolesPage() {
  const { data, isLoading, isError, refetch } = usePlatformRoles();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Roles</h1>
          <p className="text-muted-foreground">Platform role definitions and permissions.</p>
        </div>
        <Button asChild>
          <Link href="/super-admin/roles/create">Create role</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PlatformRoleList roles={data ?? []} /> : null}
    </div>
  );
}
