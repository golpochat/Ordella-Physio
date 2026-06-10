import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import {
  CommunicationHealthController,
  NotificationsController,
} from "@/notifications/notifications.controller";
import { NotificationsService } from "@/notifications/notifications.service";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import { CreateNotificationCommand } from "@/notifications/commands/create-notification.command";
import { SendNotificationCommand } from "@/notifications/commands/send-notification.command";
import { CancelNotificationCommand } from "@/notifications/commands/cancel-notification.command";
import { JwtStrategy } from "@/notifications/strategies/jwt.strategy";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { EmailChannel } from "@/channels/email.channel";
import { SmsChannel } from "@/channels/sms.channel";
import { PushChannel } from "@/channels/push.channel";
import { WebhookChannel } from "@/channels/webhook.channel";
import { EventsModule } from "@/events/events.module";
import { QueueModule } from "@/queue/queue.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule, QueueModule],
  controllers: [CommunicationHealthController, NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    CreateNotificationCommand,
    SendNotificationCommand,
    CancelNotificationCommand,
    JwtStrategy,
    JwtGuard,
    EmailChannel,
    SmsChannel,
    PushChannel,
    WebhookChannel,
  ],
  exports: [NotificationsService, NotificationsRepository, JwtGuard],
})
export class NotificationsModule {}
