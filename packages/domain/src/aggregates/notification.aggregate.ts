import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import {
  NotificationCancelled,
  NotificationCreated,
  NotificationFailed,
  NotificationSent,
} from "../events/communication.events";
import { Email } from "../value-objects/email.vo";
import { Phone } from "../value-objects/phone.vo";

export type NotificationChannel = "EMAIL" | "SMS" | "PUSH" | "WEBHOOK";

export type NotificationStatus = "PENDING" | "SENDING" | "SENT" | "FAILED" | "CANCELLED";

export type NotificationAggregateProps = {
  id: string;
  tenantId: string;
  channel: NotificationChannel;
  to: string;
  subject?: string;
  body: string;
  status: NotificationStatus;
  scheduledAt?: Date;
};

export type CreateNotificationAggregateInput = {
  id: string;
  tenantId: string;
  channel: NotificationChannel;
  to: string;
  subject?: string;
  body: string;
  scheduledAt?: string;
  correlationId?: string;
};

export class NotificationAggregate extends AggregateRoot<NotificationAggregateProps> {
  private constructor(props: NotificationAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get status(): NotificationStatus {
    return this.props.status;
  }

  static create(input: CreateNotificationAggregateInput): Result<NotificationAggregate> {
    if (input.channel === "EMAIL") {
      const email = Email.create(input.to);
      if (email.isFailure) {
        return fail("Invalid email address");
      }
    }

    if (input.channel === "SMS") {
      const phone = Phone.create(input.to);
      if (phone.isFailure) {
        return fail("Invalid phone number");
      }
    }

    const aggregate = new NotificationAggregate({
      id: input.id,
      tenantId: input.tenantId,
      channel: input.channel,
      to: input.to,
      subject: input.subject,
      body: input.body,
      status: "PENDING",
      scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : undefined,
    });

    aggregate.addDomainEvent(
      new NotificationCreated(
        {
          notificationId: aggregate.id,
          tenantId: aggregate.tenantId,
          channel: aggregate.props.channel,
          to: aggregate.props.to,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  markSending(): Result<void> {
    (this.props as NotificationAggregateProps).status = "SENDING";
    return ok(undefined);
  }

  markSent(correlationId?: string): Result<void> {
    (this.props as NotificationAggregateProps).status = "SENT";

    this.addDomainEvent(
      new NotificationSent(
        {
          notificationId: this.id,
          tenantId: this.tenantId,
          channel: this.props.channel,
          to: this.props.to,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  markFailed(reason?: string, correlationId?: string): Result<void> {
    (this.props as NotificationAggregateProps).status = "FAILED";

    this.addDomainEvent(
      new NotificationFailed(
        {
          notificationId: this.id,
          tenantId: this.tenantId,
          channel: this.props.channel,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  markCancelled(reason?: string, correlationId?: string): Result<void> {
    (this.props as NotificationAggregateProps).status = "CANCELLED";

    this.addDomainEvent(
      new NotificationCancelled(
        {
          notificationId: this.id,
          tenantId: this.tenantId,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
