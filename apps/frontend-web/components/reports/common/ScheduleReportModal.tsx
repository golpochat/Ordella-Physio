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
import { useCreateScheduledReport } from "@/hooks/useReports";
import { parseReportConfigErrors } from "@/lib/reporting-api-errors";
import type { ScheduledReportFrequency } from "@/lib/reporting-types";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

const WEEKDAY_OPTIONS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

type ScheduleReportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedReportId: string | null;
};

function parseRecipients(value: string): string[] {
  return value
    .split(/[,;\s]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function ScheduleReportModal({ open, onOpenChange, savedReportId }: ScheduleReportModalProps) {
  const router = useRouter();
  const createScheduledReport = useCreateScheduledReport();
  const [frequency, setFrequency] = useState<ScheduledReportFrequency>("WEEKLY");
  const [timeOfDay, setTimeOfDay] = useState("09:00");
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [recipientsInput, setRecipientsInput] = useState("");
  const [inlineError, setInlineError] = useState<string | null>(null);

  function resetForm() {
    setFrequency("WEEKLY");
    setTimeOfDay("09:00");
    setDayOfWeek(1);
    setDayOfMonth(1);
    setRecipientsInput("");
    setInlineError(null);
  }

  function handleClose(nextOpen: boolean) {
    if (!createScheduledReport.isPending) {
      onOpenChange(nextOpen);
      if (!nextOpen) {
        resetForm();
      }
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setInlineError(null);

    if (!savedReportId) {
      setInlineError("Save the report before scheduling email delivery.");
      return;
    }

    const recipients = parseRecipients(recipientsInput);
    if (!recipients.length) {
      setInlineError("At least one valid recipient email is required.");
      return;
    }

    try {
      await createScheduledReport.mutateAsync({
        savedReportId,
        frequency,
        timeOfDay,
        ...(frequency === "WEEKLY" ? { dayOfWeek } : {}),
        ...(frequency === "MONTHLY" ? { dayOfMonth } : {}),
        recipients,
      });
      toast.success("Scheduled report created successfully.");
      handleClose(false);
    } catch (error) {
      const parsed = parseReportConfigErrors(error, "Failed to schedule report.");
      if (parsed.forbidden || parsed.tenantMismatch) {
        router.replace("/forbidden");
        return;
      }
      if (parsed.invalidFrequency || parsed.invalidRecipients) {
        setInlineError(parsed.generalError ?? "Please check the schedule details.");
        return;
      }
      if (parsed.savedReportNotFound) {
        toast.error(parsed.generalError ?? "Saved report does not exist.");
        return;
      }
      toast.error(parsed.generalError ?? "Failed to schedule report.");
    }
  }

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent>
        <form onSubmit={(event) => void handleSubmit(event)}>
          <ModalHeader>
            <ModalTitle>Schedule email report</ModalTitle>
            <ModalDescription>
              Send this saved report to recipients on a recurring schedule.
            </ModalDescription>
          </ModalHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-frequency">Frequency</Label>
              <select
                id="schedule-frequency"
                className={SELECT_CLASS}
                value={frequency}
                onChange={(event) => setFrequency(event.target.value as ScheduledReportFrequency)}
                disabled={createScheduledReport.isPending}
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-time">Time of day</Label>
              <Input
                id="schedule-time"
                type="time"
                value={timeOfDay}
                onChange={(event) => setTimeOfDay(event.target.value)}
                disabled={createScheduledReport.isPending}
                required
              />
            </div>
            {frequency === "WEEKLY" ? (
              <div className="space-y-2">
                <Label htmlFor="schedule-day-of-week">Day of week</Label>
                <select
                  id="schedule-day-of-week"
                  className={SELECT_CLASS}
                  value={dayOfWeek}
                  onChange={(event) => setDayOfWeek(Number(event.target.value))}
                  disabled={createScheduledReport.isPending}
                >
                  {WEEKDAY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            {frequency === "MONTHLY" ? (
              <div className="space-y-2">
                <Label htmlFor="schedule-day-of-month">Day of month</Label>
                <Input
                  id="schedule-day-of-month"
                  type="number"
                  min={1}
                  max={31}
                  value={dayOfMonth}
                  onChange={(event) => setDayOfMonth(Number(event.target.value))}
                  disabled={createScheduledReport.isPending}
                  required
                />
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="schedule-recipients">Recipients</Label>
              <Input
                id="schedule-recipients"
                value={recipientsInput}
                onChange={(event) => setRecipientsInput(event.target.value)}
                placeholder="admin@clinic.com, finance@clinic.com"
                disabled={createScheduledReport.isPending}
              />
              <p className="text-sm text-muted-foreground">Separate multiple emails with commas.</p>
            </div>
            {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
          </div>
          <ModalFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={createScheduledReport.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createScheduledReport.isPending}>
              {createScheduledReport.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling…
                </>
              ) : (
                "Schedule email"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
