import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { NOTES_EVENTS } from "@/constants";
import type { NoteCreatedEvent } from "@/notes/events/note-created.event";
import type { NoteUpdatedEvent } from "@/notes/events/note-updated.event";
import type { NoteDeletedEvent } from "@/notes/events/note-deleted.event";
import type { SoapNoteCreatedEvent } from "@/soap-notes/events/soap-note-created.event";
import type { SoapNoteUpdatedEvent } from "@/soap-notes/events/soap-note-updated.event";

@Injectable()
export class NotesEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotesEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Notes event publisher connected to NATS");
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

  async publishNoteCreated(event: NoteCreatedEvent, correlationId?: string) {
    await this.publish(NOTES_EVENTS.NOTE_CREATED, event.tenantId, event, correlationId);
  }

  async publishNoteUpdated(event: NoteUpdatedEvent, correlationId?: string) {
    await this.publish(NOTES_EVENTS.NOTE_UPDATED, event.tenantId, event, correlationId);
  }

  async publishNoteDeleted(event: NoteDeletedEvent, correlationId?: string) {
    await this.publish(NOTES_EVENTS.NOTE_DELETED, event.tenantId, event, correlationId);
  }

  async publishSoapNoteCreated(event: SoapNoteCreatedEvent, correlationId?: string) {
    await this.publish(NOTES_EVENTS.SOAP_NOTE_CREATED, event.tenantId, event, correlationId);
  }

  async publishSoapNoteUpdated(event: SoapNoteUpdatedEvent, correlationId?: string) {
    await this.publish(NOTES_EVENTS.SOAP_NOTE_UPDATED, event.tenantId, event, correlationId);
  }
}
