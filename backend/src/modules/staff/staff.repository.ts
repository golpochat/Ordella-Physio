import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getPagination } from "../../utils/pagination";
import type { AdminUpdateStaffInput, CreateStaffInput, ListStaffFilters } from "./staff.types";
import { StaffNotFoundError } from "./staff.errors";

const staffInclude = {
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      status: true,
      roles: {
        include: {
          role: {
            select: {
              id: true,
              name: true,
              description: true,
              permissions: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.StaffInclude;

function buildListWhere(tenantId: string, filters: ListStaffFilters): Prisma.StaffWhereInput {
  const where: Prisma.StaffWhereInput = { tenantId };

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  } else {
    where.isActive = true;
  }

  if (filters.department) {
    where.department = { contains: filters.department, mode: "insensitive" };
  }

  if (filters.search) {
    const term = filters.search.trim();
    where.OR = [
      { jobTitle: { contains: term, mode: "insensitive" } },
      { department: { contains: term, mode: "insensitive" } },
      { user: { firstName: { contains: term, mode: "insensitive" } } },
      { user: { lastName: { contains: term, mode: "insensitive" } } },
      { user: { email: { contains: term, mode: "insensitive" } } },
    ];
  }

  return where;
}

export async function findStaffMembers(tenantId: string, filters: ListStaffFilters) {
  const where = buildListWhere(tenantId, filters);
  const sortBy = filters.sortBy ?? "createdAt";
  const sortOrder = filters.sortOrder ?? "desc";

  const orderBy: Prisma.StaffOrderByWithRelationInput =
    sortBy === "lastName" ? { user: { lastName: sortOrder } } : { [sortBy]: sortOrder };

  const [items, total] = await Promise.all([
    prisma.staff.findMany({
      where,
      include: staffInclude,
      ...getPagination(filters),
      orderBy,
    }),
    prisma.staff.count({ where }),
  ]);

  return { items, total };
}

export async function findStaffById(tenantId: string, id: string) {
  return prisma.staff.findFirst({
    where: { id, tenantId },
    include: staffInclude,
  });
}

export async function findStaffByIdOrThrow(tenantId: string, id: string) {
  const staff = await findStaffById(tenantId, id);
  if (!staff) {
    throw new StaffNotFoundError(id);
  }
  return staff;
}

export async function findStaffByUserId(tenantId: string, userId: string) {
  return prisma.staff.findFirst({
    where: { tenantId, userId },
    include: staffInclude,
  });
}

export async function findUserByEmail(tenantId: string, email: string) {
  return prisma.user.findUnique({
    where: { tenantId_email: { tenantId, email: email.toLowerCase() } },
  });
}

export async function findRolesByNames(tenantId: string, roleNames: string[]) {
  return prisma.role.findMany({
    where: { tenantId, name: { in: roleNames } },
  });
}

export async function createStaffUser(
  tenantId: string,
  data: CreateStaffInput,
  passwordHash: string,
  roleIds: string[],
) {
  return prisma.user.create({
    data: {
      tenantId,
      email: data.email.toLowerCase(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      roles: roleIds.length ? { create: roleIds.map((roleId) => ({ roleId })) } : undefined,
    },
  });
}

export async function createStaffRecord(
  tenantId: string,
  userId: string,
  data: Pick<CreateStaffInput, "jobTitle" | "department">,
) {
  return prisma.staff.create({
    data: {
      tenantId,
      userId,
      jobTitle: data.jobTitle,
      department: data.department,
    },
    include: staffInclude,
  });
}

export async function updateStaffRecord(
  tenantId: string,
  id: string,
  staffData: Partial<AdminUpdateStaffInput>,
  userData?: { firstName?: string; lastName?: string; phone?: string | null },
) {
  await findStaffByIdOrThrow(tenantId, id);
  const staff = await prisma.staff.findFirstOrThrow({ where: { id, tenantId } });

  if (userData && Object.keys(userData).length > 0) {
    await prisma.user.update({
      where: { id: staff.userId },
      data: userData,
    });
  }

  const { firstName: _f, lastName: _l, phone: _p, ...profileData } = staffData;

  return prisma.staff.update({
    where: { id },
    data: profileData,
    include: staffInclude,
  });
}

export async function deactivateStaffRecord(tenantId: string, id: string) {
  await findStaffByIdOrThrow(tenantId, id);
  return prisma.staff.update({
    where: { id },
    data: { isActive: false },
    include: staffInclude,
  });
}

export async function replaceUserRoles(userId: string, roleIds: string[]) {
  return prisma.$transaction(async (tx) => {
    await tx.userRole.deleteMany({ where: { userId } });
    if (roleIds.length > 0) {
      await tx.userRole.createMany({
        data: roleIds.map((roleId) => ({ userId, roleId })),
      });
    }
    return tx.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
  });
}

export async function getUserRoleAssignments(userId: string, tenantId: string) {
  return prisma.userRole.findMany({
    where: { userId, role: { tenantId } },
    include: {
      role: {
        select: { id: true, name: true, description: true, permissions: true },
      },
    },
  });
}

export function mapStaffProfile(
  staff: NonNullable<Awaited<ReturnType<typeof findStaffById>>>,
): {
  staff: typeof staff;
  roles: { id: string; name: string; description: string | null; permissions: string[] }[];
  permissions: string[];
} {
  const roles = staff.user.roles.map((entry) => entry.role);
  const permissions = [...new Set(roles.flatMap((role) => role.permissions))];

  return { staff, roles, permissions };
}
