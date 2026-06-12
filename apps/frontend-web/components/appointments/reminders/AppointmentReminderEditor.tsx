"use client";

import { useEffect, useState } from "react";
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
import {
  useCreateClinicAppointmentReminder,
  useUpdateClinicAppointmentReminder,
} from "@/hooks/useClinicPortal";
import { parseAppointmentReminderErrors } from "@/lib/appointment-api-errors";
import {
  formValueToOffsetMinutes,
  offsetMinutesToFormValue,
  type ReminderOffsetUnit,
} from "@/lib/appointment-reminder-utils";
import type {
  ClinicAppointment,
  ClinicAppointmentReminder,
  ClinicAppointmentReminderChannel,
} from "@/lib/clinic-portal-types";

const CHANNEL_OPTIONS: ClinicAppointmentReminderChannel[] = ["EMAIL", "SMS", "PUSH"];
const UNIT_OPTIONS: ReminderOffsetUnit[] = ["minutes", "hours", "days"];

const CHANNEL_LABELS: Record<ClinicAppointmentReminderChannel, string> = {
  EMAIL: "Email",
  SMS: "SMS",
  PUSH: "Push",
};

export type AppointmentReminderEditorProps = {
  appointment: ClinicAppointment;
  open: boolean;
  reminder?: ClinicAppointmentReminder | null;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export function AppointmentReminderEditor({
  appointment,
  open,
  reminder,
  onOpenChange,
  onSaved,
}: AppointmentReminderEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(reminder);
  const createReminder = useCreateClinicAppointmentReminder(appointment.id);
  const updateReminder = useUpdateClinicAppointmentReminder(
    appointment.id,
    reminder?.id ?? "",
  );

  const [channel, setChannel] = useState<ClinicAppointmentReminderChannel>("EMAIL");
  const [offsetAmount, setOffsetAmount] = useState("60");
  const [offsetUnit, setOffsetUnit] = useState<ReminderOffsetUnit>("minutes");
  const [notifyStaff, setNotifyStaff] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const isPending = createReminder.isPending || updateReminder.isPending;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (reminder) {
      const formValue = offsetMinutesToFormValue(reminder.offsetMinutes);
      setChannel(reminder.channel);
      setOffsetAmount(String(formValue.amount));
      setOffsetUnit(formValue.unit);
      setNotifyStaff(Boolean(reminder.staffId));
    } else {
      setChannel("EMAIL");
      setOffsetAmount("60");
      setOffsetUnit("minutes");
      setNotifyStaff(false);
    }

    setFieldErrors({});
    setGeneralError(null);
  }, [open, reminder]);

  function handleError(error: unknown) {
    const result = parseAppointmentReminderErrors(error);

    if (result.forbidden || result.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (result.appointmentNotFound) {
      toast.error(result.generalError ?? "Appointment does not exist.");
      router.push("/clinic/appointments");
      return;
    }

    if (result.reminderInPast) {
      setGeneralError(result.generalError);
      toast.error(result.generalError ?? "Reminder time must be in the future.");
      return;
    }

    if (Object.keys(result.fieldErrors).length > 0) {
      setFieldErrors(result.fieldErrors);
      return;
    }

    setGeneralError(result.generalError);
    toast.error(result.generalError ?? "Failed to save reminder.");
  }

  function handleSubmit() {
    setFieldErrors({});
    setGeneralError(null);

    const amount = Number(offsetAmount);
    if (!Number.isInteger(amount) || amount <= 0) {
      setFieldErrors({ offsetMinutes: "Offset must be greater than 0." });
      return;
    }

    if (!channel) {
      setFieldErrors({ channel: "Channel is required." });
      return;
    }

    const offsetMinutes = formValueToOffsetMinutes(amount, offsetUnit);
    const payload = {
      channel,
      offsetMinutes,
      ...(notifyStaff ? { staffId: appointment.therapistId } : {}),
    };

    const mutationOptions = {
      onSuccess: (response: { message?: string }) => {
        onOpenChange(false);
        onSaved?.();
        toast.success(response.message ?? "Reminder saved successfully.");
      },
      onError: handleError,
    };

    if (isEditing && reminder) {
      updateReminder.mutate(payload, mutationOptions);
      return;
    }

    createReminder.mutate(payload, mutationOptions);
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{isEditing ? "Edit reminder" : "Add reminder"}</ModalTitle>
          <ModalDescription>
            Schedule a reminder before the appointment start time.
          </ModalDescription>
        </ModalHeader>

        <div className="tenant-create-form-grid">
          <div className="user-list-filter-field">
            <Label htmlFor="reminder-channel">Channel</Label>
            <select
              id="reminder-channel"
              className="tenant-create-form-select"
              value={channel}
              disabled={isPending}
              onChange={(event) =>
                setChannel(event.target.value as ClinicAppointmentReminderChannel)
              }
            >
              {CHANNEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {CHANNEL_LABELS[option]}
                </option>
              ))}
            </select>
            {fieldErrors.channel ? (
              <p className="form-field-error">{fieldErrors.channel}</p>
            ) : null}
          </div>

          <div className="user-list-filter-field">
            <Label htmlFor="reminder-offset-amount">Offset</Label>
            <div className="appointment-reminder-offset-row">
              <Input
                id="reminder-offset-amount"
                type="number"
                min={1}
                value={offsetAmount}
                disabled={isPending}
                onChange={(event) => setOffsetAmount(event.target.value)}
              />
              <select
                id="reminder-offset-unit"
                className="tenant-create-form-select"
                value={offsetUnit}
                disabled={isPending}
                onChange={(event) => setOffsetUnit(event.target.value as ReminderOffsetUnit)}
              >
                {UNIT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {fieldErrors.offsetMinutes ? (
              <p className="form-field-error">{fieldErrors.offsetMinutes}</p>
            ) : null}
          </div>

          <div className="tenant-config-checkbox-row">
            <input
              id="reminder-notify-staff"
              type="checkbox"
              checked={notifyStaff}
              disabled={isPending}
              onChange={(event) => setNotifyStaff(event.target.checked)}
            />
            <Label htmlFor="reminder-notify-staff">Also notify assigned staff</Label>
          </div>
        </div>

        {generalError ? <p className="form-field-error">{generalError}</p> : null}

        <ModalFooter className="gap-2 sm:gap-0">
          <Button variant="outline" disabled={isPending} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={handleSubmit}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isPending ? "Saving..." : "Save reminder"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
