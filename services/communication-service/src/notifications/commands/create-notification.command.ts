import { Injectable } from "@nestjs/common";
import { NotificationAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateNotificationDto } from "@/notifications/dto/create-notification.dto";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import { CommunicationEventPublisher } from "@/events/communication-event.publisher";
import { QueueService } from "@/queue/queue.module";
import { fetchTenantBrandingPlaceholder } from "@/utils/communication-helpers";
import { renderFallbackTemplate } from "@/utils/template-renderer";
import { toNotificationResponse } from "@/notifications/notifications.mapper";

export type CreateNotificationCommandInput = {
  tenantId: string;
  dto: CreateNotificationDto;
  correlationId?: string;
};

@Injectable()
export class CreateNotificationCommand {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly eventPublisher: CommunicationEventPublisher,
    private readonly queueService: QueueService,
  ) {}

  async execute(input: CreateNotificationCommandInput) {
    const notificationId = randomString(24);
    const branding = await fetchTenantBrandingPlaceholder(input.tenantId);
    const body =
      input.dto.body ??
      (input.dto.templateKey
        ? renderFallbackTemplate(`${input.dto.templateKey}.hbs`, input.dto.payload, branding)
        : "");

    const aggregateResult = NotificationAggregate.create({
      id: notificationId,
      tenantId: input.tenantId,
      channel: input.dto.channel,
      to: input.dto.to,
      subject: input.dto.subject,
      body,
      scheduledAt: input.dto.scheduledAt,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const notification = await this.notificationsRepository.create(input.tenantId, {
      id: notificationId,
      channel: input.dto.channel,
      templateKey: input.dto.templateKey,
      to: input.dto.to,
      subject: input.dto.subject,
      body,
      payload: input.dto.payload as never,
      status: "PENDING",
      scheduledAt: input.dto.scheduledAt ? new Date(input.dto.scheduledAt) : undefined,
    });

    await this.eventPublisher.publishNotificationCreated(
      {
        tenantId: input.tenantId,
        notificationId: notification.id,
        channel: notification.channel,
        to: notification.to,
        status: notification.status,
        createdAt: notification.createdAt.toISOString(),
      },
      input.correlationId,
    );

    if (input.dto.scheduledAt) {
      const delayMs = Math.max(new Date(input.dto.scheduledAt).getTime() - Date.now(), 0);
      const job = await this.queueService.enqueueNotification(
        {
          tenantId: input.tenantId,
          notificationId: notification.id,
          channel: notification.channel,
          to: notification.to,
          subject: notification.subject ?? undefined,
          body: notification.body,
          payload: input.dto.payload,
        },
        delayMs,
      );
      await this.notificationsRepository.update(input.tenantId, notification.id, {
        jobId: String(job.id),
      });
    }

    return toNotificationResponse(notification);
  }
}
