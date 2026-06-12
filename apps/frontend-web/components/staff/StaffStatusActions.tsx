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
  useActivateClinicStaffMember,
  useDeactivateClinicStaffMember,
} from "@/hooks/useClinicStaffMember";
import { parseStaffMemberStatusActionErrors } from "@/lib/clinic-staff-member-api-errors";
import type {
  ClinicStaffMemberRecord,
  ClinicStaffStatusActionResponse,
} from "@/lib/clinic-staff-member-types";

export type StaffStatusActionsProps = {
  staff: ClinicStaffMemberRecord;
  onStatusChange?: (staff: ClinicStaffMemberRecord) => void;
};

export function StaffStatusActions({ staff, onStatusChange }: StaffStatusActionsProps) {
  const router = useRouter();
  const deactivateStaff = useDeactivateClinicStaffMember(staff.id);
  const activateStaff = useActivateClinicStaffMember(staff.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"deactivate" | "activate" | null>(null);

  const isPending = deactivateStaff.isPending || activateStaff.isPending;

  function openConfirm(action: "deactivate" | "activate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutationOptions = {
      onSuccess: (response: ClinicStaffStatusActionResponse) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.staff);
        toast.success(
          response.message ??
            (pendingAction === "deactivate"
              ? "Staff deactivated successfully."
              : "Staff activated successfully."),
        );
      },
      onError: (error: unknown) => {
        const result = parseStaffMemberStatusActionErrors(error);

        if (result.forbidden || result.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          toast.error(result.message ?? "Staff member does not exist.");
          router.push("/clinic/staff");
          return;
        }

        toast.error(result.message ?? "Failed to update staff status.");
      },
    };

    if (pendingAction === "deactivate") {
      deactivateStaff.mutate(undefined, mutationOptions);
      return;
    }

    activateStaff.mutate(undefined, mutationOptions);
  }

  const confirmTitle =
    pendingAction === "deactivate" ? "Deactivate staff member" : "Activate staff member";
  const confirmDescription =
    pendingAction === "deactivate"
      ? "Are you sure you want to deactivate this staff member? They may be scheduled for upcoming work."
      : "Reactivate this staff member?";

  return (
    <>
      {staff.status === "ACTIVE" ? (
        <Button variant="destructive" disabled={isPending} onClick={() => openConfirm("deactivate")}>
          {deactivateStaff.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {deactivateStaff.isPending ? "Deactivating..." : "Deactivate Staff"}
        </Button>
      ) : (
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("activate")}>
          {activateStaff.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {activateStaff.isPending ? "Activating..." : "Activate Staff"}
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
