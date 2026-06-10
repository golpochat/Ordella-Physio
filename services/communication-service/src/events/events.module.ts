import { Global, Module } from "@nestjs/common";
import { CommunicationEventPublisher } from "@/events/communication-event.publisher";

@Global()
@Module({
  providers: [CommunicationEventPublisher],
  exports: [CommunicationEventPublisher],
})
export class EventsModule {}
