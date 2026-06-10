import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { LedgerEntryCreated } from "../events/payment.events";
import { Money } from "../value-objects/money.vo";

export type LedgerEntryType = "PAYMENT" | "REFUND" | "PAYOUT";

export type LedgerEntryAggregateProps = {
  id: string;
  tenantId: string;
  type: LedgerEntryType;
  referenceId: string;
  amount: Money;
  description?: string;
};

export type CreateLedgerEntryAggregateInput = {
  id: string;
  tenantId: string;
  type: LedgerEntryType;
  referenceId: string;
  amount: number;
  currency: string;
  description?: string;
  correlationId?: string;
};

export class LedgerEntryAggregate extends AggregateRoot<LedgerEntryAggregateProps> {
  private constructor(props: LedgerEntryAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreateLedgerEntryAggregateInput): Result<LedgerEntryAggregate> {
    const amount = Money.create(input.amount, input.currency);
    if (amount.isFailure) {
      return fail(amount.error);
    }

    const aggregate = new LedgerEntryAggregate({
      id: input.id,
      tenantId: input.tenantId,
      type: input.type,
      referenceId: input.referenceId,
      amount: amount.value,
      description: input.description,
    });

    aggregate.addDomainEvent(
      new LedgerEntryCreated(
        {
          ledgerEntryId: aggregate.id,
          tenantId: aggregate.tenantId,
          type: aggregate.props.type,
          referenceId: aggregate.props.referenceId,
          amount: aggregate.props.amount.amount,
          currency: aggregate.props.amount.currency,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }
}
