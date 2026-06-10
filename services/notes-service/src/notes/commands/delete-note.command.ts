import { Injectable } from "@nestjs/common";
import { NotesRepository } from "@/notes/notes.repository";
import { NotesEventPublisher } from "@/events/notes-event.publisher";

export type DeleteNoteCommandInput = {
  tenantId: string;
  noteId: string;
  correlationId?: string;
};

@Injectable()
export class DeleteNoteCommand {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly eventPublisher: NotesEventPublisher,
  ) {}

  async execute(input: DeleteNoteCommandInput) {
    const note = await this.notesRepository.softDelete(input.tenantId, input.noteId);
    const deletedAt = new Date().toISOString();

    await this.eventPublisher.publishNoteDeleted(
      {
        tenantId: input.tenantId,
        noteId: note.id,
        deletedAt,
      },
      input.correlationId,
    );

    return { message: "Note deleted", noteId: note.id, deletedAt };
  }
}
