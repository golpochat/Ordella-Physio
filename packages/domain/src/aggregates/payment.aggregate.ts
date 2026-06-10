import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import {
  PaymentCancelled,
  PaymentFailed,
  PaymentIntentCreated,
  PaymentSucceeded,
} from "../events/payment.events";
import { Money } from "../value-objects/money.vo";

export type PaymentIntentStatus =
  | "REQUIRES_PAYMENT_METHOD"
  | "REQUIRES_CONFIRMATION"
  | "PROCESSING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED";

export type PaymentAggregateProps = {
  id: string;
  tenantId: string;
  invoiceId: string;
  patientId: string;
  amount: Money;
  provider: string;
  status: PaymentIntentStatus;
};

export type CreatePaymentAggregateInput = {
  id: string;
  tenantId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  provider: string;
  correlationId?: string;
};

export class PaymentAggregate extends AggregateRoot<PaymentAggregateProps> {
  private constructor(props: PaymentAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get status(): PaymentIntentStatus {
    return this.props.status;
  }

  static create(input: CreatePaymentAggregateInput): Result<PaymentAggregate> {
    const amount = Money.create(input.amount, input.currency);
    if (amount.isFailure) {
      return fail(amount.error);
    }

    const aggregate = new PaymentAggregate({
      id: input.id,
      tenantId: input.tenantId,
      invoiceId: input.invoiceId,
      patientId: input.patientId,
      amount: amount.value,
      provider: input.provider,
      status: "REQUIRES_PAYMENT_METHOD",
    });

    aggregate.addDomainEvent(
      new PaymentIntentCreated(
        {
          paymentIntentId: aggregate.id,
          tenantId: aggregate.tenantId,
          invoiceId: aggregate.props.invoiceId,
          patientId: aggregate.props.patientId,
          amount: aggregate.props.amount.amount,
          currency: aggregate.props.amount.currency,
          provider: aggregate.props.provider,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  markProcessing(): Result<void> {
    (this.props as PaymentAggregateProps).status = "PROCESSING";
    return ok(undefined);
  }

  markSucceeded(correlationId?: string): Result<void> {
    (this.props as PaymentAggregateProps).status = "SUCCEEDED";

    this.addDomainEvent(
      new PaymentSucceeded(
        {
          paymentId: this.id,
          tenantId: this.tenantId,
          invoiceId: this.props.invoiceId,
          amount: this.props.amount.amount,
          currency: this.props.amount.currency,
          provider: this.props.provider,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  markFailed(reason?: string, correlationId?: string): Result<void> {
    (this.props as PaymentAggregateProps).status = "FAILED";

    this.addDomainEvent(
      new PaymentFailed(
        {
          paymentId: this.id,
          tenantId: this.tenantId,
          invoiceId: this.props.invoiceId,
          amount: this.props.amount.amount,
          currency: this.props.amount.currency,
          provider: this.props.provider,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  markCancelled(reason?: string, correlationId?: string): Result<void> {
    (this.props as PaymentAggregateProps).status = "CANCELLED";

    this.addDomainEvent(
      new PaymentCancelled(
        {
          paymentIntentId: this.id,
          tenantId: this.tenantId,
          invoiceId: this.props.invoiceId,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
