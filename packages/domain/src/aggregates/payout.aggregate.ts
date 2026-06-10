import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { PayoutCreated } from "../events/payment.events";
import { Money } from "../value-objects/money.vo";

export type PayoutStatus = "PENDING" | "PROCESSING" | "PAID" | "FAILED" | "CANCELLED";

export type PayoutAggregateProps = {
  id: string;
  tenantId: string;
  providerId: string;
  amount: Money;
  status: PayoutStatus;
  scheduledFor?: Date;
};

export type CreatePayoutAggregateInput = {
  id: string;
  tenantId: string;
  providerId: string;
  amount: number;
  currency: string;
  scheduledFor?: string;
  correlationId?: string;
};

export class PayoutAggregate extends AggregateRoot<PayoutAggregateProps> {
  private constructor(props: PayoutAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreatePayoutAggregateInput): Result<PayoutAggregate> {
    const amount = Money.create(input.amount, input.currency);
    if (amount.isFailure) {
      return fail(amount.error);
    }

    const aggregate = new PayoutAggregate({
      id: input.id,
      tenantId: input.tenantId,
      providerId: input.providerId,
      amount: amount.value,
      status: "PENDING",
      scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : undefined,
    });

    aggregate.addDomainEvent(
      new PayoutCreated(
        {
          payoutId: aggregate.id,
          tenantId: aggregate.tenantId,
          providerId: aggregate.props.providerId,
          amount: aggregate.props.amount.amount,
          currency: aggregate.props.amount.currency,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }
}
