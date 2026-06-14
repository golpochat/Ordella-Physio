import type { DayOfWeek } from "@prisma/client";
import type { AvailabilityCheckInput, AvailabilityCheckResult } from "./appointments.types";
import { AppointmentConflictError, AppointmentScheduleError } from "./appointments.errors";
import {
  findBlockedSlotsOverlapping,
  findOverlappingAppointments,
  findTherapistAvailability,
} from "./appointments.repository";

const JS_DAY_TO_ENUM: DayOfWeek[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function parseTimeToMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + (minutes ?? 0);
}

function getUtcMinutes(date: Date): number {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

function isWithinWeeklySchedule(
  startTime: Date,
  endTime: Date,
  availability: { dayOfWeek: DayOfWeek; startTime: string; endTime: string }[],
): boolean {
  if (availability.length === 0) {
    return true;
  }

  const day = JS_DAY_TO_ENUM[startTime.getUTCDay()];
  const dayBlocks = availability.filter((block) => block.dayOfWeek === day);
  if (dayBlocks.length === 0) {
    return false;
  }

  const startMinutes = getUtcMinutes(startTime);
  const endMinutes = getUtcMinutes(endTime);

  return dayBlocks.some((block) => {
    const blockStart = parseTimeToMinutes(block.startTime);
    const blockEnd = parseTimeToMinutes(block.endTime);
    return startMinutes >= blockStart && endMinutes <= blockEnd;
  });
}

export async function checkAppointmentAvailability(
  tenantId: string,
  input: AvailabilityCheckInput,
): Promise<AvailabilityCheckResult> {
  const reasons: string[] = [];

  if (input.endTime <= input.startTime) {
    return {
      available: false,
      reasons: ["End time must be after start time"],
      therapistConflict: false,
      patientConflict: false,
      outsideSchedule: false,
      blockedSlot: false,
    };
  }

  const [therapistConflicts, patientConflicts, availability, blockedSlots] = await Promise.all([
    findOverlappingAppointments(tenantId, {
      therapistId: input.therapistId,
      startTime: input.startTime,
      endTime: input.endTime,
      excludeAppointmentId: input.excludeAppointmentId,
    }),
    input.patientId
      ? findOverlappingAppointments(tenantId, {
          patientId: input.patientId,
          startTime: input.startTime,
          endTime: input.endTime,
          excludeAppointmentId: input.excludeAppointmentId,
        })
      : Promise.resolve([]),
    findTherapistAvailability(tenantId, input.therapistId),
    findBlockedSlotsOverlapping(tenantId, input.therapistId, input.startTime, input.endTime),
  ]);

  const therapistConflict = therapistConflicts.length > 0;
  const patientConflict = patientConflicts.length > 0;
  const outsideSchedule = !isWithinWeeklySchedule(input.startTime, input.endTime, availability);
  const blockedSlot = blockedSlots.length > 0;

  if (therapistConflict) {
    reasons.push("Therapist has a conflicting appointment");
  }
  if (patientConflict) {
    reasons.push("Patient has a conflicting appointment");
  }
  if (outsideSchedule) {
    reasons.push("Requested time is outside therapist weekly schedule");
  }
  if (blockedSlot) {
    reasons.push("Requested time overlaps a therapist blocked slot");
  }

  return {
    available: reasons.length === 0,
    reasons,
    therapistConflict,
    patientConflict,
    outsideSchedule,
    blockedSlot,
  };
}

export async function assertAppointmentAvailability(
  tenantId: string,
  input: AvailabilityCheckInput,
): Promise<void> {
  const result = await checkAppointmentAvailability(tenantId, input);
  if (!result.available) {
    if (result.therapistConflict || result.patientConflict || result.blockedSlot) {
      throw new AppointmentConflictError(result.reasons.join("; "), result);
    }
    throw new AppointmentScheduleError(result.reasons.join("; "));
  }
}
