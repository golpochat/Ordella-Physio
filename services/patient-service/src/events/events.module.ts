import { Global, Module } from "@nestjs/common";
import { PatientEventPublisher } from "@/events/patient-event.publisher";

@Global()
@Module({
  providers: [PatientEventPublisher],
  exports: [PatientEventPublisher],
})
export class EventsModule {}
