"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
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
  const invoices = Array.isArray(billingQuery.data) ? billingQuery.data : [];
  const healthyServices = (healthQuery.data ?? []).filter((item) => item.status === "ok").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">
          Platform-wide oversight for tenants, users, and system health.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tenants</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{tenants.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Users</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{users.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Roles</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{roles.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Services healthy</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{healthyServices}</p>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Quick actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/super-admin/tenants/create">Create tenant</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/super-admin/users/create">Create user</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/super-admin/system">System health</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {invoices.length} billing records visible across the platform.
        </p>
      </section>
    </div>
  );
}
