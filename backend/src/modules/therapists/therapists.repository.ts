import type { AppointmentStatus, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getPagination } from "../../utils/pagination";
import type {
  AdminUpdateTherapistInput,
  CreateTherapistInput,
  ListTherapistAppointmentsFilters,
  ListTherapistsFilters,
  ServiceTypeInput,
  WorkingHoursBlock,
} from "./therapists.types";
import { BlockedSlotNotFoundError, TherapistNotFoundError } from "./therapists.errors";

const therapistInclude = {
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      status: true,
    },
  },
  serviceTypes: { where: { isActive: true }, orderBy: { name: "asc" as const } },
  availability: { orderBy: [{ dayOfWeek: "asc" as const }, { startTime: "asc" as const }] },
} satisfies Prisma.TherapistInclude;

function buildListWhere(tenantId: string, filters: ListTherapistsFilters): Prisma.TherapistWhereInput {
  const where: Prisma.TherapistWhereInput = { tenantId };

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  } else {
    where.isActive = true;
  }

  if (filters.specialty) {
    where.specialty = { contains: filters.specialty, mode: "insensitive" };
  }

  if (filters.search) {
    const term = filters.search.trim();
    where.OR = [
      { specialty: { contains: term, mode: "insensitive" } },
      { licenseNumber: { contains: term, mode: "insensitive" } },
      { user: { firstName: { contains: term, mode: "insensitive" } } },
      { user: { lastName: { contains: term, mode: "insensitive" } } },
      { user: { email: { contains: term, mode: "insensitive" } } },
    ];
  }

  return where;
}

export async function findTherapists(tenantId: string, filters: ListTherapistsFilters) {
  const where = buildListWhere(tenantId, filters);
  const sortBy = filters.sortBy ?? "createdAt";
  const sortOrder = filters.sortOrder ?? "desc";

  const orderBy: Prisma.TherapistOrderByWithRelationInput =
    sortBy === "lastName"
      ? { user: { lastName: sortOrder } }
      : { [sortBy]: sortOrder };

  const [items, total] = await Promise.all([
    prisma.therapist.findMany({
      where,
      include: therapistInclude,
      ...getPagination(filters),
      orderBy,
    }),
    prisma.therapist.count({ where }),
  ]);

  return { items, total };
}

export async function findTherapistById(tenantId: string, id: string) {
  return prisma.therapist.findFirst({
    where: { id, tenantId },
    include: therapistInclude,
  });
}

export async function findTherapistByIdOrThrow(tenantId: string, id: string) {
  const therapist = await findTherapistById(tenantId, id);
  if (!therapist) {
    throw new TherapistNotFoundError(id);
  }
  return therapist;
}

export async function findTherapistByUserId(tenantId: string, userId: string) {
  return prisma.therapist.findFirst({
    where: { tenantId, userId },
    include: therapistInclude,
  });
}

export async function createTherapistRecord(
  tenantId: string,
  userId: string,
  data: Omit<CreateTherapistInput, "email" | "password" | "firstName" | "lastName" | "phone">,
) {
  return prisma.therapist.create({
    data: {
      tenantId,
      userId,
      specialty: data.specialty,
      licenseNumber: data.licenseNumber,
      bio: data.bio,
    },
    include: therapistInclude,
  });
}

export async function updateTherapistRecord(
  tenantId: string,
  id: string,
  therapistData: Partial<AdminUpdateTherapistInput>,
  userData?: { firstName?: string; lastName?: string; phone?: string | null },
) {
  await findTherapistByIdOrThrow(tenantId, id);
  const therapist = await prisma.therapist.findFirstOrThrow({ where: { id, tenantId } });

  if (userData && Object.keys(userData).length > 0) {
    await prisma.user.update({
      where: { id: therapist.userId },
      data: userData,
    });
  }

  const { firstName: _f, lastName: _l, phone: _p, ...profileData } = therapistData;

  return prisma.therapist.update({
    where: { id },
    data: profileData,
    include: therapistInclude,
  });
}

export async function deactivateTherapistRecord(tenantId: string, id: string) {
  await findTherapistByIdOrThrow(tenantId, id);
  return prisma.therapist.update({
    where: { id },
    data: { isActive: false },
    include: therapistInclude,
  });
}

