import { Injectable } from "@nestjs/common";
import type { Notification, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class NotificationsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      Notification,
      Prisma.NotificationCreateInput,
      Prisma.NotificationUpdateInput
    >(this.database.notification as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.NotificationCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.NotificationCreateInput);
  }

  findById(tenantId: string, notificationId: string) {
    return this.forTenant(tenantId).findById(notificationId);
  }

  list(tenantId: string, where: Prisma.NotificationWhereInput = {}) {
    return this.database.notification.findMany({
      where: { ...where, tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  update(tenantId: string, notificationId: string, data: Prisma.NotificationUpdateInput) {
    return this.forTenant(tenantId).update(notificationId, data);
  }
}
