import { appointmentRules, fail, ok, type AppointmentRuleInput } from "@ordella/domain";
import { CANCELLATION_POLICY_HOURS, MINIMUM_NOTICE_HOURS } from "@/constants";

export type SchedulingValidationContext = AppointmentRuleInput & {
  tenantId: string;
  patientId?: string;
  blockedSlots?: Array<{ therapistId: string; startTime: Date; endTime: Date }>;
};

export function runSchedulingRules(context: SchedulingValidationContext) {
  const pastCheck = appointmentRules.cannotScheduleInPast(context.startTime, context.now);
  if (pastCheck.isFailure) {
    return pastCheck;
  }

  const therapistCheck = appointmentRules.therapistMustBeActive(context.therapistIsActive);
  if (therapistCheck.isFailure) {
    return therapistCheck;
  }

  const overlapCheck = appointmentRules.cannotOverlapAppointments(context);
  if (overlapCheck.isFailure) {
    return overlapCheck;
  }

  const blocked = context.blockedSlots?.some(
    (slot) =>
      slot.therapistId === context.therapistId &&
      context.startTime < slot.endTime &&
      context.endTime > slot.startTime,
  );

  if (blocked) {
    return fail("Time slot is blocked");
  }

  return ok(undefined);
}

export function enforceMinimumNotice(startTime: Date, now: Date = new Date()): boolean {
  const minimumMs = MINIMUM_NOTICE_HOURS * 60 * 60 * 1000;
  return startTime.getTime() - now.getTime() >= minimumMs;
}

export function enforceCancellationPolicy(startTime: Date, now: Date = new Date()): boolean {
  const policyMs = CANCELLATION_POLICY_HOURS * 60 * 60 * 1000;
  return startTime.getTime() - now.getTime() >= policyMs;
}

export function appointmentMustBelongToTenant(appointmentTenantId: string, tenantId: string): boolean {
  return appointmentTenantId === tenantId;
}

export function mapDayOfWeekToPrisma(
  day: string,
): "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN" {
  const mapping: Record<string, "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"> = {
    MONDAY: "MON",
    TUESDAY: "TUE",
    WEDNESDAY: "WED",
    THURSDAY: "THU",
    FRIDAY: "FRI",
    SATURDAY: "SAT",
    SUNDAY: "SUN",
    MON: "MON",
    TUE: "TUE",
    WED: "WED",
    THU: "THU",
    FRI: "FRI",
    SAT: "SAT",
    SUN: "SUN",
  };

  return mapping[day] ?? "MON";
}

export function buildPatientServiceUrl(patientId: string): string {
  const baseUrl = process.env.PATIENT_SERVICE_URL ?? "http://localhost:3053";
  return `${baseUrl.replace(/\/$/, "")}/patients/${encodeURIComponent(patientId)}`;
}

export function buildNotificationDispatchUrl(): string {
  const baseUrl = process.env.NOTIFICATION_SERVICE_URL ?? "http://localhost:3058";
  return `${baseUrl.replace(/\/$/, "")}/notifications`;
}
