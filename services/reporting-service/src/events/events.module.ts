import { Global, Module } from "@nestjs/common";
import { ReportingEventPublisher } from "@/events/reporting-event.publisher";

@Global()
@Module({
  providers: [ReportingEventPublisher],
  exports: [ReportingEventPublisher],
})
export class EventsModule {}
