import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EmailDeliveryService } from "@/delivery/email-delivery.service";
import { EventsModule } from "@/events/events.module";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { NotificationTenantGuard } from "@/notifications/guards/notification-tenant.guard";
import { NotificationsController } from "@/notifications/notifications.controller";
import { NotificationsRepository } from "@/notifications/notifications.repository";
import { NotificationsService } from "@/notifications/notifications.service";
import { JwtStrategy } from "@/notifications/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    EmailDeliveryService,
    JwtStrategy,
    JwtGuard,
    NotificationTenantGuard,
  ],
  exports: [NotificationsService, NotificationsRepository],
})
export class NotificationsModule {}
