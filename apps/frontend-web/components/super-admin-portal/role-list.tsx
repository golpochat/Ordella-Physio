"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PlatformRole } from "@/lib/super-admin-portal-types";

export function PlatformRoleList({ roles }: { roles: PlatformRole[] }) {
  if (!roles.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No roles found</p>
        <p className="mt-2">Define platform roles and permissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {roles.map((role) => (
        <Card key={role.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{role.name}</p>
                <Badge>Level {role.level}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
              <p className="text-xs text-muted-foreground">
                {role.permissions.length} permissions
              </p>
            </div>
            <Link
              href={`/super-admin/roles/${role.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View role
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
