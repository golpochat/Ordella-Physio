import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { NoteCreated, NoteDeleted, NoteUpdated } from "../events/note.events";
import { EntityId } from "../value-objects/id.vo";

export type NoteType = "GENERAL" | "SOAP" | "EXERCISE_PLAN" | "PROGRESS";

export type NoteAggregateProps = {
  id: string;
  tenantId: string;
  patientId: EntityId;
  therapistId: EntityId;
  appointmentId: EntityId | null;
  type: NoteType;
  content: string;
};

export type CreateNoteAggregateInput = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  appointmentId?: string;
  type: NoteType;
  content: string;
  correlationId?: string;
};

export class NoteAggregate extends AggregateRoot<NoteAggregateProps> {
  private constructor(props: NoteAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get type(): NoteType {
    return this.props.type;
  }

  static create(input: CreateNoteAggregateInput): Result<NoteAggregate> {
    const patientId = EntityId.create(input.patientId);
    const therapistId = EntityId.create(input.therapistId);
    const appointmentId = input.appointmentId ? EntityId.create(input.appointmentId) : ok(null);

    if (patientId.isFailure || therapistId.isFailure) {
      return fail("Invalid note reference id");
    }

    if (input.appointmentId && appointmentId.isFailure) {
      return fail("Invalid appointment id");
    }

    const aggregate = new NoteAggregate({
      id: input.id,
      tenantId: input.tenantId,
      patientId: patientId.value,
      therapistId: therapistId.value,
      appointmentId: appointmentId.isSuccess ? appointmentId.value : null,
      type: input.type,
      content: input.content.trim(),
    });

    aggregate.addDomainEvent(
      new NoteCreated(
        {
          noteId: aggregate.id,
          tenantId: aggregate.tenantId,
          patientId: aggregate.props.patientId.value,
          therapistId: aggregate.props.therapistId.value,
          type: aggregate.type,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  update(changes: Partial<{ content: string; type: NoteType }>, correlationId?: string): Result<void> {
    if (changes.content) {
      (this.props as NoteAggregateProps).content = changes.content.trim();
    }
    if (changes.type) {
      (this.props as NoteAggregateProps).type = changes.type;
    }

    this.addDomainEvent(
      new NoteUpdated(
        {
          noteId: this.id,
          tenantId: this.tenantId,
          changes: changes as Record<string, unknown>,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  markDeleted(correlationId?: string): Result<void> {
    this.addDomainEvent(
      new NoteDeleted({ noteId: this.id, tenantId: this.tenantId }, correlationId),
    );
    return ok(undefined);
  }
}
