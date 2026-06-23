"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/clinic-ui/confirm-dialog";
import {
  useActivateClinicLocation,
  useDeactivateClinicLocation,
} from "@/hooks/useClinicPortal";
import { parseLocationStatusActionErrors } from "@/lib/location-api-errors";
import type { ClinicLocation } from "@/lib/clinic-portal-types";

export type LocationStatusActionsProps = {
  location: ClinicLocation;
  onStatusChange?: (location: ClinicLocation) => void;
};

export function LocationStatusActions({ location, onStatusChange }: LocationStatusActionsProps) {
  const router = useRouter();
  const deactivateLocation = useDeactivateClinicLocation(location.id);
  const activateLocation = useActivateClinicLocation(location.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"deactivate" | "activate" | null>(null);

  const isPending = deactivateLocation.isPending || activateLocation.isPending;

  function openConfirm(action: "deactivate" | "activate") {
    setPendingAction(action);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutation = pendingAction === "deactivate" ? deactivateLocation : activateLocation;

    mutation.mutate(undefined, {
      onSuccess: (response) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.location);
        toast.success(
          response.message ??
            (pendingAction === "deactivate"
              ? "Location deactivated successfully."
              : "Location activated successfully."),
        );
      },
      onError: (error) => {
        const result = parseLocationStatusActionErrors(error);

        if (result.forbidden || result.tenantMismatch) {
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          toast.error(result.message ?? "Location does not exist.");
          router.push("/clinic/locations");
          return;
        }

        toast.error(result.message ?? "Failed to update location status.");
      },
    });
  }

  const confirmTitle =
    pendingAction === "deactivate" ? "Deactivate location" : "Activate location";
  const confirmDescription =
    pendingAction === "deactivate"
      ? "Are you sure you want to deactivate this location? Staff and patients may be affected."
      : "Reactivate this location?";

  return (
    <>
      {location.status === "ACTIVE" ? (
        <Button variant="destructive" disabled={isPending} onClick={() => openConfirm("deactivate")}>
          {deactivateLocation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {deactivateLocation.isPending ? "Deactivating..." : "Deactivate Location"}
        </Button>
      ) : (
        <Button variant="outline" disabled={isPending} onClick={() => openConfirm("activate")}>
          {activateLocation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {activateLocation.isPending ? "Activating..." : "Activate Location"}
        </Button>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          setConfirmOpen(open);
          if (!open) {
            setPendingAction(null);
          }
        }}
        title={confirmTitle}
        description={confirmDescription}
        destructive={pendingAction === "deactivate"}
        loading={isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
