import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { RefundCreated } from "../events/payment.events";
import { Money } from "../value-objects/money.vo";

export type RefundStatus = "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED";

export type RefundAggregateProps = {
  id: string;
  tenantId: string;
  paymentIntentId: string;
  amount: Money;
  status: RefundStatus;
  reason?: string;
};

export type CreateRefundAggregateInput = {
  id: string;
  tenantId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  reason?: string;
  correlationId?: string;
};

export class RefundAggregate extends AggregateRoot<RefundAggregateProps> {
  private constructor(props: RefundAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreateRefundAggregateInput): Result<RefundAggregate> {
    const amount = Money.create(input.amount, input.currency);
    if (amount.isFailure) {
      return fail(amount.error);
    }

    const aggregate = new RefundAggregate({
      id: input.id,
      tenantId: input.tenantId,
      paymentIntentId: input.paymentIntentId,
      amount: amount.value,
      status: "PENDING",
      reason: input.reason,
    });

    aggregate.addDomainEvent(
      new RefundCreated(
        {
          refundId: aggregate.id,
          tenantId: aggregate.tenantId,
          paymentIntentId: aggregate.props.paymentIntentId,
          amount: aggregate.props.amount.amount,
          currency: aggregate.props.amount.currency,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }
}
