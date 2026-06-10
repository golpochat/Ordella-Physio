import { Injectable } from "@nestjs/common";
import type { Note, Prisma } from "@/generated/prisma";
import { TenantRepository, buildSoftDeleteFilter } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class NotesRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Note, Prisma.NoteCreateInput, Prisma.NoteUpdateInput>(
      this.database.note as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.NoteCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.NoteCreateInput);
  }

  findById(tenantId: string, noteId: string) {
    return this.forTenant(tenantId).findById(noteId);
  }

  list(
    tenantId: string,
    where: Prisma.NoteWhereInput,
    options: { skip: number; take: number; orderBy: Prisma.NoteOrderByWithRelationInput },
  ) {
    return this.database.note.findMany({
      where: { ...where, tenantId, ...buildSoftDeleteFilter() },
      skip: options.skip,
      take: options.take,
      orderBy: options.orderBy,
    });
  }

  count(tenantId: string, where: Prisma.NoteWhereInput) {
    return this.database.note.count({
      where: { ...where, tenantId, ...buildSoftDeleteFilter() },
    });
  }

  update(tenantId: string, noteId: string, data: Prisma.NoteUpdateInput) {
    return this.forTenant(tenantId).update(noteId, data);
  }

  softDelete(tenantId: string, noteId: string) {
    return this.forTenant(tenantId).softDelete(noteId);
  }
}
