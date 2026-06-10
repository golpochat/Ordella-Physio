import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { SoapNoteCreated, SoapNoteUpdated } from "../events/note.events";
import { EntityId } from "../value-objects/id.vo";

export type SoapNoteAggregateProps = {
  id: string;
  noteId: EntityId;
  tenantId: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

export type CreateSoapNoteAggregateInput = {
  id: string;
  noteId: string;
  tenantId: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  correlationId?: string;
};

export class SoapNoteAggregate extends AggregateRoot<SoapNoteAggregateProps> {
  private constructor(props: SoapNoteAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreateSoapNoteAggregateInput): Result<SoapNoteAggregate> {
    const noteId = EntityId.create(input.noteId);
    if (noteId.isFailure) {
      return fail("Invalid note id");
    }

    const aggregate = new SoapNoteAggregate({
      id: input.id,
      noteId: noteId.value,
      tenantId: input.tenantId,
      subjective: input.subjective.trim(),
      objective: input.objective.trim(),
      assessment: input.assessment.trim(),
      plan: input.plan.trim(),
    });

    aggregate.addDomainEvent(
      new SoapNoteCreated(
        {
          soapNoteId: aggregate.id,
          noteId: aggregate.props.noteId.value,
          tenantId: aggregate.tenantId,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  update(
    changes: Partial<{
      subjective: string;
      objective: string;
      assessment: string;
      plan: string;
    }>,
    correlationId?: string,
  ): Result<void> {
    if (changes.subjective) {
      (this.props as SoapNoteAggregateProps).subjective = changes.subjective.trim();
    }
    if (changes.objective) {
      (this.props as SoapNoteAggregateProps).objective = changes.objective.trim();
    }
    if (changes.assessment) {
      (this.props as SoapNoteAggregateProps).assessment = changes.assessment.trim();
    }
    if (changes.plan) {
      (this.props as SoapNoteAggregateProps).plan = changes.plan.trim();
    }

    this.addDomainEvent(
      new SoapNoteUpdated(
        {
          soapNoteId: this.id,
          noteId: this.props.noteId.value,
          tenantId: this.tenantId,
          changes: changes as Record<string, unknown>,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
