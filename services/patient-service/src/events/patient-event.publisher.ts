import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { PATIENT_EVENTS } from "@/constants";
import type { PatientCreatedEvent } from "@/patients/events/patient-created.event";
import type { PatientUpdatedEvent } from "@/patients/events/patient-updated.event";
import type { PatientDeletedEvent } from "@/patients/events/patient-deleted.event";
import type { MedicalRecordUpdatedEvent } from "@/medical-records/events/medical-record-updated.event";

@Injectable()
export class PatientEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PatientEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Patient event publisher connected to NATS");
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

  async publishPatientCreated(event: PatientCreatedEvent, correlationId?: string) {
    await this.publish(PATIENT_EVENTS.PATIENT_CREATED, event.tenantId, event, correlationId);
  }

  async publishPatientUpdated(event: PatientUpdatedEvent, correlationId?: string) {
    await this.publish(PATIENT_EVENTS.PATIENT_UPDATED, event.tenantId, event, correlationId);
  }

  async publishPatientDeleted(event: PatientDeletedEvent, correlationId?: string) {
    await this.publish(PATIENT_EVENTS.PATIENT_DELETED, event.tenantId, event, correlationId);
  }

  async publishMedicalRecordUpdated(event: MedicalRecordUpdatedEvent, correlationId?: string) {
    await this.publish(PATIENT_EVENTS.MEDICAL_RECORD_UPDATED, event.tenantId, event, correlationId);
  }
}
