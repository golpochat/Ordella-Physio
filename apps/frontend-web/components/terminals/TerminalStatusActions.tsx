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
  useActivateClinicTerminal,
  useDeactivateClinicTerminal,
} from "@/hooks/useTerminalPortal";
import { parseTerminalStatusActionErrors } from "@/lib/terminal-api-errors";
import type {
  ClinicTerminal,
  ClinicTerminalStatusActionResponse,
} from "@/lib/terminal-portal-types";

export type TerminalStatusActionsProps = {
  terminal: ClinicTerminal;
  onStatusChange?: (terminal: ClinicTerminal) => void;
};

export function TerminalStatusActions({ terminal, onStatusChange }: TerminalStatusActionsProps) {
  const router = useRouter();
  const deactivateTerminal = useDeactivateClinicTerminal(terminal.id);
  const activateTerminal = useActivateClinicTerminal(terminal.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"deactivate" | "activate" | null>(null);

  const isPending = deactivateTerminal.isPending || activateTerminal.isPending;

  function openConfirm(action: "deactivate" | "activate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutationOptions = {
      onSuccess: (response: ClinicTerminalStatusActionResponse) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.terminal);
        toast.success(
          response.message ??
            (pendingAction === "deactivate"
              ? "Terminal deactivated successfully."
              : "Terminal activated successfully."),
        );
      },
      onError: (error: unknown) => {
        const result = parseTerminalStatusActionErrors(error);

        if (result.forbidden || result.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          toast.error(result.message ?? "Terminal does not exist.");
          router.push("/clinic/terminals");
          return;
        }

        toast.error(result.message ?? "Failed to update terminal status.");
      },
    };

    if (pendingAction === "deactivate") {
      deactivateTerminal.mutate(undefined, mutationOptions);
      return;
    }

    activateTerminal.mutate(undefined, mutationOptions);
  }

  const confirmTitle =
    pendingAction === "deactivate" ? "Deactivate terminal" : "Activate terminal";
  const confirmDescription =
    pendingAction === "deactivate"
      ? "Are you sure you want to deactivate this terminal? It may interrupt ongoing operations."
      : "Reactivate this terminal?";

  return (
    <>
      {terminal.status === "ACTIVE" ? (
        <Button variant="destructive" disabled={isPending} onClick={() => openConfirm("deactivate")}>
          {deactivateTerminal.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {deactivateTerminal.isPending ? "Deactivating..." : "Deactivate Terminal"}
        </Button>
      ) : (
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("activate")}>
          {activateTerminal.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {activateTerminal.isPending ? "Activating..." : "Activate Terminal"}
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
