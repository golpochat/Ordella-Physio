import { Injectable } from "@nestjs/common";
import type { Appointment, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AppointmentsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      Appointment,
      Prisma.AppointmentCreateInput,
      Prisma.AppointmentUpdateInput
    >(this.database.appointment as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.AppointmentCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.AppointmentCreateInput);
  }

  findById(tenantId: string, appointmentId: string) {
    return this.forTenant(tenantId).findById(appointmentId);
  }

  findByIdGlobal(appointmentId: string) {
    return this.database.appointment.findUnique({ where: { id: appointmentId } });
  }

  list(
    tenantId: string,
    where: Prisma.AppointmentWhereInput,
    options: {
      skip: number;
      take: number;
      orderBy?: Prisma.AppointmentOrderByWithRelationInput;
    },
  ) {
    return this.database.appointment.findMany({
      where: { ...where, tenantId },
      skip: options.skip,
      take: options.take,
      orderBy: options.orderBy ?? { startTime: "desc" },
    });
  }

  count(tenantId: string, where: Prisma.AppointmentWhereInput) {
    return this.database.appointment.count({ where: { ...where, tenantId } });
  }

  findOverlapping(
    tenantId: string,
    therapistId: string,
    startTime: Date,
    endTime: Date,
    excludeId?: string,
  ) {
    return this.database.appointment.findMany({
      where: {
        tenantId,
        therapistId,
        status: { not: "CANCELLED" },
        ...(excludeId ? { id: { not: excludeId } } : {}),
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });
  }

  findPatientOverlapping(
    tenantId: string,
    patientId: string,
    startTime: Date,
    endTime: Date,
    excludeId?: string,
  ) {
    return this.database.appointment.findMany({
      where: {
        tenantId,
        patientId,
        status: { not: "CANCELLED" },
        ...(excludeId ? { id: { not: excludeId } } : {}),
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });
  }

  countActiveByLocation(tenantId: string, locationId: string) {
    const now = new Date();

    return this.database.appointment.count({
      where: {
        tenantId,
        locationId,
        status: { in: ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"] },
        endTime: { gte: now },
      },
    });
  }

  countActiveByTherapist(tenantId: string, therapistId: string) {
    const now = new Date();

    return this.database.appointment.count({
      where: {
        tenantId,
        therapistId,
        status: { in: ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"] },
        endTime: { gte: now },
      },
    });
  }

  countActiveByPatient(tenantId: string, patientId: string) {
    const now = new Date();

    return this.database.appointment.count({
      where: {
        tenantId,
        patientId,
        status: { in: ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"] },
        endTime: { gte: now },
      },
    });
  }

  update(tenantId: string, appointmentId: string, data: Prisma.AppointmentUpdateInput) {
    return this.forTenant(tenantId).update(appointmentId, data);
  }

  listInRange(
    tenantId: string,
    rangeStart: Date,
    rangeEnd: Date,
    where: Prisma.AppointmentWhereInput = {},
    take = 1000,
  ) {
    return this.database.appointment.findMany({
      where: {
        ...where,
        tenantId,
        startTime: { lt: rangeEnd },
        endTime: { gt: rangeStart },
      },
      orderBy: { startTime: "asc" },
      take,
    });
  }
}
