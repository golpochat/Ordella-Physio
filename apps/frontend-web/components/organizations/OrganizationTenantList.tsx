"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/clinic-ui/confirm-dialog";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/dashboard/Grid";
import { Row } from "@/components/dashboard/Row";
import { TenantStatusBadge } from "@/components/super-admin/tenants/TenantStatusBadge";
import { useRemoveOrganizationTenant } from "@/hooks/useSuperAdminPortal";
import { parseOrganizationTenantLinkErrors } from "@/lib/organization-api-errors";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";

export type OrganizationTenantListProps = {
  organizationId: string;
  tenants: OrganizationLinkedTenant[];
  onTenantRemoved?: (tenantId: string) => void;
};

export function OrganizationTenantList({
  organizationId,
  tenants,
  onTenantRemoved,
}: OrganizationTenantListProps) {
  const router = useRouter();
  const removeTenant = useRemoveOrganizationTenant(organizationId);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingTenant, setPendingTenant] = useState<OrganizationLinkedTenant | null>(null);

  function openConfirm(tenant: OrganizationLinkedTenant) {
    setPendingTenant(tenant);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingTenant) {
      return;
    }

    removeTenant.mutate(pendingTenant.id, {
      onSuccess: (response) => {
        setConfirmOpen(false);
        setPendingTenant(null);
        onTenantRemoved?.(pendingTenant.id);
        toast.success(response.message ?? "Tenant removed successfully.");
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

        toast.error(result.message ?? "Failed to remove tenant.");
      },
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Linked tenants</CardTitle>
          <CardDescription>Tenants currently assigned to this organization.</CardDescription>
        </CardHeader>
        <CardBody>
          {tenants.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tenants linked to this organization yet.</p>
          ) : (
            <div className="dashboard-table">
              <Grid variant="organizationTenantsTable" className="dashboard-table-head">
                <p>Tenant</p>
                <p>Domain</p>
                <p>Status</p>
                <p>Actions</p>
              </Grid>
              {tenants.map((tenant) => (
                <Row key={tenant.id}>
                  <p className="dashboard-cell-primary">{tenant.name}</p>
                  <p className="dashboard-cell-muted">{tenant.domain ?? tenant.slug}</p>
                  <TenantStatusBadge status={tenant.status} isActive={tenant.isActive} />
                  <Button
                    variant="destructive"
                    disabled={removeTenant.isPending}
                    onClick={() => openConfirm(tenant)}
                  >
                    {removeTenant.isPending && pendingTenant?.id === tenant.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    {removeTenant.isPending && pendingTenant?.id === tenant.id
                      ? "Removing..."
                      : "Remove"}
                  </Button>
                </Row>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove tenant"
        description="Are you sure you want to remove this tenant from the organization?"
        destructive
        loading={removeTenant.isPending}
        requireTenant={false}
        onConfirm={handleConfirm}
      />
    </>
  );
}
