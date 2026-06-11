"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
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
  useActivatePlatformOrganization,
  useDeactivatePlatformOrganization,
} from "@/hooks/useSuperAdminPortal";
import { parseOrganizationStatusActionErrors } from "@/lib/organization-api-errors";
import type { PlatformOrganization } from "@/lib/super-admin-portal-types";

export type OrganizationStatusActionsProps = {
  organization: PlatformOrganization;
  onStatusChange?: (organization: PlatformOrganization) => void;
};

export function OrganizationStatusActions({
  organization,
  onStatusChange,
}: OrganizationStatusActionsProps) {
  const router = useRouter();
  const deactivateOrganization = useDeactivatePlatformOrganization(organization.id);
  const activateOrganization = useActivatePlatformOrganization(organization.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"deactivate" | "activate" | null>(null);

  const isPending = deactivateOrganization.isPending || activateOrganization.isPending;

  function openConfirm(action: "deactivate" | "activate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutation =
      pendingAction === "deactivate" ? deactivateOrganization : activateOrganization;

    mutation.mutate(undefined, {
      onSuccess: (response) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.organization);
        toast.success(
          response.message ??
            (pendingAction === "deactivate"
              ? "Organization deactivated successfully."
              : "Organization activated successfully."),
        );
      },
      onError: (error) => {
        const result = parseOrganizationStatusActionErrors(error);

        if (result.forbidden) {
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          toast.error(result.message ?? "Organization not found.");
          router.push("/super-admin/organizations");
          return;
        }

        toast.error(result.message ?? "Failed to update organization status.");
      },
    });
  }

  const confirmTitle =
    pendingAction === "deactivate" ? "Deactivate organization" : "Activate organization";
  const confirmDescription =
    pendingAction === "deactivate"
      ? "Are you sure you want to deactivate this organization? All associated tenants may be affected."
      : "Reactivate this organization?";

  return (
    <>
      {organization.status === "ACTIVE" ? (
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => openConfirm("deactivate")}
        >
          {deactivateOrganization.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {deactivateOrganization.isPending ? "Deactivating..." : "Deactivate Organization"}
        </Button>
      ) : (
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("activate")}>
          {activateOrganization.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {activateOrganization.isPending ? "Activating..." : "Activate Organization"}
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
              variant={pendingAction === "deactivate" ? "destructive" : "primary"}
              disabled={isPending}
              onClick={handleConfirm}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isPending ? "Working..." : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
