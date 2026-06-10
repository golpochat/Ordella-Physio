import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, toSubject, type EventBus } from "@ordella/event-bus";
import { EVENT_TYPES } from "@ordella/shared";
import { NOTIFICATION_TYPES } from "@/constants";
import { NotificationsService } from "@/notifications/notifications.service";

@Injectable()
export class PlatformEventsConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PlatformEventsConsumer.name);
  private eventBus: EventBus | null = null;

  constructor(private readonly notificationsService: NotificationsService) {}

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();

    const subscriptions: Array<{
      subject: string;
      durableName: string;
      handler: (event: { payload: unknown; tenantId?: string }) => Promise<void>;
    }> = [
      {
        subject: EVENT_TYPES.APPOINTMENT_CREATED,
        durableName: "notification-appointment-created",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            appointmentId: string;
            patientId: string;
            therapistId: string;
            startTime: string;
          };
          await this.notificationsService.deliverToMany({
            tenantId: payload.tenantId,
            userIds: [payload.patientId, payload.therapistId],
            type: NOTIFICATION_TYPES.APPOINTMENT_CREATED,
            title: "Appointment scheduled",
            message: "A new appointment has been scheduled.",
            metadata: payload,
          });
        },
      },
      {
        subject: EVENT_TYPES.APPOINTMENT_UPDATED,
        durableName: "notification-appointment-updated",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            appointmentId: string;
            patientId: string;
            therapistId: string;
          };
          await this.notificationsService.deliverToMany({
            tenantId: payload.tenantId,
            userIds: [payload.patientId, payload.therapistId],
            type: NOTIFICATION_TYPES.APPOINTMENT_UPDATED,
            title: "Appointment updated",
            message: "An appointment has been updated.",
            metadata: payload,
          });
        },
      },
      {
        subject: EVENT_TYPES.APPOINTMENT_CANCELLED,
        durableName: "notification-appointment-cancelled",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            appointmentId: string;
            patientId: string;
            therapistId: string;
          };
          await this.notificationsService.deliverToMany({
            tenantId: payload.tenantId,
            userIds: [payload.patientId, payload.therapistId],
            type: NOTIFICATION_TYPES.APPOINTMENT_CANCELLED,
            title: "Appointment cancelled",
            message: "An appointment has been cancelled.",
            metadata: payload,
          });
        },
      },
      {
        subject: EVENT_TYPES.NOTE_CREATED,
        durableName: "notification-note-created",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            noteId: string;
            patientId: string;
            therapistId: string;
          };
          await this.notificationsService.deliverToMany({
            tenantId: payload.tenantId,
            userIds: [payload.patientId],
            type: NOTIFICATION_TYPES.NOTE_CREATED,
            title: "New clinical note",
            message: "A new clinical note has been added to your record.",
            metadata: payload,
            excludeUserId: payload.therapistId,
          });
        },
      },
      {
        subject: EVENT_TYPES.NOTE_UPDATED,
        durableName: "notification-note-updated",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            noteId: string;
            patientId: string;
            therapistId: string;
          };
          await this.notificationsService.deliverToMany({
            tenantId: payload.tenantId,
            userIds: [payload.patientId],
            type: NOTIFICATION_TYPES.NOTE_UPDATED,
            title: "Clinical note updated",
            message: "A clinical note on your record has been updated.",
            metadata: payload,
            excludeUserId: payload.therapistId,
          });
        },
      },
      {
        subject: EVENT_TYPES.INVOICE_CREATED,
        durableName: "notification-invoice-created",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            invoiceId: string;
            patientId: string;
            invoiceNumber: string;
            total: number;
            currency: string;
          };
          await this.notificationsService.deliverNotification({
            tenantId: payload.tenantId,
            userId: payload.patientId,
            type: NOTIFICATION_TYPES.INVOICE_GENERATED,
            title: "Invoice generated",
            message: `Invoice ${payload.invoiceNumber} is ready for review.`,
            metadata: payload,
          });
        },
      },
      {
        subject: EVENT_TYPES.MESSAGING_MESSAGE_CREATED,
        durableName: "notification-message-received",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            conversationId: string;
            messageId: string;
            senderId: string;
            content: string;
            recipientUserIds?: string[];
          };
          const recipients = payload.recipientUserIds ?? [];
          await this.notificationsService.deliverToMany({
            tenantId: payload.tenantId,
            userIds: recipients,
            type: NOTIFICATION_TYPES.MESSAGE_RECEIVED,
            title: "New message",
            message: payload.content.slice(0, 120),
            metadata: payload,
            excludeUserId: payload.senderId,
          });
        },
      },
      {
        subject: EVENT_TYPES.STAFF_ADDED,
        durableName: "notification-staff-added",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            userId: string;
            role: string;
          };
          await this.notificationsService.deliverNotification({
            tenantId: payload.tenantId,
            userId: payload.userId,
            type: NOTIFICATION_TYPES.STAFF_ADDED,
            title: "Welcome to the team",
            message: `You have been added to the clinic as ${payload.role}.`,
            metadata: payload,
          });
        },
      },
      {
        subject: EVENT_TYPES.STAFF_ROLE_CHANGED,
        durableName: "notification-staff-role-changed",
        handler: async (event) => {
          const payload = event.payload as {
            tenantId: string;
            userId: string;
            previousRole: string;
            newRole: string;
          };
          await this.notificationsService.deliverNotification({
            tenantId: payload.tenantId,
            userId: payload.userId,
            type: NOTIFICATION_TYPES.ROLE_CHANGED,
            title: "Role updated",
            message: `Your role changed from ${payload.previousRole} to ${payload.newRole}.`,
            metadata: payload,
          });
        },
      },
    ];

    for (const subscription of subscriptions) {
      await this.eventBus.subscribe(
        toSubject(subscription.subject),
        async (event) => {
          try {
            await subscription.handler(event);
          } catch (error) {
            this.logger.error(
              `Failed to process ${subscription.subject}: ${
                error instanceof Error ? error.message : "unknown"
              }`,
            );
          }
        },
        {
          durableName: subscription.durableName,
          queueGroup: "notification-platform-events",
        },
      );
    }

    this.logger.log("Platform event consumers registered");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }
}
