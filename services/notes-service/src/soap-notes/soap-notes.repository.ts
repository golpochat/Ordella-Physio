import { Injectable } from "@nestjs/common";
import type { Prisma, SoapNote } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class SoapNotesRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<SoapNote, Prisma.SoapNoteCreateInput, Prisma.SoapNoteUpdateInput>(
      this.database.soapNote as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.SoapNoteCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.SoapNoteCreateInput);
  }

  findByNoteId(tenantId: string, noteId: string) {
    return this.database.soapNote.findFirst({ where: { tenantId, noteId } });
  }

  updateByNoteId(tenantId: string, noteId: string, data: Prisma.SoapNoteUpdateInput) {
    return this.database.soapNote.update({ where: { noteId }, data });
  }
}
