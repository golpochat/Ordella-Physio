import type { AppointmentStatus, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getPagination } from "../../utils/pagination";
import type {
  CreateAppointmentInput,
  ListAppointmentsFilters,
  UpdateAppointmentInput,
} from "./appointments.types";
import { AppointmentNotFoundError } from "./appointments.errors";

const appointmentInclude = {
  patient: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
  therapist: {
    include: {
      user: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  },
} satisfies Prisma.AppointmentInclude;

function buildWhereClause(tenantId: string, filters: ListAppointmentsFilters): Prisma.AppointmentWhereInput {
  const where: Prisma.AppointmentWhereInput = { tenantId };

  if (filters.patientId) where.patientId = filters.patientId;
  if (filters.therapistId) where.therapistId = filters.therapistId;
  if (filters.status) where.status = filters.status;

  if (filters.startFrom || filters.startTo) {
    where.startTime = {
      ...(filters.startFrom ? { gte: filters.startFrom } : {}),
      ...(filters.startTo ? { lte: filters.startTo } : {}),
    };
  }

  if (filters.search) {
    const term = filters.search.trim();
    where.OR = [
      { type: { contains: term, mode: "insensitive" } },
      { notes: { contains: term, mode: "insensitive" } },
      { patient: { firstName: { contains: term, mode: "insensitive" } } },
      { patient: { lastName: { contains: term, mode: "insensitive" } } },
    ];
  }

  return where;
}

export async function findAppointments(tenantId: string, filters: ListAppointmentsFilters) {
  const where = buildWhereClause(tenantId, filters);
  const sortBy = filters.sortBy ?? "startTime";
  const sortOrder = filters.sortOrder ?? "desc";

  const [items, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: appointmentInclude,
      ...getPagination(filters),
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.appointment.count({ where }),
  ]);

  return { items, total };
}

export async function findAppointmentById(tenantId: string, id: string) {
  return prisma.appointment.findFirst({
    where: { id, tenantId },
    include: appointmentInclude,
  });
}

export async function findAppointmentByIdOrThrow(tenantId: string, id: string) {
  const appointment = await findAppointmentById(tenantId, id);
  if (!appointment) {
    throw new AppointmentNotFoundError(id);
  }
  return appointment;
}

export async function findTherapistByUserId(tenantId: string, userId: string) {
  return prisma.therapist.findFirst({
    where: { tenantId, userId, isActive: true },
  });
}

export async function findTherapistById(tenantId: string, therapistId: string) {
  return prisma.therapist.findFirst({
    where: { id: therapistId, tenantId, isActive: true },
    include: { user: { select: { id: true } } },
  });
}

export async function findPatientById(tenantId: string, patientId: string) {
  return prisma.patient.findFirst({
    where: { id: patientId, tenantId, isActive: true },
  });
}

export async function findOverlappingAppointments(
  tenantId: string,
  input: {
    therapistId?: string;
    patientId?: string;
    startTime: Date;
    endTime: Date;
    excludeAppointmentId?: string;
  },
) {
  return prisma.appointment.findMany({
    where: {
      tenantId,
      ...(input.therapistId ? { therapistId: input.therapistId } : {}),
      ...(input.patientId ? { patientId: input.patientId } : {}),
      ...(input.excludeAppointmentId ? { id: { not: input.excludeAppointmentId } } : {}),
      status: { not: "CANCELLED" },
      startTime: { lt: input.endTime },
      endTime: { gt: input.startTime },
    },
    select: { id: true, startTime: true, endTime: true, status: true, therapistId: true, patientId: true },
  });
}

export async function findTherapistAvailability(tenantId: string, therapistId: string) {
  return prisma.therapistAvailability.findMany({
    where: { tenantId, therapistId },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
}

export async function findBlockedSlotsOverlapping(
  tenantId: string,
  therapistId: string,
  startTime: Date,
  endTime: Date,
) {
  return prisma.therapistBlockedSlot.findMany({
    where: {
      tenantId,
      therapistId,
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    },
  });
}

export async function createAppointmentRecord(tenantId: string, data: CreateAppointmentInput) {
  return prisma.appointment.create({
    data: { tenantId, ...data },
    include: appointmentInclude,
  });
}

export async function updateAppointmentRecord(
  tenantId: string,
  id: string,
  data: UpdateAppointmentInput & { status?: AppointmentStatus; cancellationReason?: string | null },
) {
  await findAppointmentByIdOrThrow(tenantId, id);

  return prisma.appointment.update({
    where: { id },
    data,
    include: appointmentInclude,
  });
}

export async function deleteAppointmentRecord(tenantId: string, id: string) {
  await findAppointmentByIdOrThrow(tenantId, id);
  return prisma.appointment.delete({ where: { id } });
}
