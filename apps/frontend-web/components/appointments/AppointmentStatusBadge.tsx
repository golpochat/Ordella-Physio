import { Badge } from "@/components/dashboard/Badge";
import type { ClinicAppointmentStatus } from "@/lib/clinic-portal-types";

const STATUS_LABELS: Record<ClinicAppointmentStatus, string> = {
  SCHEDULED: "Scheduled",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In progress",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NO_SHOW: "No show",
};

const STATUS_VARIANTS: Record<
  ClinicAppointmentStatus,
  "info" | "success" | "danger" | "warning" | "muted"
> = {
  SCHEDULED: "info",
  CONFIRMED: "info",
  IN_PROGRESS: "info",
  CANCELLED: "danger",
  COMPLETED: "success",
  NO_SHOW: "warning",
};

export type AppointmentStatusBadgeProps = {
  status: string;
};

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  const normalized = status as ClinicAppointmentStatus;
  const label = STATUS_LABELS[normalized] ?? status;
  const variant = STATUS_VARIANTS[normalized] ?? "muted";

  return <Badge variant={variant}>{label}</Badge>;
}
