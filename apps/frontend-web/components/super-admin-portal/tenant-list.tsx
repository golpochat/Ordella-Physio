"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PlatformTenant } from "@/lib/super-admin-portal-types";

export function PlatformTenantList({ tenants }: { tenants: PlatformTenant[] }) {
  if (!tenants.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No tenants found</p>
        <p className="mt-2">Create your first clinic tenant to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tenants.map((tenant) => (
        <Card key={tenant.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{tenant.name}</p>
                <Badge>{tenant.isActive ? "Active" : "Inactive"}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{tenant.slug}</p>
              <p className="text-sm text-muted-foreground">
                {tenant.timezone} · {tenant.currency}
              </p>
            </div>
            <Link
              href={`/super-admin/tenants/${tenant.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Manage tenant
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
