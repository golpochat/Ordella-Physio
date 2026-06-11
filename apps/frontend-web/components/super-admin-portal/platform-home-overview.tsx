"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePlatformBilling,
  usePlatformRoles,
  usePlatformSystemHealth,
  usePlatformTenants,
  usePlatformUsers,
  useSuperAdminContext,
} from "@/hooks/useSuperAdminPortal";

export function PlatformHomeOverview() {
  const { displayName } = useSuperAdminContext();
  const tenantsQuery = usePlatformTenants();
  const usersQuery = usePlatformUsers();
  const rolesQuery = usePlatformRoles();
  const billingQuery = usePlatformBilling();
  const healthQuery = usePlatformSystemHealth();

  const isLoading = tenantsQuery.isLoading || usersQuery.isLoading;
  const isError = tenantsQuery.isError || usersQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void tenantsQuery.refetch();
          void usersQuery.refetch();
          void rolesQuery.refetch();
          void billingQuery.refetch();
          void healthQuery.refetch();
        }}
      />
    );
  }

  const tenants = tenantsQuery.data ?? [];
  const users = usersQuery.data ?? [];
  const roles = rolesQuery.data ?? [];
  const healthyServices = (healthQuery.data ?? []).filter((item) => item.status === "ok").length;

  return (
    <>
      <PageHeader
        title={`Welcome, ${displayName}`}
        subtitle="Platform-wide oversight for tenants, users, and system health."
      />

      <div className="dashboard-stat-grid">
        <Card compact>
          <p className="dashboard-stat-label">Tenants</p>
          <p className="dashboard-stat-value">{tenants.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Users</p>
          <p className="dashboard-stat-value">{users.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Roles</p>
          <p className="dashboard-stat-value">{roles.length}</p>
        </Card>
        <Card compact>
          <p className="dashboard-stat-label">Services healthy</p>
          <p className="dashboard-stat-value">{healthyServices}</p>
        </Card>
      </div>

      <Card>
        <p className="dashboard-section-title">Quick actions</p>
        <div className="dashboard-actions">
          <Button asChild className="btn-primary">
            <Link href="/super-admin/tenants/create">Create tenant</Link>
          </Button>
          <Button asChild className="btn-secondary" variant="outline">
            <Link href="/super-admin/users">Manage users</Link>
          </Button>
          <Button asChild className="btn-secondary" variant="outline">
            <Link href="/super-admin/system">System health</Link>
          </Button>
        </div>
      </Card>
    </>
  );
}
