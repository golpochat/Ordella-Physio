import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EventsModule } from "@/events/events.module";
import { JwtGuard } from "@/messaging/guards/jwt.guard";
import { MessagingTenantGuard } from "@/messaging/guards/messaging-tenant.guard";
import { MessagingController } from "@/messaging/messaging.controller";
import { MessagingRealtimeController } from "@/messaging/messaging-realtime.controller";
import { MessagingRepository } from "@/messaging/messaging.repository";
import { MessagingService } from "@/messaging/messaging.service";
import { MessagingRealtimeService } from "@/messaging/messaging-realtime.service";
import { JwtStrategy } from "@/messaging/strategies/jwt.strategy";
import { TypingService } from "@/messaging/typing.service";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule],
  controllers: [MessagingController, MessagingRealtimeController],
  providers: [
    MessagingService,
    MessagingRepository,
    MessagingRealtimeService,
    TypingService,
    JwtStrategy,
    JwtGuard,
    MessagingTenantGuard,
  ],
  exports: [MessagingService, MessagingRepository],
})
export class MessagingModule {}
