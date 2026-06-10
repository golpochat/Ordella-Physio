import { Injectable } from "@nestjs/common";
import { RefundAggregate, paymentMustBeSucceeded, refundAmountMustNotExceedPayment } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateRefundDto } from "@/refunds/dto/create-refund.dto";
import { RefundsRepository } from "@/refunds/refunds.repository";
import { PaymentIntentsRepository } from "@/payment-intents/payment-intents.repository";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";
import { MockGateway } from "@/gateways/mock.gateway";
import { StripeGateway } from "@/gateways/stripe.gateway";
import { calculateRefundTotal } from "@/utils/calculation-helpers";

export type CreateRefundCommandInput = {
  tenantId: string;
  dto: CreateRefundDto;
  correlationId?: string;
};

@Injectable()
export class CreateRefundCommand {
  constructor(
    private readonly refundsRepository: RefundsRepository,
    private readonly paymentIntentsRepository: PaymentIntentsRepository,
    private readonly eventPublisher: PaymentEventPublisher,
    private readonly stripeGateway: StripeGateway,
    private readonly mockGateway: MockGateway,
  ) {}

  async execute(input: CreateRefundCommandInput) {
    const intent = await this.paymentIntentsRepository.findById(
      input.tenantId,
      input.dto.paymentIntentId,
    );

    if (!intent) {
      throw new Error("Payment intent not found");
    }

    const statusCheck = paymentMustBeSucceeded(intent.status);
    if (statusCheck.isFailure) {
      throw new Error(String(statusCheck.error));
    }

    const paymentAmount = Number(intent.amount);
    const refundAmount = calculateRefundTotal(input.dto.amount, paymentAmount);

    const amountCheck = refundAmountMustNotExceedPayment(refundAmount, paymentAmount);
    if (amountCheck.isFailure) {
      throw new Error(String(amountCheck.error));
    }

    const refundId = randomString(24);
    const aggregateResult = RefundAggregate.create({
      id: refundId,
      tenantId: input.tenantId,
      paymentIntentId: intent.id,
      amount: refundAmount,
      currency: intent.currency,
      reason: input.dto.reason,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const gateway = intent.provider === "STRIPE" ? this.stripeGateway : this.mockGateway;
    const providerPaymentId = intent.providerPaymentId ?? `pi_${intent.id}`;
    const gatewayResult = await gateway.refundPayment(providerPaymentId, refundAmount);

    const refund = await this.refundsRepository.create(input.tenantId, {
      id: refundId,
      paymentIntent: { connect: { id: intent.id } },
      amount: refundAmount,
      status: "SUCCEEDED",
      reason: input.dto.reason,
      providerRefundId: gatewayResult.providerRefundId,
    });

    await this.eventPublisher.publishRefundCreated(
      {
        tenantId: input.tenantId,
        refundId: refund.id,
        paymentIntentId: intent.id,
        amount: refundAmount,
        currency: intent.currency,
        status: refund.status,
        reason: input.dto.reason,
        createdAt: refund.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return refund;
  }
}
