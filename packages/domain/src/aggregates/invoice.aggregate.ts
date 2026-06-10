import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { InvoiceCreated, InvoicePaid, InvoiceRefunded } from "../events/billing.events";
import { Money } from "../value-objects/money.vo";

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: Money;
};

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "VOIDED";

export type InvoiceAggregateProps = {
  id: string;
  tenantId: string;
  patientId: string;
  items: InvoiceItem[];
  total: Money;
  status: InvoiceStatus;
};

export type CreateInvoiceAggregateInput = {
  id: string;
  tenantId: string;
  patientId: string;
  currency: string;
  items: Array<{ id: string; description: string; quantity: number; unitPrice: number }>;
  correlationId?: string;
};

export class InvoiceAggregate extends AggregateRoot<InvoiceAggregateProps> {
  private constructor(props: InvoiceAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get status(): InvoiceStatus {
    return this.props.status;
  }

  static create(input: CreateInvoiceAggregateInput): Result<InvoiceAggregate> {
    if (input.items.length === 0) {
      return fail("Invoice must contain at least one item");
    }

    const items: InvoiceItem[] = [];
    const initialTotal = Money.create(0, input.currency);
    if (initialTotal.isFailure) {
      return fail(initialTotal.error);
    }

    let runningTotal: Money = initialTotal.value;

    for (const item of input.items) {
      const unitPrice = Money.create(item.unitPrice, input.currency);
      if (unitPrice.isFailure) {
        return fail(unitPrice.error);
      }

      items.push({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: unitPrice.value,
      });

      const lineTotal = unitPrice.value.multiply(item.quantity);
      if (lineTotal.isFailure) {
        return fail(lineTotal.error);
      }

      const nextTotal = runningTotal.add(lineTotal.value);
      if (nextTotal.isFailure) {
        return fail(nextTotal.error);
      }
      runningTotal = nextTotal.value;
    }

    const aggregate = new InvoiceAggregate({
      id: input.id,
      tenantId: input.tenantId,
      patientId: input.patientId,
      items,
      total: runningTotal,
      status: "DRAFT",
    });

    aggregate.addDomainEvent(
      new InvoiceCreated(
        {
          invoiceId: aggregate.id,
          tenantId: aggregate.tenantId,
          patientId: aggregate.props.patientId,
          totalAmount: aggregate.props.total.amount,
          currency: aggregate.props.total.currency,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  markPaid(correlationId?: string): Result<void> {
    if (this.props.status === "PAID") {
      return fail("Invoice is already paid");
    }

    (this.props as InvoiceAggregateProps).status = "PAID";

    this.addDomainEvent(
      new InvoicePaid(
        {
          invoiceId: this.id,
          tenantId: this.tenantId,
          paidAmount: this.props.total.amount,
          currency: this.props.total.currency,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  refund(amount: number, reason?: string, correlationId?: string): Result<void> {
    const refundMoney = Money.create(amount, this.props.total.currency);
    if (refundMoney.isFailure) {
      return fail(refundMoney.error);
    }

    this.addDomainEvent(
      new InvoiceRefunded(
        {
          invoiceId: this.id,
          tenantId: this.tenantId,
          refundedAmount: amount,
          currency: this.props.total.currency,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
