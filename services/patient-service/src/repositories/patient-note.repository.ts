import { Injectable } from "@nestjs/common";
import type { PatientNote, Prisma } from "@/generated/prisma";
import { buildSoftDeleteFilter } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";
import type { PatientNoteType } from "@/models/PatientNote";

export type PatientNoteListFilter = {
  tenantId: string;
  patientId: string;
  noteType?: PatientNoteType;
  staffId?: string;
  createdFrom?: string;
  createdTo?: string;
  skip: number;
  take: number;
};

@Injectable()
export class PatientNoteRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.PatientNoteCreateInput): Promise<PatientNote> {
    return this.database.patientNote.create({ data });
  }

  findById(noteId: string): Promise<PatientNote | null> {
    return this.database.patientNote.findFirst({
      where: { id: noteId },
    });
  }

  findByIdForPatient(noteId: string, patientId: string, tenantId: string): Promise<PatientNote | null> {
    return this.database.patientNote.findFirst({
      where: { id: noteId, patientId, tenantId },
    });
  }

  update(noteId: string, data: Prisma.PatientNoteUpdateInput): Promise<PatientNote> {
    return this.database.patientNote.update({
      where: { id: noteId },
      data,
    });
  }

  findManyFiltered(filter: PatientNoteListFilter): Promise<PatientNote[]> {
    return this.database.patientNote.findMany({
      where: this.buildWhere(filter),
      skip: filter.skip,
      take: filter.take,
      orderBy: [{ createdAt: "desc" }],
    });
  }

  countFiltered(
    filter: Omit<PatientNoteListFilter, "skip" | "take">,
  ): Promise<number> {
    return this.database.patientNote.count({
      where: this.buildWhere(filter),
    });
  }

  private buildWhere(
    filter: Omit<PatientNoteListFilter, "skip" | "take">,
  ): Prisma.PatientNoteWhereInput {
    const where: Prisma.PatientNoteWhereInput = {
      tenantId: filter.tenantId,
      patientId: filter.patientId,
      patient: buildSoftDeleteFilter(),
    };

    if (filter.noteType) {
      where.noteType = filter.noteType;
    }

    if (filter.staffId) {
      where.staffId = filter.staffId;
    }

    if (filter.createdFrom || filter.createdTo) {
      const range: Prisma.DateTimeFilter = {};
      if (filter.createdFrom) {
        range.gte = new Date(`${filter.createdFrom}T00:00:00.000Z`);
      }
      if (filter.createdTo) {
        range.lte = new Date(`${filter.createdTo}T23:59:59.999Z`);
      }
      where.createdAt = range;
    }

    return where;
  }
}
