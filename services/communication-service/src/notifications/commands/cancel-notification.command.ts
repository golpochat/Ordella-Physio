import { Injectable } from "@nestjs/common";
import type { CancelNotificationDto } from "@/notifications/dto/cancel-notification.dto";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import { CommunicationEventPublisher } from "@/events/communication-event.publisher";
import { toNotificationResponse } from "@/notifications/notifications.mapper";

export type CancelNotificationCommandInput = {
  tenantId: string;
  notificationId: string;
  dto: CancelNotificationDto;
  correlationId?: string;
};

@Injectable()
export class CancelNotificationCommand {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly eventPublisher: CommunicationEventPublisher,
  ) {}

  async execute(input: CancelNotificationCommandInput) {
    const notification = await this.notificationsRepository.findById(
      input.tenantId,
      input.notificationId,
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    const updated = await this.notificationsRepository.update(input.tenantId, notification.id, {
      status: "CANCELLED",
    });

    await this.eventPublisher.publishNotificationCancelled(
      {
        tenantId: input.tenantId,
        notificationId: updated.id,
        reason: input.dto.reason,
        cancelledAt: updated.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toNotificationResponse(updated);
  }
}
