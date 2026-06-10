"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useDeletePlatformRole, useUpdatePlatformRole } from "@/hooks/useSuperAdminPortal";
import type { PlatformRole } from "@/lib/super-admin-portal-types";

export function PlatformRoleDetail({ role }: { role: PlatformRole }) {
  const router = useRouter();
  const updateRole = useUpdatePlatformRole(role.id);
  const deleteRole = useDeletePlatformRole();
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const isBuiltin = ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"].includes(role.id);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{role.name}</CardTitle>
            <Badge>Level {role.level}</Badge>
            {isBuiltin ? <Badge>Built-in</Badge> : null}
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              updateRole.mutate(
                { name, description },
                {
                  onSuccess: () => toast.success("Role updated"),
                  onError: () =>
                    toast.error("Unable to update role. The roles API may not be available yet."),
                },
              );
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Role name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isBuiltin}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isBuiltin}
              />
            </div>
            <div>
              <p className="text-sm font-medium">Permissions</p>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                {role.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </div>
            {!isBuiltin ? (
              <Button type="submit" disabled={updateRole.isPending}>
                {updateRole.isPending ? "Saving..." : "Save changes"}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Built-in roles are read-only until the roles service supports mutation.
              </p>
            )}
          </form>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        {!isBuiltin ? (
          <Button
            variant="destructive"
            disabled={deleteRole.isPending}
            onClick={() => {
              if (!window.confirm("Delete this role?")) return;
              deleteRole.mutate(role.id, {
                onSuccess: () => {
                  toast.success("Role deleted");
                  router.push("/super-admin/roles");
                },
                onError: () => toast.error("Failed to delete role"),
              });
            }}
          >
            Delete role
          </Button>
        ) : null}
        <Button asChild variant="outline">
          <Link href="/super-admin/roles">Back to roles</Link>
        </Button>
      </div>
    </div>
  );
}
