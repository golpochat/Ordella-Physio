import { Global, Module } from "@nestjs/common";
import { NotificationEventPublisher } from "@/events/notification-event.publisher";

@Global()
@Module({
  providers: [NotificationEventPublisher],
  exports: [NotificationEventPublisher],
})
export class EventsModule {}
