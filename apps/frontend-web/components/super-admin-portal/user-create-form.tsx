"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { PageLoading } from "@/components/patient-portal/page-state";
import { useCreatePlatformUser, usePlatformTenants } from "@/hooks/useSuperAdminPortal";
import { getDefaultTenantId } from "@/lib/tenant-config";
import { PLATFORM_OPERATOR_ROLE } from "@/lib/super-admin-portal-utils";

const TENANT_USER_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF"] as const;

export type PlatformUserCreateFormProps = {
  mode?: "platform" | "tenant";
  initialTenantId?: string;
};

export function PlatformUserCreateForm({
  mode: modeProp,
  initialTenantId,
}: PlatformUserCreateFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode =
    modeProp ?? (searchParams.get("mode") === "platform" ? "platform" : "tenant");
  const presetTenantId = initialTenantId ?? searchParams.get("tenantId") ?? "";

  const tenantsQuery = usePlatformTenants();
  const createUser = useCreatePlatformUser();
  const [tenantId, setTenantId] = useState(presetTenantId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<(typeof TENANT_USER_ROLES)[number] | typeof PLATFORM_OPERATOR_ROLE>(
    mode === "platform" ? PLATFORM_OPERATOR_ROLE : "STAFF",
  );

  useEffect(() => {
    if (presetTenantId) {
      setTenantId(presetTenantId);
    } else if (mode === "platform") {
      setTenantId(getDefaultTenantId() ?? "");
    }
  }, [mode, presetTenantId]);

  if (tenantsQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  const tenants = tenantsQuery.data ?? [];
  const isPlatformMode = mode === "platform";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isPlatformMode ? "Create platform operator" : "Create tenant user"}</CardTitle>
        <CardDescription>
          {isPlatformMode
            ? "Grant SYSTEM access for SaaS platform administration."
            : "Register a clinic staff or admin account in the auth service for a tenant."}
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const resolvedTenantId =
              tenantId || (isPlatformMode ? getDefaultTenantId() : undefined);
            if (!resolvedTenantId) {
              toast.error("Select a tenant");
              return;
            }
            createUser.mutate(
              {
                tenantId: resolvedTenantId,
                email,
                password,
                role,
                firstName: firstName.trim() || undefined,
                lastName: lastName.trim() || undefined,
              },
              {
                onSuccess: (response) => {
                  toast.success("User created");
                  const userId = response.user?.id ?? "";
                  if (userId) {
                    router.push(
                      `/super-admin/users/${userId}?tenantId=${encodeURIComponent(resolvedTenantId)}`,
                    );
                    return;
                  }
                  router.push(isPlatformMode ? "/super-admin/users" : `/super-admin/tenants/${resolvedTenantId}`);
                },
                onError: () => toast.error("Failed to create user"),
              },
            );
          }}
        >
          {!isPlatformMode ? (
            <div className="space-y-2">
              <Label htmlFor="tenantId">Tenant</Label>
              <select
                id="tenantId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={tenantId}
                onChange={(event) => setTenantId(event.target.value)}
                required
                disabled={Boolean(presetTenantId)}
              >
                <option value="">Select tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Platform operators are stored under tenant{" "}
              <span className="font-medium text-foreground">
                {tenants.find((tenant) => tenant.id === tenantId)?.name ??
                  tenantId ||
                  "demo-tenant"}
              </span>
              , matching the auth service multi-tenant model.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
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

          {!isPlatformMode ? (
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as (typeof TENANT_USER_ROLES)[number])
                }
              >
                {TENANT_USER_ROLES.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? "Creating..." : "Create user"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
