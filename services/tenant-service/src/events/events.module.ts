import { Global, Module } from "@nestjs/common";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";

@Global()
@Module({
  providers: [TenantEventPublisher],
  exports: [TenantEventPublisher],
})
export class EventsModule {}
