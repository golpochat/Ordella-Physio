import type { TherapistAppointment } from "@/lib/therapist-portal-types";
import { splitAppointments } from "@/lib/patient-portal-utils";

export {
  formatPatientDate as formatPortalDate,
  formatPatientTime as formatPortalTime,
  formatPatientDateTime as formatPortalDateTime,
  formatCurrency,
  splitAppointments,
} from "@/lib/patient-portal-utils";

export function getTodaysAppointments(appointments: TherapistAppointment[]): TherapistAppointment[] {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  return appointments
    .filter((appointment) => {
      const start = new Date(appointment.startTime);
      return (
        start >= startOfDay &&
        start < endOfDay &&
        appointment.status !== "CANCELLED"
      );
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

export function partitionTherapistAppointments(appointments: TherapistAppointment[]) {
  const today = getTodaysAppointments(appointments);
  const { upcoming, past } = splitAppointments(appointments);
  const upcomingExcludingToday = upcoming.filter(
    (appointment) => !today.some((item) => item.id === appointment.id),
  );

  return { today, upcoming: upcomingExcludingToday, past };
}

export function getWeekStart(date: Date): Date {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

export function shiftWeek(weekStart: Date, deltaWeeks: number): Date {
  const next = new Date(weekStart);
  next.setDate(next.getDate() + deltaWeeks * 7);
  return next;
}

export type WeekScheduleDay = {
  key: string;
  label: string;
  isToday: boolean;
  appointments: TherapistAppointment[];
};

export function buildWeekSchedule(
  appointments: TherapistAppointment[],
  weekStart: Date,
): { days: WeekScheduleDay[] } {
  const days: WeekScheduleDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let index = 0; index < 7; index += 1) {
    const dayStart = new Date(weekStart);
    dayStart.setDate(dayStart.getDate() + index);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const dayAppointments = appointments
      .filter((appointment) => {
        const start = new Date(appointment.startTime);
        return start >= dayStart && start < dayEnd && appointment.status !== "CANCELLED";
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    days.push({
      key: dayStart.toISOString().slice(0, 10),
      label: dayStart.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      isToday: dayStart.getTime() === today.getTime(),
      appointments: dayAppointments,
    });
  }

  return { days };
}

export function getPatientDisplayName(patient: {
  firstName: string;
  lastName: string;
}): string {
  return `${patient.firstName} ${patient.lastName}`.trim();
}
