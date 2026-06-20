"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FulfillmentStatusBadge } from "@/components/clinic-pharmacy/status-badges";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useCompletePharmacyFulfillment,
  useFailPharmacyFulfillment,
  useRetryPharmacyFulfillment,
  useStartPharmacyFulfillment,
} from "@/hooks/usePharmacyPortal";
import type { ClinicPrescription } from "@/lib/clinic-pharmacy-types";
import { WithPermission } from "@/lib/auth/withPermission";

export function PharmacyFulfillmentWorkflow({
  prescription,
}: {
  prescription: ClinicPrescription;
}) {
  const [notes, setNotes] = useState(prescription.fulfillment?.notes ?? "");
  const startMutation = useStartPharmacyFulfillment(prescription.id);
  const completeMutation = useCompletePharmacyFulfillment(prescription.id);
  const failMutation = useFailPharmacyFulfillment(prescription.id);
  const retryMutation = useRetryPharmacyFulfillment(prescription.id);
  const fulfillment = prescription.fulfillment;

  async function runAction(label: string, action: () => Promise<unknown>) {
    try {
      await action();
      toast.success(label);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Fulfillment action failed");
    }
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-medium">Fulfillment actions</h3>
        {fulfillment ? <FulfillmentStatusBadge status={fulfillment.status} /> : null}
      </div>

      <Textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Fulfillment notes"
      />

      <div className="flex flex-wrap gap-2">
        <WithPermission permission="fulfillment.start">
          <Button
            type="button"
            variant="secondary"
            disabled={!fulfillment || fulfillment.status !== "PENDING" || startMutation.isPending}
            onClick={() =>
              void runAction("Fulfillment started", () => startMutation.mutateAsync({ notes }))
            }
          >
            Start
          </Button>
        </WithPermission>

        <WithPermission permission="fulfillment.complete">
          <Button
            type="button"
            className="btn-primary"
            disabled={
              !fulfillment || fulfillment.status !== "IN_PROGRESS" || completeMutation.isPending
            }
            onClick={() =>
              void runAction("Fulfillment completed", () => completeMutation.mutateAsync({ notes }))
            }
          >
            Complete
          </Button>
        </WithPermission>

        <WithPermission permission="fulfillment.fail">
          <Button
            type="button"
            variant="destructive"
            disabled={
              !fulfillment ||
              (fulfillment.status !== "PENDING" && fulfillment.status !== "IN_PROGRESS") ||
              failMutation.isPending
            }
            onClick={() =>
              void runAction("Fulfillment marked failed", () => failMutation.mutateAsync({ notes }))
            }
          >
            Fail
          </Button>
        </WithPermission>

        <WithPermission permission="fulfillment.start">
          <Button
            type="button"
            variant="outline"
            disabled={!fulfillment || fulfillment.status !== "FAILED" || retryMutation.isPending}
            onClick={() => void runAction("Fulfillment reset", () => retryMutation.mutateAsync())}
          >
            Retry
          </Button>
        </WithPermission>
      </div>
    </div>
  );
}
