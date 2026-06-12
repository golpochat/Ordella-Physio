import type {
  ClinicAppointmentCalendarEvent,
  ClinicAppointmentCalendarView,
} from "@/lib/clinic-portal-types";

export const CALENDAR_START_HOUR = 6;
export const CALENDAR_END_HOUR = 21;
export const CALENDAR_HOUR_HEIGHT = 48;

export function formatCalendarDateParam(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseCalendarDateParam(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

export function shiftCalendarDate(
  date: string,
  view: ClinicAppointmentCalendarView,
  direction: -1 | 1,
): string {
  const anchor = parseCalendarDateParam(date);

  if (view === "day") {
    anchor.setDate(anchor.getDate() + direction);
    return formatCalendarDateParam(anchor);
  }

  if (view === "week") {
    anchor.setDate(anchor.getDate() + direction * 7);
    return formatCalendarDateParam(anchor);
  }

  anchor.setMonth(anchor.getMonth() + direction);
  return formatCalendarDateParam(anchor);
}

export function getWeekDays(date: string): Date[] {
  const anchor = parseCalendarDateParam(date);
  const day = anchor.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(monday);
    next.setDate(monday.getDate() + index);
    return next;
  });
}

export function getMonthGridDays(date: string): Date[] {
  const anchor = parseCalendarDateParam(date);
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const startDay = firstOfMonth.getDay();
  const diffToMonday = startDay === 0 ? -6 : 1 - startDay;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() + diffToMonday);

  return Array.from({ length: 42 }, (_, index) => {
    const next = new Date(gridStart);
    next.setDate(gridStart.getDate() + index);
    return next;
  });
}

export function isSameCalendarDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function getCalendarEventClassName(event: ClinicAppointmentCalendarEvent): string {
  if (event.status === "CANCELLED") {
    return "appointment-calendar-event-cancelled";
  }

  if (event.status === "COMPLETED") {
    return "appointment-calendar-event-completed";
  }

  if (event.status === "NO_SHOW") {
    return "appointment-calendar-event-no-show";
  }

  if (event.appointmentType === "TELEMEDICINE") {
    return "appointment-calendar-event-telemedicine";
  }

  return "appointment-calendar-event-in-person";
}

export function getTimedEventStyle(
  event: ClinicAppointmentCalendarEvent,
  day: Date,
): { top: string; height: string } | null {
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  if (!isSameCalendarDay(eventStart, day) && !isSameCalendarDay(eventEnd, day)) {
    if (eventStart < day && eventEnd > day) {
      return { top: "0%", height: "100%" };
    }
    return null;
  }

  const dayStart = new Date(day);
  dayStart.setHours(CALENDAR_START_HOUR, 0, 0, 0);
  const dayEnd = new Date(day);
  dayEnd.setHours(CALENDAR_END_HOUR, 0, 0, 0);

  const visibleStart = Math.max(eventStart.getTime(), dayStart.getTime());
  const visibleEnd = Math.min(eventEnd.getTime(), dayEnd.getTime());
  if (visibleEnd <= visibleStart) {
    return null;
  }

  const totalMinutes = (CALENDAR_END_HOUR - CALENDAR_START_HOUR) * 60;
  const topMinutes = (visibleStart - dayStart.getTime()) / 60000;
  const heightMinutes = (visibleEnd - visibleStart) / 60000;

  return {
    top: `${(topMinutes / totalMinutes) * 100}%`,
    height: `${Math.max((heightMinutes / totalMinutes) * 100, 4)}%`,
  };
}

export function formatCalendarHeading(
  view: ClinicAppointmentCalendarView,
  date: string,
): string {
  const anchor = parseCalendarDateParam(date);

  if (view === "day") {
    return anchor.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  if (view === "week") {
    const days = getWeekDays(date);
    const start = days[0];
    const end = days[6];
    const sameMonth = start.getMonth() === end.getMonth();
    const startLabel = start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    const endLabel = end.toLocaleDateString(undefined, {
      month: sameMonth ? undefined : "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startLabel} – ${endLabel}`;
  }

  return anchor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function formatHourLabel(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date.toLocaleTimeString(undefined, { hour: "numeric" });
}
