import { Injectable } from "@nestjs/common";
import type { Prisma, Reminder } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class RemindersRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Reminder, Prisma.ReminderCreateInput, Prisma.ReminderUpdateInput>(
      this.database.reminder as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.ReminderCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.ReminderCreateInput);
  }

  findById(tenantId: string, reminderId: string) {
    return this.forTenant(tenantId).findById(reminderId);
  }

  list(tenantId: string, where: Prisma.ReminderWhereInput = {}) {
    return this.database.reminder.findMany({
      where: { ...where, tenantId },
      orderBy: { sendAt: "asc" },
    });
  }

  update(tenantId: string, reminderId: string, data: Prisma.ReminderUpdateInput) {
    return this.forTenant(tenantId).update(reminderId, data);
  }
}
