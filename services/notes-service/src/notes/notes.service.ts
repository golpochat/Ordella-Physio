import { Injectable } from "@nestjs/common";
import { CreateNoteCommand } from "@/notes/commands/create-note.command";
import { UpdateNoteCommand } from "@/notes/commands/update-note.command";
import { DeleteNoteCommand } from "@/notes/commands/delete-note.command";
import { NotesRepository } from "@/notes/notes.repository";
import { SoapNotesService } from "@/soap-notes/soap-notes.service";
import { AttachmentsService } from "@/attachments/attachments.service";
import type { CreateNoteDto } from "@/notes/dto/create-note.dto";
import type { UpdateNoteDto } from "@/notes/dto/update-note.dto";
import type { ListNotesDto } from "@/notes/dto/list-notes.dto";
import type { CreateSoapNoteDto } from "@/soap-notes/dto/create-soap-note.dto";
import type { UpdateSoapNoteDto } from "@/soap-notes/dto/update-soap-note.dto";
import type { UploadAttachmentDto } from "@/attachments/dto/upload-attachment.dto";
import type { DeleteAttachmentDto } from "@/attachments/dto/delete-attachment.dto";
import { buildNotesFilterWhere, resolveNotesOrderBy, resolveNotesPagination } from "@/utils/filter-helpers";
import { toNoteListResponse, toNoteResponse } from "@/notes/notes.mapper";

@Injectable()
export class NotesService {
  constructor(
    private readonly createNoteCommand: CreateNoteCommand,
    private readonly updateNoteCommand: UpdateNoteCommand,
    private readonly deleteNoteCommand: DeleteNoteCommand,
    private readonly notesRepository: NotesRepository,
    private readonly soapNotesService: SoapNotesService,
    private readonly attachmentsService: AttachmentsService,
  ) {}

  create(tenantId: string, dto: CreateNoteDto, correlationId?: string) {
    return this.createNoteCommand.execute({ tenantId, dto, correlationId });
  }

  async list(tenantId: string, query: ListNotesDto) {
    const where = buildNotesFilterWhere(tenantId, query);
    const { page, limit, skip } = resolveNotesPagination(query);
    const orderBy = resolveNotesOrderBy(query);

    const [notes, total] = await Promise.all([
      this.notesRepository.list(tenantId, where, { skip, take: limit, orderBy }),
      this.notesRepository.count(tenantId, where),
    ]);

    return {
      data: toNoteListResponse(notes),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(tenantId: string, noteId: string) {
    const note = await this.notesRepository.findById(tenantId, noteId);
    return note ? toNoteResponse(note) : null;
  }

  update(tenantId: string, noteId: string, dto: UpdateNoteDto, correlationId?: string) {
    return this.updateNoteCommand.execute({ tenantId, noteId, dto, correlationId });
  }

  delete(tenantId: string, noteId: string, correlationId?: string) {
    return this.deleteNoteCommand.execute({ tenantId, noteId, correlationId });
  }

  getSoapNote(tenantId: string, noteId: string) {
    return this.soapNotesService.getByNoteId(tenantId, noteId);
  }

  updateSoapNote(tenantId: string, noteId: string, dto: UpdateSoapNoteDto, correlationId?: string) {
    return this.soapNotesService.update(tenantId, noteId, dto, correlationId);
  }

  createSoapNote(tenantId: string, noteId: string, dto: CreateSoapNoteDto, correlationId?: string) {
    return this.soapNotesService.create(tenantId, noteId, dto, correlationId);
  }

  uploadAttachment(tenantId: string, noteId: string, dto: UploadAttachmentDto) {
    return this.attachmentsService.upload(tenantId, noteId, dto);
  }

  deleteAttachment(tenantId: string, noteId: string, dto: DeleteAttachmentDto) {
    return this.attachmentsService.delete(tenantId, noteId, dto);
  }

  listAttachments(tenantId: string, noteId: string) {
    return this.attachmentsService.listByNote(tenantId, noteId);
  }
}
