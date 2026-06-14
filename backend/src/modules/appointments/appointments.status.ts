import type { AppointmentStatus } from "@prisma/client";
import { AppointmentStatusTransitionError } from "./appointments.errors";

export const APPOINTMENT_STATUSES = [
  "SCHEDULED",
  "CHECKED_IN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const satisfies readonly AppointmentStatus[];

const ALLOWED_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  SCHEDULED: ["CHECKED_IN", "CANCELLED"],
  CHECKED_IN: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

export function assertValidStatusTransition(from: AppointmentStatus, to: AppointmentStatus): void {
  if (from === to) {
    return;
  }

  const allowed = ALLOWED_TRANSITIONS[from] ?? [];
  if (!allowed.includes(to)) {
    throw new AppointmentStatusTransitionError(from, to);
  }
}

export function isTerminalStatus(status: AppointmentStatus): boolean {
  return status === "COMPLETED" || status === "CANCELLED";
}

export function statusTimestampPatch(
  status: AppointmentStatus,
): Partial<{ checkedInAt: Date; cancelledAt: Date }> {
  const now = new Date();
  if (status === "CHECKED_IN") {
    return { checkedInAt: now };
  }
  if (status === "CANCELLED") {
    return { cancelledAt: now };
  }
  return {};
}
