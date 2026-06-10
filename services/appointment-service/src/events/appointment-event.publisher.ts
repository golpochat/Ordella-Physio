import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { APPOINTMENT_EVENTS } from "@/constants";
import type { AppointmentCreatedEvent } from "@/appointments/events/appointment-created.event";
import type { AppointmentUpdatedEvent } from "@/appointments/events/appointment-updated.event";
import type { AppointmentRescheduledEvent } from "@/appointments/events/appointment-rescheduled.event";
import type { AppointmentCancelledEvent } from "@/appointments/events/appointment-cancelled.event";
import type { AvailabilityUpdatedEvent } from "@/availability/events/availability-updated.event";

@Injectable()
export class AppointmentEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppointmentEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Appointment event publisher connected to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  private async publish<T>(subject: string, tenantId: string, payload: T, correlationId?: string) {
    if (!this.eventBus) {
      this.logger.warn(`Event bus unavailable, skipped publish: ${subject}`);
      return;
    }

    await this.eventBus.publish(toSubject(subject), payload, { tenantId, correlationId });
    this.logger.log(`Published ${subject} for tenant ${tenantId}`);
  }

  async publishAppointmentCreated(event: AppointmentCreatedEvent, correlationId?: string) {
    await this.publish(APPOINTMENT_EVENTS.APPOINTMENT_CREATED, event.tenantId, event, correlationId);
  }

  async publishAppointmentUpdated(event: AppointmentUpdatedEvent, correlationId?: string) {
    await this.publish(APPOINTMENT_EVENTS.APPOINTMENT_UPDATED, event.tenantId, event, correlationId);
  }

  async publishAppointmentRescheduled(event: AppointmentRescheduledEvent, correlationId?: string) {
    await this.publish(APPOINTMENT_EVENTS.APPOINTMENT_RESCHEDULED, event.tenantId, event, correlationId);
  }

  async publishAppointmentCancelled(event: AppointmentCancelledEvent, correlationId?: string) {
    await this.publish(APPOINTMENT_EVENTS.APPOINTMENT_CANCELLED, event.tenantId, event, correlationId);
  }

  async publishAvailabilityUpdated(event: AvailabilityUpdatedEvent, correlationId?: string) {
    await this.publish(APPOINTMENT_EVENTS.AVAILABILITY_UPDATED, event.tenantId, event, correlationId);
  }
}
