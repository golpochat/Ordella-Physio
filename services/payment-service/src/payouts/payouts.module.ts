import { Module } from "@nestjs/common";
import { PayoutsController } from "@/payouts/payouts.controller";
import { PayoutsService } from "@/payouts/payouts.service";
import { PayoutsRepository } from "@/payouts/payouts.repository";
import { CreatePayoutCommand } from "@/payouts/commands/create-payout.command";
import { PaymentIntentsModule } from "@/payment-intents/payment-intents.module";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [PaymentIntentsModule, EventsModule],
  controllers: [PayoutsController],
  providers: [PayoutsService, PayoutsRepository, CreatePayoutCommand],
  exports: [PayoutsService, PayoutsRepository],
})
export class PayoutsModule {}
