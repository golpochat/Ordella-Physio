import type { ScheduledReportFrequency } from "@ordella/validation";

export type ScheduleParams = {
  frequency: ScheduledReportFrequency;
  timeOfDay: string;
  dayOfWeek?: number | null;
  dayOfMonth?: number | null;
  from?: Date;
};

export function computeNextRunAt(params: ScheduleParams): Date {
  const [hours, minutes] = params.timeOfDay.split(":").map(Number);
  const now = params.from ?? new Date();
  const candidate = new Date(now);
  candidate.setUTCSeconds(0, 0);
  candidate.setUTCHours(hours, minutes, 0, 0);

  if (params.frequency === "DAILY") {
    if (candidate <= now) {
      candidate.setUTCDate(candidate.getUTCDate() + 1);
    }
    return candidate;
  }

  if (params.frequency === "WEEKLY") {
    const targetDay = params.dayOfWeek ?? 1;
    const currentDay = candidate.getUTCDay();
    let daysUntil = (targetDay - currentDay + 7) % 7;
    if (daysUntil === 0 && candidate <= now) {
      daysUntil = 7;
    }
    candidate.setUTCDate(candidate.getUTCDate() + daysUntil);
    return candidate;
  }

  const targetDay = params.dayOfMonth ?? 1;
  candidate.setUTCDate(targetDay);
  if (candidate <= now) {
    candidate.setUTCMonth(candidate.getUTCMonth() + 1);
    candidate.setUTCDate(targetDay);
  }
  return candidate;
}
