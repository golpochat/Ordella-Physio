"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { UserList } from "@/components/super-admin/users/UserList";
import { useTenantStaffUsers } from "@/hooks/useSuperAdminPortal";

export type TenantUsersSectionProps = {
  tenantId: string;
  tenantName: string;
};

export function TenantUsersSection({ tenantId, tenantName }: TenantUsersSectionProps) {
  const { data, isLoading, isError, refetch } = useTenantStaffUsers(tenantId);
  const users = (data?.data ?? []).map((user) => ({
    ...user,
    tenant: { name: tenantName },
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Tenant users</CardTitle>
            <CardDescription>
              Clinic staff and administrators for {tenantName}. Patients are managed in the clinic
              portal.
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/super-admin/users/create?tenantId=${encodeURIComponent(tenantId)}`}>
              Add tenant user
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {isLoading ? <PageLoading rows={3} /> : null}
        {isError ? <PageError onRetry={() => void refetch()} /> : null}
        {!isLoading && !isError ? (
          <UserList
            users={users}
            emptyMessage="No staff or admin users for this tenant yet."
          />
        ) : null}
      </CardBody>
    </Card>
  );
}
