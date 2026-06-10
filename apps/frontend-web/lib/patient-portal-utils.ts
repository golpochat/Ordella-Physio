import type { PatientAppointment } from "@/lib/patient-portal-types";

export function formatPatientDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatPatientTime(value: string): string {
  return new Date(value).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatPatientDateTime(value: string): string {
  return `${formatPatientDate(value)} at ${formatPatientTime(value)}`;
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

export function splitAppointments(appointments: PatientAppointment[]) {
  const now = Date.now();
  const upcoming = appointments
    .filter((item) => new Date(item.startTime).getTime() >= now && item.status !== "CANCELLED")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const past = appointments
    .filter((item) => new Date(item.startTime).getTime() < now || item.status === "CANCELLED")
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  return { upcoming, past };
}
