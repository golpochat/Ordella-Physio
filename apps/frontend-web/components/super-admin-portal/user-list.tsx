"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PlatformUser } from "@/lib/super-admin-portal-types";
import { getUserDisplayName } from "@/lib/super-admin-portal-utils";

export function PlatformUserList({ users }: { users: PlatformUser[] }) {
  if (!users.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No users found</p>
        <p className="mt-2">Create users or assign staff across tenants.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <Card key={`${user.tenantId}-${user.id}`}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{getUserDisplayName(user)}</p>
                <Badge>{user.role}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.email ?? "No email"} · Tenant {user.tenantId}
              </p>
            </div>
            <Link
              href={`/super-admin/users/${user.id}?tenantId=${user.tenantId}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View user
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
