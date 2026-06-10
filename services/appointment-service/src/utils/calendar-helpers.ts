import type { Appointment, Availability, BlockedSlot } from "@/generated/prisma";

export type TherapistCalendarEntry = {
  type: "appointment" | "availability" | "blocked";
  id: string;
  startTime: string;
  endTime: string;
  label: string;
};

export function buildTherapistCalendar(
  therapistId: string,
  appointments: Appointment[],
  availability: Availability[],
  blockedSlots: BlockedSlot[],
): TherapistCalendarEntry[] {
  const entries: TherapistCalendarEntry[] = [];

  for (const appointment of appointments.filter((item) => item.therapistId === therapistId)) {
    entries.push({
      type: "appointment",
      id: appointment.id,
      startTime: appointment.startTime.toISOString(),
      endTime: appointment.endTime.toISOString(),
      label: appointment.type,
    });
  }

  for (const slot of availability.filter((item) => item.therapistId === therapistId)) {
    entries.push({
      type: "availability",
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      label: slot.dayOfWeek,
    });
  }

  for (const blocked of blockedSlots.filter((item) => item.therapistId === therapistId)) {
    entries.push({
      type: "blocked",
      id: blocked.id,
      startTime: blocked.startTime.toISOString(),
      endTime: blocked.endTime.toISOString(),
      label: blocked.reason ?? "Blocked",
    });
  }

  return entries.sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function buildWeeklyRecurringPlaceholder(therapistId: string) {
  return {
    therapistId,
    recurring: true,
    message: "Weekly recurring availability scaffold placeholder",
  };
}
