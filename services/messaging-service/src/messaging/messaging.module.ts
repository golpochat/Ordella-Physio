import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EventsModule } from "@/events/events.module";
import { JwtGuard } from "@/messaging/guards/jwt.guard";
import { MessagingTenantGuard } from "@/messaging/guards/messaging-tenant.guard";
import { MessagingController } from "@/messaging/messaging.controller";
import { MessagingRepository } from "@/messaging/messaging.repository";
import { MessagingService } from "@/messaging/messaging.service";
import { JwtStrategy } from "@/messaging/strategies/jwt.strategy";
import { TypingService } from "@/messaging/typing.service";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule],
  controllers: [MessagingController],
  providers: [
    MessagingService,
    MessagingRepository,
    TypingService,
    JwtStrategy,
    JwtGuard,
    MessagingTenantGuard,
  ],
  exports: [MessagingService, MessagingRepository],
})
export class MessagingModule {}
