import { fail, ok, type Result } from "../core/result";

export type AppointmentRuleInput = {
  startTime: Date;
  endTime: Date;
  therapistId: string;
  therapistIsActive: boolean;
  existingAppointments: Array<{
    therapistId: string;
    startTime: Date;
    endTime: Date;
    status: string;
  }>;
  now?: Date;
};

export function cannotScheduleInPast(startTime: Date, now: Date = new Date()): Result<void> {
  if (startTime < now) {
    return fail("Cannot schedule appointments in the past");
  }
  return ok(undefined);
}

export function cannotOverlapAppointments(input: AppointmentRuleInput): Result<void> {
  const overlap = input.existingAppointments.some(
    (existing) =>
      existing.therapistId === input.therapistId &&
      existing.status !== "CANCELLED" &&
      input.startTime < existing.endTime &&
      input.endTime > existing.startTime,
  );

  if (overlap) {
    return fail("Appointment overlaps with an existing booking");
  }

  return ok(undefined);
}

export function therapistMustBeActive(therapistIsActive: boolean): Result<void> {
  if (!therapistIsActive) {
    return fail("Therapist must be active");
  }
  return ok(undefined);
}

export const appointmentRules = {
  cannotScheduleInPast,
  cannotOverlapAppointments,
  therapistMustBeActive,
};
