type SplittableAppointment = {
  startTime: string;
  status: string;
};
import {
  formatCurrency as formatTenantCurrency,
  formatDate as formatTenantDate,
  formatDateTime as formatTenantDateTime,
  formatTime as formatTenantTime,
} from "@/lib/formatting";

export function formatPatientDate(value: string): string {
  return formatTenantDate(value);
}

export function formatPatientTime(value: string): string {
  return formatTenantTime(value);
}

export function formatPatientDateTime(value: string): string {
  return formatTenantDateTime(value);
}

export function formatCurrency(amount: number, currency?: string): string {
  return formatTenantCurrency(amount, currency);
}

export function splitAppointments<T extends SplittableAppointment>(appointments: T[]) {
  const now = Date.now();
  const upcoming = appointments
    .filter((item) => new Date(item.startTime).getTime() >= now && item.status !== "CANCELLED")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const past = appointments
    .filter((item) => new Date(item.startTime).getTime() < now || item.status === "CANCELLED")
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  return { upcoming, past };
}
