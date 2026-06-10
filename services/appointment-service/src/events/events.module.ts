import { Global, Module } from "@nestjs/common";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";

@Global()
@Module({
  providers: [AppointmentEventPublisher],
  exports: [AppointmentEventPublisher],
})
export class EventsModule {}
