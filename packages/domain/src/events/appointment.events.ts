import { DomainEvent } from "../core/domain-event";

export type AppointmentCreatedPayload = {
  appointmentId: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  startTime: string;
  endTime: string;
};

export class AppointmentCreated extends DomainEvent<AppointmentCreatedPayload> {
  constructor(payload: AppointmentCreatedPayload, correlationId?: string) {
    super({
      eventName: "appointment.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type AppointmentRescheduledPayload = {
  appointmentId: string;
  tenantId: string;
  previousStartTime: string;
  previousEndTime: string;
  startTime: string;
  endTime: string;
};

export class AppointmentRescheduled extends DomainEvent<AppointmentRescheduledPayload> {
  constructor(payload: AppointmentRescheduledPayload, correlationId?: string) {
    super({
      eventName: "appointment.rescheduled",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type AppointmentCancelledPayload = {
  appointmentId: string;
  tenantId: string;
  reason?: string;
};

export class AppointmentCancelled extends DomainEvent<AppointmentCancelledPayload> {
  constructor(payload: AppointmentCancelledPayload, correlationId?: string) {
    super({
      eventName: "appointment.cancelled",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
