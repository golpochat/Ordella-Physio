import { Injectable } from "@nestjs/common";
import type { UpdateNoteDto } from "@/notes/dto/update-note.dto";
import { NotesRepository } from "@/notes/notes.repository";
import { NotesEventPublisher } from "@/events/notes-event.publisher";
import { toNoteResponse } from "@/notes/notes.mapper";

export type UpdateNoteCommandInput = {
  tenantId: string;
  noteId: string;
  dto: UpdateNoteDto;
  correlationId?: string;
};

@Injectable()
export class UpdateNoteCommand {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly eventPublisher: NotesEventPublisher,
  ) {}

  async execute(input: UpdateNoteCommandInput) {
    const note = await this.notesRepository.update(input.tenantId, input.noteId, {
      patientId: input.dto.patientId,
      therapistId: input.dto.therapistId,
      appointmentId: input.dto.appointmentId,
      type: input.dto.type,
      content: input.dto.content,
      attachments: input.dto.attachments,
    });

    await this.eventPublisher.publishNoteUpdated(
      {
        tenantId: input.tenantId,
        noteId: note.id,
        patientId: note.patientId,
        therapistId: note.therapistId,
        changes: input.dto as Record<string, unknown>,
        updatedAt: note.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toNoteResponse(note);
  }
}
