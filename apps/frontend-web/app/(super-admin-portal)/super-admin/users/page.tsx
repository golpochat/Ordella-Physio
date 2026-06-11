"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/super-admin/users/UserList";
import { usePlatformTenants, usePlatformUsers } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminUsersPage() {
  const { data, isLoading, isError, refetch } = usePlatformUsers();
  const { data: tenants } = usePlatformTenants();

  const users = useMemo(() => {
    const tenantNameById = new Map((tenants ?? []).map((tenant) => [tenant.id, tenant.name]));

    return (data ?? []).map((user) => ({
      ...user,
      tenant: { name: tenantNameById.get(user.tenantId) },
    }));
  }, [data, tenants]);

  return (
    <ListPage
      title="Users"
      subtitle="Global user management across tenants."
      action={
        <Button asChild className="btn-primary">
          <Link href="/super-admin/users/create">Create user</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <UserList users={users} />
    </ListPage>
  );
}
