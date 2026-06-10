import { Injectable } from "@nestjs/common";
import type { ConfirmPaymentDto } from "@/payment-intents/dto/confirm-payment.dto";
import { PaymentIntentsRepository } from "@/payment-intents/payment-intents.repository";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";
import { MockGateway } from "@/gateways/mock.gateway";
import { StripeGateway } from "@/gateways/stripe.gateway";
import { toPaymentIntentResponse } from "@/payment-intents/payment-intents.mapper";

export type ConfirmPaymentCommandInput = {
  tenantId: string;
  dto: ConfirmPaymentDto;
  correlationId?: string;
};

@Injectable()
export class ConfirmPaymentCommand {
  constructor(
    private readonly paymentIntentsRepository: PaymentIntentsRepository,
    private readonly eventPublisher: PaymentEventPublisher,
    private readonly stripeGateway: StripeGateway,
    private readonly mockGateway: MockGateway,
  ) {}

  async execute(input: ConfirmPaymentCommandInput) {
    const intent = await this.paymentIntentsRepository.findById(
      input.tenantId,
      input.dto.paymentIntentId,
    );

    if (!intent) {
      throw new Error("Payment intent not found");
    }

    const gateway = intent.provider === "STRIPE" ? this.stripeGateway : this.mockGateway;
    const providerPaymentId = intent.providerPaymentId ?? `pi_${intent.id}`;
    const gatewayResult = await gateway.confirmPayment(providerPaymentId);

    const status = gatewayResult.status === "succeeded" ? "SUCCEEDED" : "FAILED";
    const updated = await this.paymentIntentsRepository.update(input.tenantId, intent.id, {
      status,
      providerPaymentId: gatewayResult.providerPaymentId,
    });

    if (status === "SUCCEEDED") {
      await this.eventPublisher.publishPaymentSucceeded(
        {
          tenantId: input.tenantId,
          paymentIntentId: updated.id,
          invoiceId: updated.invoiceId,
          amount: Number(updated.amount),
          currency: updated.currency,
          provider: updated.provider,
          succeededAt: updated.updatedAt.toISOString(),
        },
        input.correlationId,
      );
    } else {
      await this.eventPublisher.publishPaymentFailed(
        {
          tenantId: input.tenantId,
          paymentIntentId: updated.id,
          invoiceId: updated.invoiceId,
          amount: Number(updated.amount),
          currency: updated.currency,
          provider: updated.provider,
          reason: "Gateway confirmation failed",
          failedAt: updated.updatedAt.toISOString(),
        },
        input.correlationId,
      );
    }

    return toPaymentIntentResponse(updated);
  }
}
