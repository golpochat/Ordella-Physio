import { Injectable } from "@nestjs/common";
import type { CancelPaymentIntentDto } from "@/payment-intents/dto/cancel-payment-intent.dto";
import { PaymentIntentsRepository } from "@/payment-intents/payment-intents.repository";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";
import { toPaymentIntentResponse } from "@/payment-intents/payment-intents.mapper";

export type CancelPaymentIntentCommandInput = {
  tenantId: string;
  paymentIntentId: string;
  dto: CancelPaymentIntentDto;
  correlationId?: string;
};

@Injectable()
export class CancelPaymentIntentCommand {
  constructor(
    private readonly paymentIntentsRepository: PaymentIntentsRepository,
    private readonly eventPublisher: PaymentEventPublisher,
  ) {}

  async execute(input: CancelPaymentIntentCommandInput) {
    const intent = await this.paymentIntentsRepository.findById(
      input.tenantId,
      input.paymentIntentId,
    );

    if (!intent) {
      throw new Error("Payment intent not found");
    }

    const updated = await this.paymentIntentsRepository.update(input.tenantId, intent.id, {
      status: "CANCELLED",
    });

    await this.eventPublisher.publishPaymentCancelled(
      {
        tenantId: input.tenantId,
        paymentIntentId: updated.id,
        invoiceId: updated.invoiceId,
        reason: input.dto.reason,
        cancelledAt: updated.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toPaymentIntentResponse(updated);
  }
}
