import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { DEFAULT_NOTIFICATIONS_PAGE_SIZE } from "@/constants";

export type CreateNotificationInput = {
  tenantId?: string | null;
  userId: string;
  type: string;
  title: string;
  message: string;
  metadata?: Prisma.InputJsonValue;
};

@Injectable()
export class NotificationsRepository {
  constructor(private readonly db: DatabaseService) {}

  create(input: CreateNotificationInput) {
    return this.db.notification.create({
      data: {
        tenantId: input.tenantId ?? null,
        userId: input.userId,
        type: input.type,
        title: input.title,
        message: input.message,
        metadata: input.metadata,
      },
    });
  }

  createMany(inputs: CreateNotificationInput[]) {
    return this.db.notification.createMany({
      data: inputs.map((input) => ({
        tenantId: input.tenantId ?? null,
        userId: input.userId,
        type: input.type,
        title: input.title,
        message: input.message,
        metadata: input.metadata,
      })),
    });
  }

  listForUser(
    userId: string,
    tenantId: string,
    options: { unreadOnly?: boolean; since?: Date; limit?: number; includeGlobal?: boolean },
  ) {
    const limit = options.limit ?? DEFAULT_NOTIFICATIONS_PAGE_SIZE;

    return this.db.notification.findMany({
      where: {
        userId,
        OR: options.includeGlobal
          ? [{ tenantId }, { tenantId: null }]
          : [{ tenantId }],
        ...(options.unreadOnly ? { readAt: null } : {}),
        ...(options.since ? { createdAt: { gt: options.since } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  countUnread(userId: string, tenantId: string, includeGlobal = false) {
    return this.db.notification.count({
      where: {
        userId,
        readAt: null,
        OR: includeGlobal ? [{ tenantId }, { tenantId: null }] : [{ tenantId }],
      },
    });
  }

  markRead(notificationIds: string[], userId: string, tenantId: string, includeGlobal = false) {
    return this.db.notification.updateMany({
      where: {
        id: { in: notificationIds },
        userId,
        OR: includeGlobal ? [{ tenantId }, { tenantId: null }] : [{ tenantId }],
        readAt: null,
      },
      data: { readAt: new Date() },
    });
  }

  markAllRead(userId: string, tenantId: string, includeGlobal = false) {
    return this.db.notification.updateMany({
      where: {
        userId,
        readAt: null,
        OR: includeGlobal ? [{ tenantId }, { tenantId: null }] : [{ tenantId }],
      },
      data: { readAt: new Date() },
    });
  }

  findByIds(notificationIds: string[], userId: string) {
    return this.db.notification.findMany({
      where: { id: { in: notificationIds }, userId },
    });
  }
}
