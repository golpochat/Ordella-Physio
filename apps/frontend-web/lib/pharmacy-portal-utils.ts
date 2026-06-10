import type { PharmacyAppointment } from "@/lib/pharmacy-portal-types";
import { splitAppointments } from "@/lib/patient-portal-utils";

export {
  formatPatientDate as formatPortalDate,
  formatPatientTime as formatPortalTime,
  formatPatientDateTime as formatPortalDateTime,
  formatCurrency,
  splitAppointments,
} from "@/lib/patient-portal-utils";

export function getPatientDisplayName(patient: {
  firstName: string;
  lastName: string;
}): string {
  return `${patient.firstName} ${patient.lastName}`.trim();
}

export function getTodaysAppointments(appointments: PharmacyAppointment[]): PharmacyAppointment[] {
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
