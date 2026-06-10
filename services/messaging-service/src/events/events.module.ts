import { Global, Module } from "@nestjs/common";
import { MessagingEventPublisher } from "@/events/messaging-event.publisher";

@Global()
@Module({
  providers: [MessagingEventPublisher],
  exports: [MessagingEventPublisher],
})
export class EventsModule {}
