import type { Prisma } from "@/generated/prisma";
import type { ListNotesDto } from "@/notes/dto/list-notes.dto";
import { buildSoftDeleteFilter } from "@ordella/database";

export function buildNotesFilterWhere(tenantId: string, query: ListNotesDto): Prisma.NoteWhereInput {
  return {
    tenantId,
    ...buildSoftDeleteFilter(),
    ...(query.patientId ? { patientId: query.patientId } : {}),
    ...(query.therapistId ? { therapistId: query.therapistId } : {}),
    ...(query.appointmentId ? { appointmentId: query.appointmentId } : {}),
    ...(query.type ? { type: query.type } : {}),
    ...(query.from || query.to
      ? {
          createdAt: {
            ...(query.from ? { gte: new Date(query.from) } : {}),
            ...(query.to ? { lte: new Date(query.to) } : {}),
          },
        }
      : {}),
  };
}

export function resolveNotesPagination(query: ListNotesDto) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 20;
  return { page, limit, skip: (page - 1) * limit };
}

export function resolveNotesOrderBy(query: ListNotesDto): Prisma.NoteOrderByWithRelationInput {
  const sortField = query.sort ?? "createdAt";
  const direction = query.order ?? "desc";

  if (sortField === "updatedAt") {
    return { updatedAt: direction };
  }

  return { createdAt: direction };
}
