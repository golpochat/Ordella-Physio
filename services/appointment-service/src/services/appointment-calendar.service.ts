import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import {
  appointmentTenantRequiredError,
  invalidAppointmentDateError,
  invalidAppointmentFilterError,
  invalidAppointmentViewError,
} from "@/utils/appointment-errors";
import { getCalendarRange } from "@/utils/calendar-range";
import { parseCalendarEventsQuery } from "@/validators/appointment.validator";

export type AppointmentCalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  appointmentType: string;
  status: string;
  staffId: string;
  patientId: string;
  locationId: string | null;
};

@Injectable()
export class AppointmentCalendarService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
  ) {}

  async getCalendarEvents(query: unknown, requestingUser: AuthenticatedAppointmentUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw appointmentTenantRequiredError(
        "A tenant context is required to view appointments.",
      );
    }

    const parsed = parseCalendarEventsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_VIEW") {
        throw invalidAppointmentViewError();
      }
      if (parsed.error === "INVALID_DATE") {
        throw invalidAppointmentDateError();
      }
      throw invalidAppointmentFilterError();
    }

    const { view, date, staffId, locationId, appointmentType, status } = parsed.payload;
    const { start, end } = getCalendarRange(view, date);
    const where = this.buildWhereClause({ staffId, locationId, appointmentType, status });

    const appointments = await this.appointmentsRepository.listInRange(
      tenantId,
      start,
      end,
      where,
    );

    const uniquePatientIds = [...new Set(appointments.map((item) => item.patientId))];
    const uniqueStaffIds = [...new Set(appointments.map((item) => item.therapistId))];

    const [patients, staffMembers] = await Promise.all([
      this.patientServiceClient.getPatientSummaries(tenantId, uniquePatientIds),
      this.staffServiceClient.getStaffSummaries(tenantId, uniqueStaffIds),
    ]);

    const patientById = new Map(patients.map((patient) => [patient.id, patient]));
    const staffById = new Map(staffMembers.map((member) => [member.id, member]));

    const data: AppointmentCalendarEvent[] = appointments.map((appointment) => {
      const patient = patientById.get(appointment.patientId);
      const staff = staffById.get(appointment.therapistId);
      const patientName = patient
        ? `${patient.firstName} ${patient.lastName}`.trim()
        : "Unknown patient";
      const staffName = staff ? `${staff.firstName} ${staff.lastName}`.trim() : "Unknown staff";

      return {
        id: appointment.id,
        title: `${patientName} — ${staffName}`,
        start: appointment.startTime.toISOString(),
        end: appointment.endTime.toISOString(),
        appointmentType: appointment.type,
        status: appointment.status,
        staffId: appointment.therapistId,
        patientId: appointment.patientId,
        locationId: appointment.locationId,
      };
    });

    return { data };
  }

  private buildWhereClause(filters: {
    staffId?: string;
    locationId?: string;
    appointmentType?: string;
    status?: string;
  }): Prisma.AppointmentWhereInput {
    const andConditions: Prisma.AppointmentWhereInput[] = [];

    if (filters.staffId) {
      andConditions.push({ therapistId: filters.staffId });
    }

    if (filters.locationId) {
      andConditions.push({ locationId: filters.locationId });
    }

    if (filters.appointmentType) {
      andConditions.push({ type: filters.appointmentType });
    }

    if (filters.status) {
      andConditions.push({
        status: filters.status as Prisma.EnumAppointmentStatusFilter["equals"],
      });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