export async function getTherapistSchedule(tenantId: string, therapistId: string) {
  await findTherapistByIdOrThrow(tenantId, therapistId);

  const [workingHours, blockedSlots] = await Promise.all([
    prisma.therapistAvailability.findMany({
      where: { tenantId, therapistId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    }),
    prisma.therapistBlockedSlot.findMany({
      where: { tenantId, therapistId },
      orderBy: { startTime: "asc" },
    }),
  ]);

  return { workingHours, blockedSlots };
}

export async function replaceWorkingHours(
  tenantId: string,
  therapistId: string,
  blocks: WorkingHoursBlock[],
) {
  await findTherapistByIdOrThrow(tenantId, therapistId);

  return prisma.$transaction(async (tx) => {
    await tx.therapistAvailability.deleteMany({ where: { tenantId, therapistId } });

    if (blocks.length === 0) {
      return [];
    }

    await tx.therapistAvailability.createMany({
      data: blocks.map((block) => ({
        tenantId,
        therapistId,
        dayOfWeek: block.dayOfWeek,
        startTime: block.startTime,
        endTime: block.endTime,
      })),
    });

    return tx.therapistAvailability.findMany({
      where: { tenantId, therapistId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  });
}

export async function createBlockedSlot(
  tenantId: string,
  therapistId: string,
  data: { startTime: Date; endTime: Date; reason?: string },
) {
  await findTherapistByIdOrThrow(tenantId, therapistId);

  return prisma.therapistBlockedSlot.create({
    data: { tenantId, therapistId, ...data },
  });
}

export async function deleteBlockedSlot(tenantId: string, therapistId: string, blockId: string) {
  const slot = await prisma.therapistBlockedSlot.findFirst({
    where: { id: blockId, tenantId, therapistId },
  });
  if (!slot) {
    throw new BlockedSlotNotFoundError(blockId);
  }

  return prisma.therapistBlockedSlot.delete({ where: { id: blockId } });
}

export async function getServiceTypes(tenantId: string, therapistId: string) {
  await findTherapistByIdOrThrow(tenantId, therapistId);

  return prisma.therapistServiceType.findMany({
    where: { tenantId, therapistId },
    orderBy: { name: "asc" },
  });
}

export async function replaceServiceTypes(
  tenantId: string,
  therapistId: string,
  serviceTypes: ServiceTypeInput[],
) {
  await findTherapistByIdOrThrow(tenantId, therapistId);

  return prisma.$transaction(async (tx) => {
    await tx.therapistServiceType.deleteMany({ where: { tenantId, therapistId } });

    if (serviceTypes.length === 0) {
      return [];
    }

    await tx.therapistServiceType.createMany({
      data: serviceTypes.map((type) => ({
        tenantId,
        therapistId,
        name: type.name,
        durationMinutes: type.durationMinutes ?? 30,
        description: type.description,
        isActive: type.isActive ?? true,
      })),
    });

    return tx.therapistServiceType.findMany({
      where: { tenantId, therapistId },
      orderBy: { name: "asc" },
    });
  });
}

export async function findTherapistAppointments(
  tenantId: string,
  therapistId: string,
  filters: ListTherapistAppointmentsFilters,
) {
  await findTherapistByIdOrThrow(tenantId, therapistId);

  const where: Prisma.AppointmentWhereInput = {
    tenantId,
    therapistId,
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.startFrom || filters.startTo
      ? {
          startTime: {
            ...(filters.startFrom ? { gte: filters.startFrom } : {}),
            ...(filters.startTo ? { lte: filters.startTo } : {}),
          },
        }
      : {}),
  };

  const sortOrder = filters.sortOrder ?? "asc";

  const [items, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      ...getPagination(filters),
      orderBy: { startTime: sortOrder },
      include: {
        patient: {
          select: { id: true, firstName: true, lastName: true, email: true, phone: true },
        },
      },
    }),
    prisma.appointment.count({ where }),
  ]);

  return { items, total };
}

export async function findUserByEmail(tenantId: string, email: string) {
  return prisma.user.findUnique({
    where: { tenantId_email: { tenantId, email: email.toLowerCase() } },
  });
}

export async function createTherapistUser(
  tenantId: string,
  data: CreateTherapistInput,
  passwordHash: string,
  therapistRoleId: string | null,
) {
  return prisma.user.create({
    data: {
      tenantId,
      email: data.email.toLowerCase(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      roles: therapistRoleId ? { create: [{ roleId: therapistRoleId }] } : undefined,
    },
  });
}

export async function findTherapistRole(tenantId: string) {
  return prisma.role.findUnique({
    where: { tenantId_name: { tenantId, name: "THERAPIST" } },
  });
}
