import { Injectable } from "@nestjs/common";
import type { SendNotificationDto } from "@/notifications/dto/send-notification.dto";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import { CommunicationEventPublisher } from "@/events/communication-event.publisher";
import { QueueService } from "@/queue/queue.module";
import { ChannelRouter } from "@/utils/channel-router";
import { EmailChannel } from "@/channels/email.channel";
import { SmsChannel } from "@/channels/sms.channel";
import { PushChannel } from "@/channels/push.channel";
import { WebhookChannel } from "@/channels/webhook.channel";
import { toNotificationResponse } from "@/notifications/notifications.mapper";

export type SendNotificationCommandInput = {
  tenantId: string;
  dto: SendNotificationDto;
  correlationId?: string;
};

@Injectable()
export class SendNotificationCommand {
  private readonly channelRouter: ChannelRouter;

  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly eventPublisher: CommunicationEventPublisher,
    private readonly queueService: QueueService,
    emailChannel: EmailChannel,
    smsChannel: SmsChannel,
    pushChannel: PushChannel,
    webhookChannel: WebhookChannel,
  ) {
    this.channelRouter = new ChannelRouter({
      EMAIL: emailChannel,
      SMS: smsChannel,
      PUSH: pushChannel,
      WEBHOOK: webhookChannel,
    });
  }

  async execute(input: SendNotificationCommandInput) {
    const notification = await this.notificationsRepository.findById(
      input.tenantId,
      input.dto.notificationId,
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.status === "CANCELLED" || notification.status === "SENT") {
      throw new Error(`Notification cannot be sent while ${notification.status}`);
    }

    await this.notificationsRepository.update(input.tenantId, notification.id, { status: "SENDING" });

    const driver = this.channelRouter.resolve(notification.channel);
    const result = await driver.send({
      tenantId: input.tenantId,
      to: notification.to,
      subject: notification.subject ?? undefined,
      body: notification.body,
      payload: (notification.payload as Record<string, unknown> | null) ?? undefined,
    });

    if (result.success) {
      const updated = await this.notificationsRepository.update(input.tenantId, notification.id, {
        status: "SENT",
        errorMessage: null,
      });

      await this.eventPublisher.publishNotificationSent(
        {
          tenantId: input.tenantId,
          notificationId: updated.id,
          channel: updated.channel,
          to: updated.to,
          sentAt: updated.updatedAt.toISOString(),
        },
        input.correlationId,
      );

      return toNotificationResponse(updated);
    }

    const failed = await this.notificationsRepository.update(input.tenantId, notification.id, {
      status: "FAILED",
      errorMessage: result.providerResponse,
    });

    await this.eventPublisher.publishNotificationFailed(
      {
        tenantId: input.tenantId,
        notificationId: failed.id,
        channel: failed.channel,
        reason: result.providerResponse,
        failedAt: failed.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    await this.queueService.enqueueWebhook({
      tenantId: input.tenantId,
      url: notification.to,
      payload: { notificationId: notification.id, status: "FAILED" },
    });

    return toNotificationResponse(failed);
  }
}
