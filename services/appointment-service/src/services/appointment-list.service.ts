import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { toAppointmentListItemResponse } from "@/appointments/appointments.mapper";
import {
  appointmentTenantRequiredError,
  invalidAppointmentFilterError,
  invalidAppointmentPaginationError,
} from "@/utils/appointment-errors";
import { parseListAppointmentsQuery } from "@/validators/appointment.validator";

@Injectable()
export class AppointmentListService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
    private readonly tenantServiceClient: TenantServiceClient,
  ) {}

  async listAppointments(query: unknown, requestingUser: AuthenticatedAppointmentUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw appointmentTenantRequiredError();
    }

    const parsed = parseListAppointmentsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidAppointmentPaginationError();
      }
      throw invalidAppointmentFilterError();
    }

    const {
      page,
      limit,
      search,
      staffId,
      patientId,
      locationId,
      appointmentType,
      status,
      dateStart,
      dateEnd,
      sortBy,
      sortOrder,
    } = parsed.payload;

    const where = await this.buildWhereClause(tenantId, {
      search,
      staffId,
      patientId,
      locationId,
      appointmentType,
      status,
      dateStart,
      dateEnd,
    });

    const orderBy: Prisma.AppointmentOrderByWithRelationInput = { [sortBy]: sortOrder };
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      this.appointmentsRepository.list(tenantId, where, { skip, take: limit, orderBy }),
      this.appointmentsRepository.count(tenantId, where),
    ]);

    const uniquePatientIds = [...new Set(appointments.map((item) => item.patientId))];
    const uniqueStaffIds = [...new Set(appointments.map((item) => item.therapistId))];
    const uniqueLocationIds = [
      ...new Set(
        appointments.map((item) => item.locationId).filter((id): id is string => Boolean(id)),
      ),
    ];

    const [patients, staffMembers, locationMap] = await Promise.all([
      this.patientServiceClient.getPatientSummaries(tenantId, uniquePatientIds),
      this.staffServiceClient.getStaffSummaries(tenantId, uniqueStaffIds),
      this.tenantServiceClient.getLocations(uniqueLocationIds),
    ]);

    const patientById = new Map(patients.map((patient) => [patient.id, patient]));
    const staffById = new Map(staffMembers.map((member) => [member.id, member]));

    const data = appointments.map((appointment) => {
      const patient = patientById.get(appointment.patientId) ?? {
        id: appointment.patientId,
        firstName: "Unknown",
        lastName: "Patient",
      };
      const staff = staffById.get(appointment.therapistId) ?? {
        id: appointment.therapistId,
        firstName: "Unknown",
        lastName: "Staff",
      };
      const location = appointment.locationId
        ? (locationMap.get(appointment.locationId) ?? null)
        : null;

      return toAppointmentListItemResponse(
        appointment,
        patient,
        staff,
        location ? { id: location.id, name: location.name } : null,
      );
    });

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  private async buildWhereClause(
    tenantId: string,
    filters: {
      search?: string;
      staffId?: string;
      patientId?: string;
      locationId?: string;
      appointmentType?: string;
      status?: string;
      dateStart?: string;
      dateEnd?: string;
    },
  ): Promise<Prisma.AppointmentWhereInput> {
    const andConditions: Prisma.AppointmentWhereInput[] = [];

    if (filters.staffId) {
      andConditions.push({ therapistId: filters.staffId });
    }

    if (filters.patientId) {
      andConditions.push({ patientId: filters.patientId });
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

    if (filters.dateStart || filters.dateEnd) {
      andConditions.push({
        startTime: {
          ...(filters.dateStart ? { gte: new Date(`${filters.dateStart}T00:00:00.000Z`) } : {}),
          ...(filters.dateEnd ? { lte: new Date(`${filters.dateEnd}T23:59:59.999Z`) } : {}),
        },
      });
    }

    if (filters.search) {
      const [patientIds, staffIds] = await Promise.all([
        this.patientServiceClient.searchPatientIds(tenantId, filters.search),
        this.staffServiceClient.searchStaffIds(tenantId, filters.search),
      ]);

      const searchConditions: Prisma.AppointmentWhereInput[] = [
        { notes: { contains: filters.search, mode: "insensitive" } },
      ];

      if (patientIds.length > 0) {
        searchConditions.push({ patientId: { in: patientIds } });
      }

      if (staffIds.length > 0) {
        searchConditions.push({ therapistId: { in: staffIds } });
      }

      andConditions.push({ OR: searchConditions });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
