import { Injectable } from "@nestjs/common";
import { PayoutAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreatePayoutDto } from "@/payouts/dto/create-payout.dto";
import { PayoutsRepository } from "@/payouts/payouts.repository";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";
import { DEFAULT_CURRENCY } from "@/constants";
import { validateProviderEarningsPlaceholder } from "@/utils/calculation-helpers";

export type CreatePayoutCommandInput = {
  tenantId: string;
  dto: CreatePayoutDto;
  correlationId?: string;
};

@Injectable()
export class CreatePayoutCommand {
  constructor(
    private readonly payoutsRepository: PayoutsRepository,
    private readonly eventPublisher: PaymentEventPublisher,
  ) {}

  async execute(input: CreatePayoutCommandInput) {
    if (!validateProviderEarningsPlaceholder(input.dto.providerId, input.dto.amount)) {
      throw new Error("Provider earnings validation failed");
    }

    const payoutId = randomString(24);
    const currency = input.dto.currency ?? DEFAULT_CURRENCY;

    const aggregateResult = PayoutAggregate.create({
      id: payoutId,
      tenantId: input.tenantId,
      providerId: input.dto.providerId,
      amount: input.dto.amount,
      currency,
      scheduledFor: input.dto.scheduledFor,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const payout = await this.payoutsRepository.create(input.tenantId, {
      id: payoutId,
      providerId: input.dto.providerId,
      amount: input.dto.amount,
      currency,
      status: "PENDING",
      scheduledFor: input.dto.scheduledFor ? new Date(input.dto.scheduledFor) : undefined,
    });

    await this.eventPublisher.publishPayoutCreated(
      {
        tenantId: input.tenantId,
        payoutId: payout.id,
        providerId: payout.providerId,
        amount: input.dto.amount,
        currency: payout.currency,
        status: payout.status,
        scheduledFor: payout.scheduledFor?.toISOString() ?? null,
        createdAt: payout.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return payout;
  }
}
