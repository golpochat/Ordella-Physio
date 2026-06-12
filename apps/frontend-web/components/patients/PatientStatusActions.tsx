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
  useActivateClinicPatient,
  useDeactivateClinicPatient,
} from "@/hooks/useClinicPortal";
import { parsePatientStatusActionErrors } from "@/lib/clinic-patient-api-errors";
import type { ClinicPatient, ClinicPatientStatusActionResponse } from "@/lib/clinic-portal-types";

export type PatientStatusActionsProps = {
  patient: ClinicPatient;
  onStatusChange?: (patient: ClinicPatient) => void;
};

export function PatientStatusActions({ patient, onStatusChange }: PatientStatusActionsProps) {
  const router = useRouter();
  const deactivatePatient = useDeactivateClinicPatient(patient.id);
  const activatePatient = useActivateClinicPatient(patient.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"deactivate" | "activate" | null>(null);

  const isPending = deactivatePatient.isPending || activatePatient.isPending;

  function openConfirm(action: "deactivate" | "activate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutationOptions = {
      onSuccess: (response: ClinicPatientStatusActionResponse) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.patient);
        toast.success(
          response.message ??
            (pendingAction === "deactivate"
              ? "Patient deactivated successfully."
              : "Patient activated successfully."),
        );
      },
      onError: (error: unknown) => {
        const result = parsePatientStatusActionErrors(error);

        if (result.forbidden || result.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          toast.error(result.message ?? "Patient does not exist.");
          router.push("/clinic/patients");
          return;
        }

        toast.error(result.message ?? "Failed to update patient status.");
      },
    };

    if (pendingAction === "deactivate") {
      deactivatePatient.mutate(undefined, mutationOptions);
      return;
    }

    activatePatient.mutate(undefined, mutationOptions);
  }

  const confirmTitle =
    pendingAction === "deactivate" ? "Deactivate patient" : "Activate patient";
  const confirmDescription =
    pendingAction === "deactivate"
      ? "Are you sure you want to deactivate this patient? They may have upcoming appointments."
      : "Reactivate this patient?";

  return (
    <>
      {patient.status === "ACTIVE" ? (
        <Button variant="destructive" disabled={isPending} onClick={() => openConfirm("deactivate")}>
          {deactivatePatient.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {deactivatePatient.isPending ? "Deactivating..." : "Deactivate Patient"}
        </Button>
      ) : (
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("activate")}>
          {activatePatient.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {activatePatient.isPending ? "Activating..." : "Activate Patient"}
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
