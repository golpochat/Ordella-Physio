import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import {
  PaymentHealthController,
  PaymentIntentsController,
} from "@/payment-intents/payment-intents.controller";
import { PaymentIntentsService } from "@/payment-intents/payment-intents.service";
import { PaymentIntentsRepository } from "@/payment-intents/payment-intents.repository";
import { CreatePaymentIntentCommand } from "@/payment-intents/commands/create-payment-intent.command";
import { ConfirmPaymentCommand } from "@/payment-intents/commands/confirm-payment.command";
import { CancelPaymentIntentCommand } from "@/payment-intents/commands/cancel-payment-intent.command";
import { JwtStrategy } from "@/payment-intents/strategies/jwt.strategy";
import { JwtGuard } from "@/payment-intents/guards/jwt.guard";
import { StripeGateway } from "@/gateways/stripe.gateway";
import { MockGateway } from "@/gateways/mock.gateway";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule],
  controllers: [PaymentHealthController, PaymentIntentsController],
  providers: [
    PaymentIntentsService,
    PaymentIntentsRepository,
    CreatePaymentIntentCommand,
    ConfirmPaymentCommand,
    CancelPaymentIntentCommand,
    JwtStrategy,
    JwtGuard,
    StripeGateway,
    MockGateway,
  ],
  exports: [PaymentIntentsService, PaymentIntentsRepository, JwtGuard],
})
export class PaymentIntentsModule {}
