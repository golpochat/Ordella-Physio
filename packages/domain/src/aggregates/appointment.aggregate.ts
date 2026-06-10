import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import {
  AppointmentCancelled,
  AppointmentCreated,
  AppointmentRescheduled,
} from "../events/appointment.events";
import { EntityId } from "../value-objects/id.vo";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type AppointmentAggregateProps = {
  id: string;
  tenantId: string;
  patientId: EntityId;
  therapistId: EntityId;
  locationId: EntityId;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  type: string;
};

export type CreateAppointmentAggregateInput = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: Date;
  endTime: Date;
  type: string;
  correlationId?: string;
};

export class AppointmentAggregate extends AggregateRoot<AppointmentAggregateProps> {
  private constructor(props: AppointmentAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  static create(input: CreateAppointmentAggregateInput): Result<AppointmentAggregate> {
    if (input.startTime >= input.endTime) {
      return fail("Appointment end time must be after start time");
    }

    const patientId = EntityId.create(input.patientId);
    const therapistId = EntityId.create(input.therapistId);
    const locationId = EntityId.create(input.locationId);

    if (patientId.isFailure || therapistId.isFailure || locationId.isFailure) {
      return fail("Invalid appointment reference id");
    }

    const aggregate = new AppointmentAggregate({
      id: input.id,
      tenantId: input.tenantId,
      patientId: patientId.value,
      therapistId: therapistId.value,
      locationId: locationId.value,
      startTime: input.startTime,
      endTime: input.endTime,
      status: "SCHEDULED",
      type: input.type,
    });

    aggregate.addDomainEvent(
      new AppointmentCreated(
        {
          appointmentId: aggregate.id,
          tenantId: aggregate.tenantId,
          patientId: aggregate.props.patientId.value,
          therapistId: aggregate.props.therapistId.value,
          startTime: aggregate.props.startTime.toISOString(),
          endTime: aggregate.props.endTime.toISOString(),
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  reschedule(startTime: Date, endTime: Date, correlationId?: string): Result<void> {
    if (startTime >= endTime) {
      return fail("Appointment end time must be after start time");
    }

    const previousStartTime = this.props.startTime.toISOString();
    const previousEndTime = this.props.endTime.toISOString();

    (this.props as AppointmentAggregateProps).startTime = startTime;
    (this.props as AppointmentAggregateProps).endTime = endTime;
    (this.props as AppointmentAggregateProps).status = "SCHEDULED";

    this.addDomainEvent(
      new AppointmentRescheduled(
        {
          appointmentId: this.id,
          tenantId: this.tenantId,
          previousStartTime,
          previousEndTime,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  cancel(reason?: string, correlationId?: string): Result<void> {
    (this.props as AppointmentAggregateProps).status = "CANCELLED";

    this.addDomainEvent(
      new AppointmentCancelled(
        {
          appointmentId: this.id,
          tenantId: this.tenantId,
          reason,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
