import { fail, ok, type Result } from "../core/result";
import type { AppointmentAggregateProps } from "../aggregates/appointment.aggregate";
import { DateRange } from "../value-objects/date-range.vo";

export type AvailabilitySlot = {
  therapistId: string;
  startTime: Date;
  endTime: Date;
};

export type AppointmentValidationInput = {
  appointment: Pick<AppointmentAggregateProps, "startTime" | "endTime" | "therapistId" | "status">;
  existingAppointments: Array<Pick<AppointmentAggregateProps, "startTime" | "endTime" | "therapistId" | "status">>;
  therapistIsActive: boolean;
  now?: Date;
};

export class SchedulingDomainService {
  checkAvailability(
    slot: AvailabilitySlot,
    bookedSlots: AvailabilitySlot[],
  ): Result<boolean> {
    const rangeResult = DateRange.create(slot.startTime, slot.endTime);
    if (rangeResult.isFailure) {
      return fail(rangeResult.error);
    }

    const overlaps = bookedSlots.some(
      (booked) =>
        booked.therapistId === slot.therapistId &&
        slot.startTime < booked.endTime &&
        slot.endTime > booked.startTime,
    );

    return ok(!overlaps);
  }

  validateAppointmentRules(input: AppointmentValidationInput): Result<void> {
    const now = input.now ?? new Date();

    if (input.appointment.startTime < now) {
      return fail("Cannot schedule appointments in the past");
    }

    if (!input.therapistIsActive) {
      return fail("Therapist must be active");
    }

    const overlap = input.existingAppointments.some(
      (existing) =>
        existing.therapistId === input.appointment.therapistId &&
        existing.status !== "CANCELLED" &&
        input.appointment.startTime < existing.endTime &&
        input.appointment.endTime > existing.startTime,
    );

    if (overlap) {
      return fail("Appointment overlaps with an existing booking");
    }

    return ok(undefined);
  }
}

export const schedulingDomainService = new SchedulingDomainService();
