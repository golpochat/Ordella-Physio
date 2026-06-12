import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type {
  ListNotificationsInput,
  MarkNotificationsReadInput,
  RegisterDeviceTokenInput,
  UnregisterDeviceTokenInput,
} from "@ordella/validation";
import { NotificationProviderHttpClient, type OutboundNotificationPayload } from "@ordella/shared";
import { NotificationEventPublisher } from "@/events/notification-event.publisher";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import { toNotificationResponse } from "@/notifications/notifications.mapper";
import type { AuthenticatedNotificationUser } from "@/utils/notification-helpers";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly notificationProviderClient = new NotificationProviderHttpClient();

  constructor(
    private readonly repository: NotificationsRepository,
    private readonly events: NotificationEventPublisher,
  ) {}

  private includeGlobal(user: AuthenticatedNotificationUser) {
    return user.role === "SYSTEM";
  }

  private queueOutbound(tenantId: string, payload: OutboundNotificationPayload) {
    void this.notificationProviderClient.queueDelivery(tenantId, payload).catch((error) => {
      this.logger.warn(
        `Failed to queue outbound ${payload.channel} notification`,
        error instanceof Error ? error.message : error,
      );
    });
  }

  async sendOutboundNotification(tenantId: string, payload: OutboundNotificationPayload) {
    return this.notificationProviderClient.queueDelivery(tenantId, payload);
  }

  async sendAppointmentReminder(input: {
    tenantId: string;
    channel: OutboundNotificationPayload["channel"];
    to: string;
    patientName: string;
    time: string;
    location: string;
    appointmentId: string;
  }) {
    return this.sendOutboundNotification(input.tenantId, {
      channel: input.channel,
      to: input.to,
      templateId: "APPOINTMENT_REMINDER",
      variables: {
        name: input.patientName,
        time: input.time,
        location: input.location,
      },
      metadata: {
        entityType: "APPOINTMENT",
        entityId: input.appointmentId,
      },
    });
  }

  async sendInvoiceNotification(input: {
    tenantId: string;
    channel: OutboundNotificationPayload["channel"];
    to: string;
    patientName: string;
    invoiceNumber: string;
    invoiceId: string;
  }) {
    return this.sendOutboundNotification(input.tenantId, {
      channel: input.channel,
      to: input.to,
      templateId: "INVOICE_READY",
      variables: {
        name: input.patientName,
        invoiceNumber: input.invoiceNumber,
      },
      metadata: {
        entityType: "INVOICE",
        entityId: input.invoiceId,
      },
    });
  }

  async sendReportExportNotification(input: {
    tenantId: string;
    to: string;
    reportName: string;
    downloadUrl?: string;
    reportId?: string;
  }) {
    return this.sendOutboundNotification(input.tenantId, {
      channel: "EMAIL",
      to: input.to,
      templateId: "REPORT_EXPORT",
      variables: {
        reportName: input.reportName,
        downloadUrl: input.downloadUrl ?? "",
      },
      metadata: {
        entityType: "REPORT",
        entityId: input.reportId,
      },
    });
  }

  async deliverNotification(input: {
    tenantId?: string | null;
    userId: string;
    type: string;
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
    correlationId?: string;
    sendEmail?: boolean;
    emailTo?: string;
    smsTo?: string;
  }) {
    const notification = await this.repository.create({
      tenantId: input.tenantId ?? null,
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    });

    if (input.tenantId && input.emailTo && input.sendEmail !== false) {
      this.queueOutbound(input.tenantId, {
        channel: "EMAIL",
        to: input.emailTo,
        templateId: input.type,
        subject: input.title,
        message: input.message,
        metadata: {
          ...input.metadata,
          notificationId: notification.id,
          entityType: "NOTIFICATION",
          entityId: notification.id,
        },
      });
    }

    if (input.tenantId && input.smsTo) {
      this.queueOutbound(input.tenantId, {
        channel: "SMS",
        to: input.smsTo,
        message: input.message,
        metadata: {
          ...input.metadata,
          notificationId: notification.id,
        },
      });
    }

    await this.events.publishNotificationCreate(
      {
        notificationId: notification.id,
        tenantId: notification.tenantId,
        userId: notification.userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt.toISOString(),
      },
      input.correlationId,
    );

    if (input.tenantId) {
      const deviceTokens = await this.repository.listDeviceTokensForUser(
        input.userId,
        input.tenantId,
      );

      for (const entry of deviceTokens) {
        this.queueOutbound(input.tenantId, {
          channel: "PUSH",
          to: entry.token,
          title: input.title,
          message: input.message,
          metadata: {
            ...input.metadata,
            notificationId: notification.id,
            platform: entry.platform,
          },
        });
      }
    }

    return toNotificationResponse(notification);
  }

  async deliverToMany(input: {
    tenantId?: string | null;
    userIds: string[];
    type: string;
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
    correlationId?: string;
    excludeUserId?: string;
  }) {
    const recipients = input.userIds.filter((userId) => userId !== input.excludeUserId);
    if (!recipients.length) return [];

    const created = await Promise.all(
      recipients.map((userId) =>
        this.deliverNotification({
          tenantId: input.tenantId,
          userId,
          type: input.type,
          title: input.title,
          message: input.message,
          metadata: input.metadata,
          correlationId: input.correlationId,
        }),
      ),
    );

    if (recipients.length > 1) {
      await this.events.publishNotificationBroadcast(
        {
          tenantId: input.tenantId ?? null,
          type: input.type,
          title: input.title,
          message: input.message,
          recipientUserIds: recipients,
          createdAt: new Date().toISOString(),
        },
        input.correlationId,
      );
    }

    return created;
  }

  listNotifications(
    tenantId: string,
    user: AuthenticatedNotificationUser,
    query: ListNotificationsInput,
  ) {
    const includeGlobal = this.includeGlobal(user);
    return this.repository
      .listForUser(user.userId, tenantId, {
        unreadOnly: query.unreadOnly,
        since: query.since ? new Date(query.since) : undefined,
        limit: query.limit,
        includeGlobal,
      })
      .then((items) => items.map(toNotificationResponse));
  }

  getUnreadCount(tenantId: string, user: AuthenticatedNotificationUser) {
    return this.repository
      .countUnread(user.userId, tenantId, this.includeGlobal(user))
      .then((count) => ({ count }));
  }

  async markRead(
    tenantId: string,
    user: AuthenticatedNotificationUser,
    input: MarkNotificationsReadInput,
    correlationId?: string,
  ) {
    const includeGlobal = this.includeGlobal(user);
    await this.repository.markRead(input.notificationIds, user.userId, tenantId, includeGlobal);
    const items = await this.repository.findByIds(input.notificationIds, user.userId);

    await this.events.publishNotificationRead(
      {
        notificationIds: input.notificationIds,
        tenantId,
        userId: user.userId,
        readAt: new Date().toISOString(),
      },
      correlationId,
    );

    return items.map(toNotificationResponse);
  }

  async markAllRead(
    tenantId: string,
    user: AuthenticatedNotificationUser,
    correlationId?: string,
  ) {
    const includeGlobal = this.includeGlobal(user);
    const result = await this.repository.markAllRead(user.userId, tenantId, includeGlobal);

    await this.events.publishNotificationRead(
      {
        notificationIds: [],
        tenantId,
        userId: user.userId,
        readAt: new Date().toISOString(),
        markAll: true,
      },
      correlationId,
    );

    return { updated: result.count };
  }

  registerDeviceToken(
    tenantId: string,
    user: AuthenticatedNotificationUser,
    input: RegisterDeviceTokenInput,
  ) {
    return this.repository.upsertDeviceToken({
      tenantId,
      userId: user.userId,
      token: input.token,
      platform: input.platform,
    });
  }

  async unregisterDeviceToken(
    user: AuthenticatedNotificationUser,
    input: UnregisterDeviceTokenInput,
  ) {
    const result = await this.repository.deleteDeviceToken(input.token, user.userId);
    return { removed: result.count };
  }
}
