import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getPagination } from "../../utils/pagination";
import type { CreatePatientInput, ListPatientsFilters, UpdatePatientInput } from "./patients.types";
import { PatientNotFoundError } from "./patients.errors";

const listSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  dateOfBirth: true,
  gender: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PatientSelect;

function buildWhereClause(tenantId: string, filters: ListPatientsFilters): Prisma.PatientWhereInput {
  const where: Prisma.PatientWhereInput = { tenantId };

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  }

  if (filters.gender) {
    where.gender = filters.gender;
  }

  if (filters.email) {
    where.email = { equals: filters.email, mode: "insensitive" };
  }

  if (filters.phone) {
    where.phone = { contains: filters.phone, mode: "insensitive" };
  }

  if (filters.createdFrom || filters.createdTo) {
    where.createdAt = {
      ...(filters.createdFrom ? { gte: filters.createdFrom } : {}),
      ...(filters.createdTo ? { lte: filters.createdTo } : {}),
    };
  }

  if (filters.search) {
    const term = filters.search.trim();
    where.OR = [
      { firstName: { contains: term, mode: "insensitive" } },
      { lastName: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
      { phone: { contains: term, mode: "insensitive" } },
    ];
  }

  return where;
}

function buildOrderBy(filters: ListPatientsFilters): Prisma.PatientOrderByWithRelationInput {
  const sortBy = filters.sortBy ?? "createdAt";
  const sortOrder = filters.sortOrder ?? "desc";
  return { [sortBy]: sortOrder };
}

export async function findPatients(tenantId: string, filters: ListPatientsFilters) {
  const where = buildWhereClause(tenantId, filters);
  const pagination = getPagination(filters);

  const [items, total] = await Promise.all([
    prisma.patient.findMany({
      where,
      select: listSelect,
      ...pagination,
      orderBy: buildOrderBy(filters),
    }),
    prisma.patient.count({ where }),
  ]);

  return { items, total };
}

export async function findPatientById(tenantId: string, id: string) {
  return prisma.patient.findFirst({
    where: { id, tenantId },
  });
}

export async function findPatientByIdOrThrow(tenantId: string, id: string) {
  const patient = await findPatientById(tenantId, id);
  if (!patient) {
    throw new PatientNotFoundError(id);
  }
  return patient;
}

export async function findPatientByEmail(tenantId: string, email: string, excludeId?: string) {
  return prisma.patient.findFirst({
    where: {
      tenantId,
      email: { equals: email, mode: "insensitive" },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });
}

export async function createPatientRecord(tenantId: string, data: CreatePatientInput) {
  return prisma.patient.create({
    data: {
      tenantId,
      ...data,
      email: data.email?.toLowerCase(),
    },
  });
}

export async function updatePatientRecord(tenantId: string, id: string, data: UpdatePatientInput) {
  await findPatientByIdOrThrow(tenantId, id);

  return prisma.patient.update({
    where: { id },
    data: {
      ...data,
      ...(data.email !== undefined ? { email: data.email?.toLowerCase() ?? null } : {}),
    },
  });
}

export async function deactivatePatientRecord(tenantId: string, id: string) {
  await findPatientByIdOrThrow(tenantId, id);

  return prisma.patient.update({
    where: { id },
    data: { isActive: false },
  });
}

export async function findPatientProfile(
  tenantId: string,
  id: string,
  limits: {
    appointmentLimit: number;
    invoiceLimit: number;
    noteLimit: number;
    paymentLimit: number;
  },
) {
  const patient = await prisma.patient.findFirst({
    where: { id, tenantId },
    include: {
      appointments: {
        take: limits.appointmentLimit,
        orderBy: { startTime: "desc" },
        include: {
          therapist: {
            include: {
              user: {
                select: { id: true, firstName: true, lastName: true, email: true },
              },
            },
          },
        },
      },
      invoices: {
        take: limits.invoiceLimit,
        orderBy: { createdAt: "desc" },
        include: {
          payments: {
            orderBy: { paidAt: "desc" },
          },
        },
      },
      notes: {
        take: limits.noteLimit,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
        },
      },
    },
  });

  if (!patient) {
    throw new PatientNotFoundError(id);
  }

  const payments = await prisma.payment.findMany({
    where: {
      tenantId,
      invoice: { patientId: id },
    },
    take: limits.paymentLimit,
    orderBy: { paidAt: "desc" },
    include: {
      invoice: {
        select: { id: true, invoiceNumber: true, status: true, total: true },
      },
    },
  });

  const [appointmentCount, invoiceCount, noteCount, paymentAggregate] = await Promise.all([
    prisma.appointment.count({ where: { tenantId, patientId: id } }),
    prisma.invoice.count({ where: { tenantId, patientId: id } }),
    prisma.note.count({ where: { tenantId, patientId: id } }),
    prisma.payment.aggregate({
      where: { tenantId, invoice: { patientId: id }, status: "COMPLETED" },
      _sum: { amount: true },
      _count: { _all: true },
    }),
  ]);

  return {
    patient,
    payments,
    counts: {
      appointments: appointmentCount,
      invoices: invoiceCount,
      notes: noteCount,
      payments: paymentAggregate._count._all,
    },
    billingSummary: {
      totalPaid: Number(paymentAggregate._sum.amount ?? 0),
      currency: patient.invoices[0]?.currency ?? "GBP",
    },
  };
}
