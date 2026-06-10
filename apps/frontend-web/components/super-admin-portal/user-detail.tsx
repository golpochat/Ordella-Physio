"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useDeletePlatformUser, useUpdatePlatformUser } from "@/hooks/useSuperAdminPortal";
import type { PlatformUser } from "@/lib/super-admin-portal-types";
import { formatPortalDateTime, getUserDisplayName } from "@/lib/super-admin-portal-utils";

const USER_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF"] as const;

export function PlatformUserDetail({ user }: { user: PlatformUser }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId") ?? user.tenantId;
  const updateUser = useUpdatePlatformUser(user.id, tenantId);
  const deleteUser = useDeletePlatformUser();
  const [email, setEmail] = useState(user.email ?? "");
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    setEmail(user.email ?? "");
    setRole(user.role);
  }, [user]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{getUserDisplayName(user)}</CardTitle>
            <Badge>{user.role}</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              updateUser.mutate(
                { email: email || undefined, role: role as (typeof USER_ROLES)[number] },
                {
                  onSuccess: () => toast.success("User updated"),
                  onError: () =>
                    toast.error("Unable to update user. The users API may not be available yet."),
                },
              );
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  {USER_ROLES.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tenantId">Tenant ID</Label>
                <Input id="tenantId" value={tenantId} disabled />
              </div>
            </div>
            {user.createdAt ? (
              <p className="text-sm text-muted-foreground">
                Created {formatPortalDateTime(user.createdAt)}
              </p>
            ) : null}
            <Button type="submit" disabled={updateUser.isPending}>
              {updateUser.isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="destructive"
          disabled={deleteUser.isPending}
          onClick={() => {
            if (!window.confirm("Delete this user?")) return;
            deleteUser.mutate(
              { id: user.id, tenantId },
              {
                onSuccess: () => {
                  toast.success("User deleted");
                  router.push("/super-admin/users");
                },
                onError: () =>
                  toast.error("Unable to delete user. The users API may not be available yet."),
              },
            );
          }}
        >
          Delete user
        </Button>
        <Button asChild variant="outline">
          <Link href="/super-admin/users">Back to users</Link>
        </Button>
      </div>
    </div>
  );
}
