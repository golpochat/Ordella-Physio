"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import {
  useAssignOrganizationTenant,
  useUnassignedOrganizationTenants,
} from "@/hooks/useSuperAdminPortal";
import { parseOrganizationTenantLinkErrors } from "@/lib/organization-api-errors";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";

export type OrganizationTenantAssignFormProps = {
  organizationId: string;
  onAssigned?: (tenant: OrganizationLinkedTenant) => void;
};

export function OrganizationTenantAssignForm({
  organizationId,
  onAssigned,
}: OrganizationTenantAssignFormProps) {
  const router = useRouter();
  const { data: unassignedTenants = [], isLoading } = useUnassignedOrganizationTenants(organizationId);
  const assignTenant = useAssignOrganizationTenant(organizationId);
  const [tenantId, setTenantId] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign tenant</CardTitle>
        <CardDescription>Link an unassigned tenant to this organization.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          onSubmit={(event) => {
            event.preventDefault();
            setFieldError(null);

            if (!tenantId) {
              setFieldError("Tenant is required");
              return;
            }

            assignTenant.mutate(tenantId, {
              onSuccess: (response) => {
                setTenantId("");
                onAssigned?.(response.tenant);
                toast.success(response.message ?? "Tenant assigned successfully.");
              },
              onError: (error) => {
                const result = parseOrganizationTenantLinkErrors(error);

                if (result.forbidden) {
                  router.replace("/forbidden");
                  return;
                }

                if (result.orgNotFound) {
                  toast.error(result.message ?? "Organization not found.");
                  router.replace("/super-admin/organizations");
                  return;
                }

                toast.error(result.message ?? "Failed to assign tenant.");
              },
            });
          }}
        >
          <div className="tenant-create-form-field">
            <Label htmlFor="organization-tenant-select">Tenant</Label>
            <select
              id="organization-tenant-select"
              className="tenant-create-form-select"
              value={tenantId}
              disabled={isLoading || assignTenant.isPending || unassignedTenants.length === 0}
              onChange={(event) => setTenantId(event.target.value)}
            >
              <option value="">
                {isLoading
                  ? "Loading tenants..."
                  : unassignedTenants.length === 0
                    ? "No unassigned tenants available"
                    : "Select a tenant"}
              </option>
              {unassignedTenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.domain ?? tenant.slug})
                </option>
              ))}
            </select>
            {fieldError ? <p className="tenant-create-form-error">{fieldError}</p> : null}
          </div>

          <Button type="submit" className="btn-primary" disabled={assignTenant.isPending || isLoading}>
            {assignTenant.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {assignTenant.isPending ? "Assigning..." : "Assign tenant"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
