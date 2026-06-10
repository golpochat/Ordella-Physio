import { Injectable } from "@nestjs/common";
import { SoapNoteAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import { SoapNotesRepository } from "@/soap-notes/soap-notes.repository";
import { NotesEventPublisher } from "@/events/notes-event.publisher";
import type { CreateSoapNoteDto } from "@/soap-notes/dto/create-soap-note.dto";
import type { UpdateSoapNoteDto } from "@/soap-notes/dto/update-soap-note.dto";
import { toSoapNoteResponse } from "@/soap-notes/soap-notes.mapper";

@Injectable()
export class SoapNotesService {
  constructor(
    private readonly soapNotesRepository: SoapNotesRepository,
    private readonly eventPublisher: NotesEventPublisher,
  ) {}

  async createEmptyForNote(tenantId: string, noteId: string, correlationId?: string) {
    const soapNoteId = randomString(24);
    const aggregateResult = SoapNoteAggregate.create({
      id: soapNoteId,
      noteId,
      tenantId,
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
      correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const soapNote = await this.soapNotesRepository.create(tenantId, {
      id: soapNoteId,
      note: { connect: { id: noteId } },
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
    });

    await this.eventPublisher.publishSoapNoteCreated(
      {
        tenantId,
        soapNoteId: soapNote.id,
        noteId: soapNote.noteId,
        createdAt: soapNote.createdAt.toISOString(),
      },
      correlationId,
    );

    return toSoapNoteResponse(soapNote);
  }

  async create(tenantId: string, noteId: string, dto: CreateSoapNoteDto, correlationId?: string) {
    const soapNoteId = randomString(24);
    const aggregateResult = SoapNoteAggregate.create({
      id: soapNoteId,
      noteId,
      tenantId,
      ...dto,
      correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const soapNote = await this.soapNotesRepository.create(tenantId, {
      id: soapNoteId,
      note: { connect: { id: noteId } },
      subjective: dto.subjective,
      objective: dto.objective,
      assessment: dto.assessment,
      plan: dto.plan,
    });

    await this.eventPublisher.publishSoapNoteCreated(
      {
        tenantId,
        soapNoteId: soapNote.id,
        noteId: soapNote.noteId,
        createdAt: soapNote.createdAt.toISOString(),
      },
      correlationId,
    );

    return toSoapNoteResponse(soapNote);
  }

  async getByNoteId(tenantId: string, noteId: string) {
    const soapNote = await this.soapNotesRepository.findByNoteId(tenantId, noteId);
    return soapNote ? toSoapNoteResponse(soapNote) : null;
  }

  async update(tenantId: string, noteId: string, dto: UpdateSoapNoteDto, correlationId?: string) {
    const soapNote = await this.soapNotesRepository.updateByNoteId(tenantId, noteId, dto);

    await this.eventPublisher.publishSoapNoteUpdated(
      {
        tenantId,
        soapNoteId: soapNote.id,
        noteId: soapNote.noteId,
        changes: dto as Record<string, unknown>,
        updatedAt: soapNote.updatedAt.toISOString(),
      },
      correlationId,
    );

    return toSoapNoteResponse(soapNote);
  }
}
