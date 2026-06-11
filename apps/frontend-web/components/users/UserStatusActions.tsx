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
  useActivateClinicUser,
  useDisableClinicUser,
} from "@/hooks/useClinicPortal";
import type { ClinicUser } from "@/lib/clinic-portal-types";
import { parseUserStatusActionErrors } from "@/lib/user-api-errors";

export type UserStatusActionsProps = {
  user: ClinicUser;
  onStatusChange?: (user: ClinicUser) => void;
};

export function UserStatusActions({ user, onStatusChange }: UserStatusActionsProps) {
  const router = useRouter();
  const disableUser = useDisableClinicUser(user.id);
  const activateUser = useActivateClinicUser(user.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"disable" | "activate" | null>(null);

  const isPending = disableUser.isPending || activateUser.isPending;

  function openConfirm(action: "disable" | "activate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutation = pendingAction === "disable" ? disableUser : activateUser;

    mutation.mutate(undefined, {
      onSuccess: (response) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.user);
        toast.success(
          response.message ??
            (pendingAction === "disable"
              ? "User disabled successfully."
              : "User activated successfully."),
        );
      },
      onError: (error) => {
        const result = parseUserStatusActionErrors(error);

        if (result.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          toast.error(result.message ?? "User not found.");
          router.push("/clinic/users");
          return;
        }

        toast.error(result.message ?? "Failed to update user status.");
      },
    });
  }

  const confirmTitle = pendingAction === "disable" ? "Disable user" : "Activate user";
  const confirmDescription =
    pendingAction === "disable"
      ? "Are you sure you want to disable this user? They will lose access immediately."
      : "Reactivate this user and restore access?";

  return (
    <>
      {user.status === "ACTIVE" ? (
        <Button variant="destructive" disabled={isPending} onClick={() => openConfirm("disable")}>
          {disableUser.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {disableUser.isPending ? "Disabling..." : "Disable user"}
        </Button>
      ) : (
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("activate")}>
          {activateUser.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {activateUser.isPending ? "Activating..." : "Activate user"}
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
              variant={pendingAction === "disable" ? "destructive" : "primary"}
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
