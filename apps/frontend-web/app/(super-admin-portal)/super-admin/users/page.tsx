"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformUserList } from "@/components/super-admin-portal/user-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformUsers } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminUsersPage() {
  const { data, isLoading, isError, refetch } = usePlatformUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-muted-foreground">Global user management across tenants.</p>
        </div>
        <Button asChild>
          <Link href="/super-admin/users/create">Create user</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PlatformUserList users={data ?? []} /> : null}
    </div>
  );
}
