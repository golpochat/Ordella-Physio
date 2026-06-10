import { Module } from "@nestjs/common";
import { RefundsController } from "@/refunds/refunds.controller";
import { RefundsService } from "@/refunds/refunds.service";
import { RefundsRepository } from "@/refunds/refunds.repository";
import { CreateRefundCommand } from "@/refunds/commands/create-refund.command";
import { PaymentIntentsModule } from "@/payment-intents/payment-intents.module";
import { EventsModule } from "@/events/events.module";
import { StripeGateway } from "@/gateways/stripe.gateway";
import { MockGateway } from "@/gateways/mock.gateway";

@Module({
  imports: [PaymentIntentsModule, EventsModule],
  controllers: [RefundsController],
  providers: [
    RefundsService,
    RefundsRepository,
    CreateRefundCommand,
    StripeGateway,
    MockGateway,
  ],
  exports: [RefundsService, RefundsRepository],
})
export class RefundsModule {}
