import { Injectable } from "@nestjs/common";
import type { AppointmentReminder, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AppointmentReminderRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      AppointmentReminder,
      Prisma.AppointmentReminderCreateInput,
      Prisma.AppointmentReminderUpdateInput
    >(this.database.appointmentReminder as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.AppointmentReminderCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.AppointmentReminderCreateInput);
  }

  findById(tenantId: string, reminderId: string) {
    return this.forTenant(tenantId).findById(reminderId);
  }

  findByIdGlobal(reminderId: string) {
    return this.database.appointmentReminder.findUnique({ where: { id: reminderId } });
  }

  listByAppointment(tenantId: string, appointmentId: string) {
    return this.database.appointmentReminder.findMany({
      where: { tenantId, appointmentId },
      orderBy: { scheduledFor: "asc" },
    });
  }

  findScheduledByAppointment(tenantId: string, appointmentId: string) {
    return this.database.appointmentReminder.findMany({
      where: { tenantId, appointmentId, status: "SCHEDULED" },
      orderBy: { scheduledFor: "asc" },
    });
  }

  update(tenantId: string, reminderId: string, data: Prisma.AppointmentReminderUpdateInput) {
    return this.forTenant(tenantId).update(reminderId, data);
  }

  cancelScheduledForAppointment(tenantId: string, appointmentId: string) {
    return this.database.appointmentReminder.updateMany({
      where: { tenantId, appointmentId, status: "SCHEDULED" },
      data: { status: "CANCELLED" },
    });
  }
}
