"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useCreateSavedReport } from "@/hooks/useReports";
import { parseReportConfigErrors } from "@/lib/reporting-api-errors";
import type { SavedReportConfig, SavedReportType } from "@/lib/reporting-types";
import { savedReportTypeLabel } from "@/lib/saved-report-utils";

type SaveReportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: SavedReportType;
  config: SavedReportConfig;
  onSaved?: (savedReportId: string) => void;
};

export function SaveReportModal({
  open,
  onOpenChange,
  type,
  config,
  onSaved,
}: SaveReportModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const createSavedReport = useCreateSavedReport();

  function handleClose(nextOpen: boolean) {
    if (!createSavedReport.isPending) {
      onOpenChange(nextOpen);
      if (!nextOpen) {
        setName("");
      }
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    try {
      const saved = await createSavedReport.mutateAsync({
        name: name.trim(),
        type,
        config,
      });
      toast.success("Report saved successfully.");
      onSaved?.(saved.id);
      handleClose(false);
    } catch (error) {
      const parsed = parseReportConfigErrors(error, "Failed to save report.");
      if (parsed.forbidden || parsed.tenantMismatch) {
        router.replace("/forbidden");
        return;
      }
      if (parsed.invalidReportConfig) {
        toast.error(parsed.generalError ?? "The report configuration is invalid.");
        return;
      }
      toast.error(parsed.generalError ?? "Failed to save report.");
    }
  }

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent>
        <form onSubmit={(event) => void handleSubmit(event)}>
          <ModalHeader>
            <ModalTitle>Save report</ModalTitle>
            <ModalDescription>
              Store the current filters so you can reopen or schedule this report later.
            </ModalDescription>
          </ModalHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="saved-report-name">Name</Label>
              <Input
                id="saved-report-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Monthly appointment summary"
                required
                disabled={createSavedReport.isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saved-report-type">Type</Label>
              <Input id="saved-report-type" value={savedReportTypeLabel(type)} readOnly disabled />
            </div>
          </div>
          <ModalFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={createSavedReport.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createSavedReport.isPending || !name.trim()}>
              {createSavedReport.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save report"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
