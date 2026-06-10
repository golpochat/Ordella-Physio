import { Module } from "@nestjs/common";
import { SubscriptionService } from "@/subscription/subscription.service";
import { SubscriptionRepository } from "@/subscription/subscription.repository";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [SubscriptionService, SubscriptionRepository],
  exports: [SubscriptionService, SubscriptionRepository],
})
export class SubscriptionModule {}
