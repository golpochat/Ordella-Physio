import type { Appointment, BlockedSlot } from "@/generated/prisma";

export type TimeRange = {
  startTime: Date;
  endTime: Date;
};

export function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.startTime < b.endTime && a.endTime > b.startTime;
}

export function detectAppointmentConflicts(
  candidate: TimeRange & { therapistId: string; patientId?: string },
  appointments: Pick<Appointment, "therapistId" | "patientId" | "startTime" | "endTime" | "status">[],
  blockedSlots: Pick<BlockedSlot, "therapistId" | "startTime" | "endTime">[] = [],
): string[] {
  const conflicts: string[] = [];

  for (const appointment of appointments) {
    if (appointment.status === "CANCELLED") {
      continue;
    }

    if (
      appointment.therapistId === candidate.therapistId &&
      rangesOverlap(candidate, appointment)
    ) {
      conflicts.push("Therapist has an overlapping appointment");
    }

    if (
      candidate.patientId &&
      appointment.patientId === candidate.patientId &&
      rangesOverlap(candidate, appointment)
    ) {
      conflicts.push("Patient has an overlapping appointment");
    }
  }

  for (const blocked of blockedSlots) {
    if (blocked.therapistId === candidate.therapistId && rangesOverlap(candidate, blocked)) {
      conflicts.push("Time slot is blocked");
    }
  }

  return conflicts;
}
