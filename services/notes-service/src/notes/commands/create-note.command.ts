import { Injectable } from "@nestjs/common";
import { NoteAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateNoteDto } from "@/notes/dto/create-note.dto";
import { NotesRepository } from "@/notes/notes.repository";
import { SoapNotesService } from "@/soap-notes/soap-notes.service";
import { NotesEventPublisher } from "@/events/notes-event.publisher";
import { isSoapNoteType, validateAppointmentReferencePlaceholder, validatePatientReferencePlaceholder } from "@/utils/notes-helpers";
import { toNoteResponse } from "@/notes/notes.mapper";

export type CreateNoteCommandInput = {
  tenantId: string;
  dto: CreateNoteDto;
  correlationId?: string;
};

@Injectable()
export class CreateNoteCommand {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly soapNotesService: SoapNotesService,
    private readonly eventPublisher: NotesEventPublisher,
  ) {}

  async execute(input: CreateNoteCommandInput) {
    const noteId = randomString(24);
    await validatePatientReferencePlaceholder(input.dto.patientId);

    if (input.dto.appointmentId) {
      await validateAppointmentReferencePlaceholder(input.dto.appointmentId);
    }

    const aggregateResult = NoteAggregate.create({
      id: noteId,
      tenantId: input.tenantId,
      patientId: input.dto.patientId,
      therapistId: input.dto.therapistId,
      appointmentId: input.dto.appointmentId,
      type: input.dto.type,
      content: input.dto.content,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const note = await this.notesRepository.create(input.tenantId, {
      id: noteId,
      patientId: input.dto.patientId,
      therapistId: input.dto.therapistId,
      appointmentId: input.dto.appointmentId,
      type: input.dto.type,
      content: input.dto.content,
      attachments: input.dto.attachments ?? [],
    });

    if (isSoapNoteType(input.dto.type)) {
      await this.soapNotesService.createEmptyForNote(input.tenantId, note.id, input.correlationId);
    }

    await this.eventPublisher.publishNoteCreated(
      {
        tenantId: input.tenantId,
        noteId: note.id,
        patientId: note.patientId,
        therapistId: note.therapistId,
        type: note.type,
        createdAt: note.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toNoteResponse(note);
  }
}
