"use client";

import Link from "next/link";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { RoleList } from "@/components/super-admin/roles/RoleList";
import { usePlatformRoles } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminRolesPage() {
  const { data, isLoading, isError, refetch } = usePlatformRoles();

  return (
    <ListPage
      title="Roles"
      subtitle="Platform role definitions and permissions."
      action={
        <Button asChild className="btn-primary">
          <Link href="/super-admin/roles/create">Create role</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <RoleList roles={data ?? []} />
    </ListPage>
  );
}
