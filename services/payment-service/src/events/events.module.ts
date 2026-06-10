import { Global, Module } from "@nestjs/common";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";

@Global()
@Module({
  providers: [PaymentEventPublisher],
  exports: [PaymentEventPublisher],
})
export class EventsModule {}
