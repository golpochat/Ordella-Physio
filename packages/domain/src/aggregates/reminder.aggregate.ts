import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { ReminderCancelled, ReminderCreated } from "../events/communication.events";

export type ReminderType = "APPOINTMENT" | "PAYMENT" | "FOLLOW_UP";

export type ReminderChannel = "EMAIL" | "SMS" | "PUSH";

export type ReminderStatus = "PENDING" | "SCHEDULED" | "SENT" | "FAILED" | "CANCELLED";

export type ReminderAggregateProps = {
  id: string;
  tenantId: string;
  type: ReminderType;
  channel: ReminderChannel;
  to: string;
  message: string;
  sendAt: Date;
  status: ReminderStatus;
  recurring: boolean;
};

export type CreateReminderAggregateInput = {
  id: string;
  tenantId: string;
  type: ReminderType;
  channel: ReminderChannel;
  to: string;
  message: string;
  sendAt: string;
  recurring?: boolean;
  correlationId?: string;
};

export class ReminderAggregate extends AggregateRoot<ReminderAggregateProps> {
  private constructor(props: ReminderAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreateReminderAggregateInput): Result<ReminderAggregate> {
    const sendAt = new Date(input.sendAt);
    if (Number.isNaN(sendAt.getTime())) {
      return fail("Invalid reminder send time");
    }

    const aggregate = new ReminderAggregate({
      id: input.id,
      tenantId: input.tenantId,
      type: input.type,
      channel: input.channel,
      to: input.to,
      message: input.message,
      sendAt,
      status: "SCHEDULED",
      recurring: input.recurring ?? false,
    });

    aggregate.addDomainEvent(
      new ReminderCreated(
        {
          reminderId: aggregate.id,
          tenantId: aggregate.tenantId,
          type: aggregate.props.type,
          channel: aggregate.props.channel,
          sendAt: aggregate.props.sendAt.toISOString(),
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  markCancelled(reason?: string, correlationId?: string): Result<void> {
    (this.props as ReminderAggregateProps).status = "CANCELLED";

    this.addDomainEvent(
      new ReminderCancelled(
        {
          reminderId: this.id,
          tenantId: this.tenantId,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
