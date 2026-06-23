"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import {
  useAssignOrganizationPortalTenant,
  useOrganizationPortalUnassignedTenants,
} from "@/hooks/useOrganizationPortal";
import { parseOrganizationTenantLinkErrors } from "@/lib/organization-api-errors";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";

export type OrganizationPortalTenantAssignFormProps = {
  organizationId: string;
  onAssigned?: (tenant: OrganizationLinkedTenant) => void;
  exitHref?: string;
};

export function OrganizationPortalTenantAssignForm({
  organizationId,
  onAssigned,
  exitHref = "/organization/billing",
}: OrganizationPortalTenantAssignFormProps) {
  const router = useRouter();
  const { data: unassignedTenants = [], isLoading } =
    useOrganizationPortalUnassignedTenants(organizationId);
  const assignTenant = useAssignOrganizationPortalTenant(organizationId);
  const [tenantId, setTenantId] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign clinic</CardTitle>
        <CardDescription>Link an unassigned clinic tenant to your organization.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          onSubmit={(event) => {
            event.preventDefault();
            setFieldError(null);

            if (!tenantId) {
              setFieldError("Clinic tenant is required");
              return;
            }

            assignTenant.mutate(tenantId, {
              onSuccess: (response) => {
                setTenantId("");
                onAssigned?.(response.tenant);
                toast.success(response.message ?? "Clinic linked successfully.");
              },
              onError: (error) => {
                const result = parseOrganizationTenantLinkErrors(error);

                if (result.forbidden) {
                  router.replace("/access-denied");
                  return;
                }

                if (result.orgNotFound) {
                  toast.error(result.message ?? "Organization not found.");
                  router.replace(exitHref);
                  return;
                }

                toast.error(result.message ?? "Failed to link clinic.");
              },
            });
          }}
        >
          <div className="tenant-create-form-field">
            <Label htmlFor="organization-portal-tenant-select">Clinic tenant</Label>
            <select
              id="organization-portal-tenant-select"
              className="tenant-create-form-select"
              value={tenantId}
              disabled={isLoading || assignTenant.isPending || unassignedTenants.length === 0}
              onChange={(event) => setTenantId(event.target.value)}
            >
              <option value="">
                {isLoading
                  ? "Loading clinics..."
                  : unassignedTenants.length === 0
                    ? "No unassigned clinics available"
                    : "Select a clinic"}
              </option>
              {unassignedTenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.domain ?? tenant.slug})
                </option>
              ))}
            </select>
            {fieldError ? <p className="form-error-banner">{fieldError}</p> : null}
          </div>

          <Button type="submit" className="btn-primary" disabled={assignTenant.isPending || isLoading}>
            {assignTenant.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {assignTenant.isPending ? "Linking..." : "Link clinic"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
