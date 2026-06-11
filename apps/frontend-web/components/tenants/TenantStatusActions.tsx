"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  useReactivatePlatformTenant,
  useSuspendPlatformTenant,
} from "@/hooks/useSuperAdminPortal";
import { parseTenantStatusActionErrors } from "@/lib/tenant-api-errors";
import type { PlatformTenant } from "@/lib/super-admin-portal-types";

export type TenantStatusActionsProps = {
  tenant: PlatformTenant;
  onStatusChange?: (tenant: PlatformTenant) => void;
};

export function TenantStatusActions({ tenant, onStatusChange }: TenantStatusActionsProps) {
  const router = useRouter();
  const suspendTenant = useSuspendPlatformTenant(tenant.id);
  const reactivateTenant = useReactivatePlatformTenant(tenant.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"suspend" | "reactivate" | null>(null);

  const status = tenant.status ?? (tenant.isActive ? "ACTIVE" : "SUSPENDED");
  const isPending = suspendTenant.isPending || reactivateTenant.isPending;

  function openConfirm(action: "suspend" | "reactivate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutation = pendingAction === "suspend" ? suspendTenant : reactivateTenant;

    mutation.mutate(undefined, {
      onSuccess: (updatedTenant) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(updatedTenant);
        toast.success(
          pendingAction === "suspend"
            ? "Tenant suspended successfully."
            : "Tenant reactivated successfully.",
        );
      },
      onError: (error) => {
        const result = parseTenantStatusActionErrors(error);
        if (result.notFound) {
          toast.error(result.message ?? "Tenant not found.");
          router.push("/super-admin/tenants");
          return;
        }

        toast.error(result.message ?? "Failed to update tenant status.");
      },
    });
  }

  const confirmTitle =
    pendingAction === "suspend" ? "Suspend tenant" : "Reactivate tenant";
  const confirmDescription =
    pendingAction === "suspend"
      ? "Are you sure you want to suspend this tenant? All users will lose access."
      : "Reactivate this tenant and restore access?";

  return (
    <>
      {status === "ACTIVE" ? (
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => openConfirm("suspend")}
        >
          {suspendTenant.isPending ? "Suspending..." : "Suspend tenant"}
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => openConfirm("reactivate")}
        >
          {reactivateTenant.isPending ? "Reactivating..." : "Reactivate tenant"}
        </Button>
      )}

      <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{confirmTitle}</ModalTitle>
            <ModalDescription>{confirmDescription}</ModalDescription>
          </ModalHeader>
          <ModalFooter className="gap-2 sm:gap-0">
            <Button variant="outline" disabled={isPending} onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={pendingAction === "suspend" ? "destructive" : "primary"}
              disabled={isPending}
              onClick={handleConfirm}
            >
              {isPending ? "Working..." : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
