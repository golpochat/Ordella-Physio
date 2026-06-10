import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createNoteSchema,
  createSoapNoteSchema,
  listNotesSchema,
  updateNoteSchema,
  updateSoapNoteSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { NotesService } from "@/notes/notes.service";
import { JwtGuard } from "@/notes/guards/jwt.guard";
import { TenantId } from "@/notes/guards/tenant-id.decorator";
import type { CreateNoteDto } from "@/notes/dto/create-note.dto";
import type { UpdateNoteDto } from "@/notes/dto/update-note.dto";
import type { ListNotesDto } from "@/notes/dto/list-notes.dto";
import type { CreateSoapNoteDto } from "@/soap-notes/dto/create-soap-note.dto";
import type { UpdateSoapNoteDto } from "@/soap-notes/dto/update-soap-note.dto";
import type { UploadAttachmentDto } from "@/attachments/dto/upload-attachment.dto";
import type { DeleteAttachmentDto } from "@/attachments/dto/delete-attachment.dto";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "notes-service" };
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  @UseZodValidation(createNoteSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateNoteDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notesService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.read")
  @UseZodValidation(listNotesSchema, "query")
  list(@TenantId() tenantId: string, @Query() query: ListNotesDto) {
    return this.notesService.list(tenantId, query);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.notesService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  @UseZodValidation(updateNoteSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateNoteDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notesService.update(tenantId, id, dto, request.correlationId);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  remove(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
  ) {
    return this.notesService.delete(tenantId, id, request.correlationId);
  }

  @Get(":noteId/soap")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.read")
  getSoapNote(@TenantId() tenantId: string, @Param("noteId") noteId: string) {
    return this.notesService.getSoapNote(tenantId, noteId);
  }

  @Post(":noteId/soap")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  @UseZodValidation(createSoapNoteSchema)
  createSoapNote(
    @TenantId() tenantId: string,
    @Param("noteId") noteId: string,
    @Body() dto: CreateSoapNoteDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notesService.createSoapNote(tenantId, noteId, dto, request.correlationId);
  }

  @Patch(":noteId/soap")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  @UseZodValidation(updateSoapNoteSchema)
  updateSoapNote(
    @TenantId() tenantId: string,
    @Param("noteId") noteId: string,
    @Body() dto: UpdateSoapNoteDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notesService.updateSoapNote(tenantId, noteId, dto, request.correlationId);
  }

  @Get(":noteId/attachments")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.read")
  listAttachments(@TenantId() tenantId: string, @Param("noteId") noteId: string) {
    return this.notesService.listAttachments(tenantId, noteId);
  }

  @Post(":noteId/attachments")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  uploadAttachment(
    @TenantId() tenantId: string,
    @Param("noteId") noteId: string,
    @Body() dto: UploadAttachmentDto,
  ) {
    return this.notesService.uploadAttachment(tenantId, noteId, dto);
  }

  @Delete(":noteId/attachments/:attachmentId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("notes.write")
  deleteAttachment(
    @TenantId() tenantId: string,
    @Param("noteId") noteId: string,
    @Param("attachmentId") attachmentId: string,
  ) {
    return this.notesService.deleteAttachment(tenantId, noteId, { attachmentId });
  }
}
