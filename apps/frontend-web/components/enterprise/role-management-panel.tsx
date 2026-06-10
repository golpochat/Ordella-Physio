"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateEnterpriseRole, useEnterpriseRoles } from "@/hooks/useEnterprise";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

export function RoleManagementPanel() {
  const rolesQuery = useEnterpriseRoles();
  const createRole = useCreateEnterpriseRole();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [permissions, setPermissions] = useState("patient.read,appointment.read");

  if (rolesQuery.isLoading) return <PageLoading rows={4} />;
  if (rolesQuery.isError) return <PageError onRetry={() => void rolesQuery.refetch()} />;

  const roles = rolesQuery.data ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create custom role</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role name</Label>
            <Input id="roleName" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roleSlug">Slug</Label>
            <Input id="roleSlug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="permissions">Permissions (comma-separated)</Label>
            <Input
              id="permissions"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
            />
          </div>
          <Button
            disabled={createRole.isPending || !name || !slug}
            onClick={() =>
              void createRole.mutateAsync({
                name,
                slug,
                permissions: permissions.split(",").map((p) => p.trim()).filter(Boolean),
              })
            }
          >
            Create role
          </Button>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardBody className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{role.name}</p>
                <p className="text-sm text-muted-foreground">{role.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(role.permissions as string[]).slice(0, 4).map((permission) => (
                  <Badge key={permission} variant="outline">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
