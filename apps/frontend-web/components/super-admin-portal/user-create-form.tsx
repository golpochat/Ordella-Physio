"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { PageLoading } from "@/components/patient-portal/page-state";
import { useCreatePlatformUser, usePlatformTenants } from "@/hooks/useSuperAdminPortal";

const USER_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF"] as const;

export function PlatformUserCreateForm() {
  const router = useRouter();
  const tenantsQuery = usePlatformTenants();
  const createUser = useCreatePlatformUser();
  const [tenantId, setTenantId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<(typeof USER_ROLES)[number]>("STAFF");

  if (tenantsQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  const tenants = tenantsQuery.data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create user</CardTitle>
        <CardDescription>Register a new user for a tenant via the auth service.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!tenantId) {
              toast.error("Select a tenant");
              return;
            }
            createUser.mutate(
              { tenantId, email, password, role },
              {
                onSuccess: (response) => {
                  toast.success("User created");
                  const userId = response.user?.id ?? "";
                  router.push(
                    userId
                      ? `/super-admin/users/${userId}?tenantId=${tenantId}`
                      : "/super-admin/users",
                  );
                },
                onError: () => toast.error("Failed to create user"),
              },
            );
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="tenantId">Tenant</Label>
            <select
              id="tenantId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={tenantId}
              onChange={(event) => setTenantId(event.target.value)}
              required
            >
              <option value="">Select tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={role}
              onChange={(event) => setRole(event.target.value as (typeof USER_ROLES)[number])}
            >
              {USER_ROLES.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? "Creating..." : "Create user"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
