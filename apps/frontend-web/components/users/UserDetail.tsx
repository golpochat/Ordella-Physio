"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStatusActions } from "@/components/users/UserStatusActions";
import { UserStatusBadge } from "@/components/users/UserStatusBadge";
import type { ClinicUser } from "@/lib/clinic-portal-types";

function formatName(user: ClinicUser): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || user.email;
}

export type UserDetailProps = {
  user: ClinicUser;
};

export function UserDetail({ user: initialUser }: UserDetailProps) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{formatName(user)}</CardTitle>
            <UserStatusBadge status={user.status} />
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="dashboard-cell-primary">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Phone</dt>
              <dd className="dashboard-cell-muted">{user.phone ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Role</dt>
              <dd className="dashboard-cell-muted">{user.role}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd>
                <UserStatusBadge status={user.status} />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <UserStatusActions user={user} onStatusChange={setUser} />
            <Button asChild variant="outline">
              <Link href={`/clinic/users/${user.id}/edit`}>Edit user</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/clinic/users/${user.id}/role`}>Change role</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/clinic/users/${user.id}/reset-password`}>Reset password</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
