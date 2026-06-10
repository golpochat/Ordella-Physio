import { Injectable } from "@nestjs/common";
import { CreateNotificationCommand } from "@/notifications/commands/create-notification.command";
import { SendNotificationCommand } from "@/notifications/commands/send-notification.command";
import { CancelNotificationCommand } from "@/notifications/commands/cancel-notification.command";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import type { CreateNotificationDto } from "@/notifications/dto/create-notification.dto";
import type { SendNotificationDto } from "@/notifications/dto/send-notification.dto";
import type { CancelNotificationDto } from "@/notifications/dto/cancel-notification.dto";
import {
  toNotificationListResponse,
  toNotificationResponse,
} from "@/notifications/notifications.mapper";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly createNotificationCommand: CreateNotificationCommand,
    private readonly sendNotificationCommand: SendNotificationCommand,
    private readonly cancelNotificationCommand: CancelNotificationCommand,
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  create(tenantId: string, dto: CreateNotificationDto, correlationId?: string) {
    return this.createNotificationCommand.execute({ tenantId, dto, correlationId });
  }

  send(tenantId: string, dto: SendNotificationDto, correlationId?: string) {
    return this.sendNotificationCommand.execute({ tenantId, dto, correlationId });
  }

  cancel(
    tenantId: string,
    notificationId: string,
    dto: CancelNotificationDto,
    correlationId?: string,
  ) {
    return this.cancelNotificationCommand.execute({
      tenantId,
      notificationId,
      dto,
      correlationId,
    });
  }

  async findById(tenantId: string, notificationId: string) {
    const notification = await this.notificationsRepository.findById(tenantId, notificationId);
    return notification ? toNotificationResponse(notification) : null;
  }

  async list(tenantId: string, status?: string) {
    const notifications = await this.notificationsRepository.list(
      tenantId,
      status ? { status: status as never } : {},
    );
    return toNotificationListResponse(notifications);
  }
}
