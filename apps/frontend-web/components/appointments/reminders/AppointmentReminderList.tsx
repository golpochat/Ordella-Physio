"use client";

import { Badge } from "@/components/dashboard/Badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ClinicAppointmentReminder } from "@/lib/clinic-portal-types";
import { formatReminderOffset } from "@/lib/appointment-reminder-utils";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { cn } from "@/lib/cn";

const CHANNEL_LABELS: Record<string, string> = {
  EMAIL: "Email",
  SMS: "SMS",
  PUSH: "Push",
};

const STATUS_VARIANTS: Record<
  string,
  "info" | "success" | "danger" | "warning" | "muted"
> = {
  SCHEDULED: "info",
  SENT: "success",
  CANCELLED: "muted",
  FAILED: "danger",
};

export type AppointmentReminderListProps = {
  reminders: ClinicAppointmentReminder[];
  isLoading?: boolean;
  onEdit: (reminder: ClinicAppointmentReminder) => void;
};

export function AppointmentReminderList({
  reminders,
  isLoading = false,
  onEdit,
}: AppointmentReminderListProps) {
  if (isLoading) {
    return (
      <div className="appointment-reminder-skeleton">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="appointment-reminder-skeleton-row" />
        ))}
      </div>
    );
  }

  return (
    <DataTable
      columns={["Channel", "Offset", "Scheduled for", "Status", "Last error", "Actions"]}
      grid="reminderTable"
      emptyMessage="No reminders configured."
      isEmpty={reminders.length === 0}
    >
      {reminders.map((reminder) => (
        <Row key={reminder.id}>
          <div className="dashboard-cell-primary">{CHANNEL_LABELS[reminder.channel] ?? reminder.channel}</div>
          <div className="dashboard-cell-muted">{formatReminderOffset(reminder.offsetMinutes)}</div>
          <div className="dashboard-cell-muted">{formatPortalDateTime(reminder.scheduledFor)}</div>
          <div>
            <Badge variant={STATUS_VARIANTS[reminder.status] ?? "muted"}>
              {reminder.status}
            </Badge>
          </div>
          <div className={cn("dashboard-cell-muted", reminder.lastError && "dashboard-cell-danger")}>
            {reminder.lastError ?? "—"}
          </div>
          <div className="user-list-actions">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={reminder.status === "SENT" || reminder.status === "CANCELLED"}
              onClick={() => onEdit(reminder)}
            >
              Edit
            </Button>
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
