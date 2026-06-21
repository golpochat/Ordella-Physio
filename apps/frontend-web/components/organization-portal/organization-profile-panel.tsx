"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { UserProfileForm } from "@/components/user-portal/profile-form";
import { useAuth } from "@/hooks/useAuth";
import { useBillingContext } from "@/hooks/useClinicPortal";

function formatRoleLabel(role: string | undefined): string {
  if (!role) {
    return "Organization user";
  }

  return role
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

export function OrganizationProfilePanel() {
  const { user } = useAuth();
  const billingContextQuery = useBillingContext();
  const organizationName =
    billingContextQuery.data?.organizationName ?? user?.organizationId ?? "Organization";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your organization admin account and view organization context."
      />

      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Your organization-level access context.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-muted-foreground">Organization</p>
              <p className="font-medium">{organizationName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium">{formatRoleLabel(user?.role)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email ?? "—"}</p>
            </div>
          </div>
          <div>
            <Button variant="outline" asChild>
              <Link href="/organization/billing">Manage organization billing</Link>
            </Button>
          </div>
        </CardBody>
      </Card>

      <UserProfileForm />
    </div>
  );
}
