"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/dashboard/Grid";
import { Row } from "@/components/dashboard/Row";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { TenantStatusBadge } from "@/components/super-admin/tenants/TenantStatusBadge";
import { useRemoveOrganizationPortalTenant } from "@/hooks/useOrganizationPortal";
import { parseOrganizationTenantLinkErrors } from "@/lib/organization-api-errors";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";

export type OrganizationPortalTenantListProps = {
  organizationId: string;
  tenants: OrganizationLinkedTenant[];
  onTenantRemoved?: (tenantId: string) => void;
  exitHref?: string;
};

export function OrganizationPortalTenantList({
  organizationId,
  tenants,
  onTenantRemoved,
  exitHref = "/organization/billing",
}: OrganizationPortalTenantListProps) {
  const router = useRouter();
  const removeTenant = useRemoveOrganizationPortalTenant(organizationId);
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
        toast.success(response.message ?? "Clinic unlinked successfully.");
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

        toast.error(result.message ?? "Failed to unlink clinic.");
      },
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Linked clinics</CardTitle>
          <CardDescription>Clinic tenants currently assigned to your organization.</CardDescription>
        </CardHeader>
        <CardBody>
          {tenants.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No clinics linked to this organization yet.
            </p>
          ) : (
            <div className="dashboard-table">
              <Grid variant="organizationTenantsTable" className="dashboard-table-head">
                <p>Clinic</p>
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
                      : "Unlink"}
                  </Button>
                </Row>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Unlink clinic</ModalTitle>
            <ModalDescription>
              Are you sure you want to remove this clinic from your organization?
            </ModalDescription>
          </ModalHeader>
          <ModalFooter className="gap-2 sm:gap-0">
            <Button variant="outline" disabled={removeTenant.isPending} onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={removeTenant.isPending} onClick={handleConfirm}>
              {removeTenant.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {removeTenant.isPending ? "Working..." : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
