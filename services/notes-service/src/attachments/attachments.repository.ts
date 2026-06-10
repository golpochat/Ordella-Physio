import { Injectable } from "@nestjs/common";
import type { Attachment, Prisma } from "@/generated/prisma";
import { TenantRepository, buildSoftDeleteFilter } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AttachmentsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      Attachment,
      Prisma.AttachmentCreateInput,
      Prisma.AttachmentUpdateInput
    >(this.database.attachment as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.AttachmentCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.AttachmentCreateInput);
  }

  listByNote(tenantId: string, noteId: string) {
    return this.database.attachment.findMany({
      where: { tenantId, noteId, ...buildSoftDeleteFilter() },
      orderBy: { createdAt: "desc" },
    });
  }

  findById(tenantId: string, attachmentId: string) {
    return this.forTenant(tenantId).findById(attachmentId);
  }

  softDelete(tenantId: string, attachmentId: string) {
    return this.forTenant(tenantId).softDelete(attachmentId);
  }
}
