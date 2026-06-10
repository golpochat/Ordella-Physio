import { Injectable } from "@nestjs/common";
import { randomString } from "@ordella/utils";
import { AttachmentsRepository } from "@/attachments/attachments.repository";
import type { UploadAttachmentDto } from "@/attachments/dto/upload-attachment.dto";
import type { DeleteAttachmentDto } from "@/attachments/dto/delete-attachment.dto";
import { ALLOWED_ATTACHMENT_MIME_TYPES, MAX_ATTACHMENT_SIZE_BYTES } from "@/constants";

@Injectable()
export class AttachmentsService {
  constructor(private readonly attachmentsRepository: AttachmentsRepository) {}

  validateAttachmentPlaceholder(dto: UploadAttachmentDto): void {
    if (dto.mimeType && !ALLOWED_ATTACHMENT_MIME_TYPES.includes(dto.mimeType as never)) {
      throw new Error("Unsupported attachment mime type");
    }

    if (dto.sizeBytes && dto.sizeBytes > MAX_ATTACHMENT_SIZE_BYTES) {
      throw new Error("Attachment exceeds maximum allowed size");
    }
  }

  async upload(tenantId: string, noteId: string, dto: UploadAttachmentDto) {
    this.validateAttachmentPlaceholder(dto);

    const attachment = await this.attachmentsRepository.create(tenantId, {
      id: randomString(24),
      note: { connect: { id: noteId } },
      url: dto.url,
      fileName: dto.fileName,
      mimeType: dto.mimeType,
      sizeBytes: dto.sizeBytes,
    });

    return {
      id: attachment.id,
      noteId: attachment.noteId,
      tenantId: attachment.tenantId,
      url: attachment.url,
      fileName: attachment.fileName,
      mimeType: attachment.mimeType,
      sizeBytes: attachment.sizeBytes,
      createdAt: attachment.createdAt.toISOString(),
    };
  }

  async listByNote(tenantId: string, noteId: string) {
    const attachments = await this.attachmentsRepository.listByNote(tenantId, noteId);
    return attachments.map((attachment) => ({
      id: attachment.id,
      noteId: attachment.noteId,
      url: attachment.url,
      fileName: attachment.fileName,
      mimeType: attachment.mimeType,
      sizeBytes: attachment.sizeBytes,
      createdAt: attachment.createdAt.toISOString(),
    }));
  }

  async delete(tenantId: string, noteId: string, dto: DeleteAttachmentDto) {
    const attachment = await this.attachmentsRepository.findById(tenantId, dto.attachmentId);

    if (!attachment || attachment.noteId !== noteId) {
      throw new Error("Attachment not found");
    }

    await this.attachmentsRepository.softDelete(tenantId, dto.attachmentId);
    return { message: "Attachment deleted", attachmentId: dto.attachmentId };
  }
}
