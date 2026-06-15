import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/api-error";
import { buildPaginatedResponse, getPagination, type PaginationInput } from "../../utils/pagination";

export async function listNotes(tenantId: string, patientId: string, pagination: PaginationInput) {
  const where = { tenantId, patientId };
  const [items, total] = await Promise.all([
    prisma.note.findMany({
      where,
      ...getPagination(pagination),
      include: { author: { select: { id: true, email: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.note.count({ where }),
  ]);
  return buildPaginatedResponse(items, total, pagination);
}

export async function listAllNotes(tenantId: string, pagination: PaginationInput) {
  const where = { tenantId };
  const [items, total] = await Promise.all([
    prisma.note.findMany({
      where,
      ...getPagination(pagination),
      include: {
        author: { select: { id: true, email: true, firstName: true, lastName: true } },
        patient: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.note.count({ where }),
  ]);
  return buildPaginatedResponse(items, total, pagination);
}

export async function getNoteById(tenantId: string, noteId: string) {
  const note = await prisma.note.findFirst({
    where: { id: noteId, tenantId },
    include: {
      author: { select: { id: true, email: true, firstName: true, lastName: true } },
      patient: { select: { id: true, firstName: true, lastName: true } },
    },
  });

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  return note;
}

export async function createNote(
  tenantId: string,
  authorId: string,
  data: {
    patientId: string;
    type?: "GENERAL" | "CLINICAL" | "SOAP" | "ADMIN";
    title?: string;
    content: string;
  },
) {
  const patient = await prisma.patient.findFirst({ where: { id: data.patientId, tenantId } });
  if (!patient) throw new NotFoundError("Patient not found");

  const note = await prisma.note.create({
    data: {
      tenantId,
      authorId,
      patientId: data.patientId,
      type: data.type ?? "GENERAL",
      title: data.title,
      content: data.content,
    },
  });

  return note;
}
