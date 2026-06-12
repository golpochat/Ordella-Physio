import type { Availability } from "@/generated/prisma";
import type { StaffWeeklyScheduleEntry } from "@/integrations/staff-service.client";

const DAY_OF_WEEK_TO_JS: Record<string, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

function isWithinWorkingWindow(
  startTime: Date,
  endTime: Date,
  windowStart: string,
  windowEnd: string,
): boolean {
  const windowStartMinutes = parseTimeToMinutes(windowStart);
  const windowEndMinutes = parseTimeToMinutes(windowEnd);

  if (windowStartMinutes === null || windowEndMinutes === null) {
    return false;
  }

  if (windowStartMinutes === windowEndMinutes) {
    return false;
  }

  const appointmentStartMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const appointmentEndMinutes = endTime.getHours() * 60 + endTime.getMinutes();

  return appointmentStartMinutes >= windowStartMinutes && appointmentEndMinutes <= windowEndMinutes;
}

function matchesAvailabilityRecord(
  startTime: Date,
  endTime: Date,
  availability: Pick<Availability, "dayOfWeek" | "startTime" | "endTime">,
): boolean {
  const dayIndex = DAY_OF_WEEK_TO_JS[availability.dayOfWeek];
  if (dayIndex === undefined || startTime.getDay() !== dayIndex) {
    return false;
  }

  return isWithinWorkingWindow(startTime, endTime, availability.startTime, availability.endTime);
}

function matchesWeeklySchedule(
  startTime: Date,
  endTime: Date,
  weeklySchedule: StaffWeeklyScheduleEntry[],
): boolean {
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayName = dayNames[startTime.getDay()];
  const entry = weeklySchedule.find((item) => item.day.toLowerCase() === dayName);

  if (!entry) {
    return false;
  }

  return isWithinWorkingWindow(startTime, endTime, entry.start, entry.end);
}

export type StaffAvailabilityContext = {
  staffStatus: "ACTIVE" | "INACTIVE";
  availabilityRecords: Pick<Availability, "dayOfWeek" | "startTime" | "endTime">[];
  weeklySchedule: StaffWeeklyScheduleEntry[];
  overlappingAppointments: Array<{ startTime: Date; endTime: Date }>;
};

export function checkStaffAvailability(
  staffId: string,
  startTime: Date,
  endTime: Date,
  context: StaffAvailabilityContext,
): boolean {
  void staffId;

  if (context.staffStatus !== "ACTIVE") {
    return false;
  }

  if (context.overlappingAppointments.length > 0) {
    return false;
  }

  if (context.availabilityRecords.length > 0) {
    return context.availabilityRecords.some((record) =>
      matchesAvailabilityRecord(startTime, endTime, record),
    );
  }

  if (context.weeklySchedule.length > 0) {
    return matchesWeeklySchedule(startTime, endTime, context.weeklySchedule);
  }

  return false;
}
