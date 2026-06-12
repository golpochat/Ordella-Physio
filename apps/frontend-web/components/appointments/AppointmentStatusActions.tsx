"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Badge } from "@/components/dashboard/Badge";
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
  useCancelClinicAppointment,
  useCompleteClinicAppointment,
  useMarkClinicAppointmentNoShow,
} from "@/hooks/useClinicPortal";
import { parseAppointmentStatusActionErrors } from "@/lib/appointment-api-errors";
import type {
  ClinicAppointment,
  ClinicAppointmentStatusActionResponse,
} from "@/lib/clinic-portal-types";

type StatusAction = "cancel" | "complete" | "no-show";

const ACTION_COPY: Record<
  StatusAction,
  { title: string; description: string; confirmLabel: string; successMessage: string }
> = {
  cancel: {
    title: "Cancel appointment",
    description: "Are you sure you want to cancel this appointment?",
    confirmLabel: "Cancel appointment",
    successMessage: "Appointment cancelled successfully.",
  },
  complete: {
    title: "Mark as completed",
    description: "Mark this appointment as completed?",
    confirmLabel: "Mark as completed",
    successMessage: "Appointment completed successfully.",
  },
  "no-show": {
    title: "Mark as no-show",
    description: "Mark this appointment as a no-show?",
    confirmLabel: "Mark as no-show",
    successMessage: "Appointment marked as no-show.",
  },
};

export type AppointmentStatusActionsProps = {
  appointment: ClinicAppointment;
  onStatusChange?: (appointment: ClinicAppointment) => void;
};

export function AppointmentStatusActions({
  appointment,
  onStatusChange,
}: AppointmentStatusActionsProps) {
  const router = useRouter();
  const cancelAppointment = useCancelClinicAppointment(appointment.id);
  const completeAppointment = useCompleteClinicAppointment(appointment.id);
  const markNoShow = useMarkClinicAppointmentNoShow(appointment.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<StatusAction | null>(null);

  const isPending =
    cancelAppointment.isPending || completeAppointment.isPending || markNoShow.isPending;

  function openConfirm(action: StatusAction) {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleMutationError(error: unknown) {
    const result = parseAppointmentStatusActionErrors(error);

    if (result.forbidden || result.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (result.notFound) {
      toast.error(result.message ?? "Appointment does not exist.");
      router.push("/clinic/appointments");
      return;
    }

    toast.error(result.message ?? "Failed to update appointment status.");
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutationOptions = {
      onSuccess: (response: ClinicAppointmentStatusActionResponse) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.appointment);
        toast.success(response.message ?? ACTION_COPY[pendingAction].successMessage);
      },
      onError: handleMutationError,
    };

    if (pendingAction === "cancel") {
      cancelAppointment.mutate(undefined, mutationOptions);
      return;
    }

    if (pendingAction === "complete") {
      completeAppointment.mutate(undefined, mutationOptions);
      return;
    }

    markNoShow.mutate(undefined, mutationOptions);
  }

  if (appointment.status === "CANCELLED") {
    return <Badge variant="danger">Cancelled</Badge>;
  }

  if (appointment.status === "COMPLETED") {
    return <Badge variant="success">Completed</Badge>;
  }

  if (appointment.status === "NO_SHOW") {
    return <Badge variant="warning">No show</Badge>;
  }

  if (appointment.status !== "SCHEDULED") {
    return null;
  }

  const pendingCopy = pendingAction ? ACTION_COPY[pendingAction] : null;

  return (
    <>
      <div className="user-list-actions">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => openConfirm("cancel")}
        >
          {cancelAppointment.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {cancelAppointment.isPending ? "Cancelling..." : "Cancel Appointment"}
        </Button>
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("complete")}>
          {completeAppointment.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {completeAppointment.isPending ? "Completing..." : "Mark as Completed"}
        </Button>
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("no-show")}>
          {markNoShow.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {markNoShow.isPending ? "Updating..." : "Mark as No-Show"}
        </Button>
      </div>

      <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{pendingCopy?.title}</ModalTitle>
            <ModalDescription>{pendingCopy?.description}</ModalDescription>
          </ModalHeader>
          <ModalFooter className="gap-2 sm:gap-0">
            <Button variant="outline" disabled={isPending} onClick={() => setConfirmOpen(false)}>
              Close
            </Button>
            <Button
              variant={pendingAction === "cancel" ? "destructive" : "primary"}
              disabled={isPending}
              onClick={handleConfirm}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isPending ? "Working..." : pendingCopy?.confirmLabel}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
