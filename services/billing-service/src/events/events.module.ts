import { Global, Module } from "@nestjs/common";
import { BillingEventPublisher } from "@/events/billing-event.publisher";

@Global()
@Module({
  providers: [BillingEventPublisher],
  exports: [BillingEventPublisher],
})
export class EventsModule {}
