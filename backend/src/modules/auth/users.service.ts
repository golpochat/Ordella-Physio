import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/api-error";
import { buildPaginatedResponse, getPagination, type PaginationInput } from "../../utils/pagination";

export type ListTenantUsersFilters = PaginationInput & {
  search?: string;
  role?: string;
  status?: "ACTIVE" | "DISABLED";
  sortBy?: "createdAt" | "firstName" | "lastName" | "email" | "role";
  sortOrder?: "asc" | "desc";
};

function mapUserStatus(status: string): "ACTIVE" | "DISABLED" {
  return status === "ACTIVE" ? "ACTIVE" : "DISABLED";
}

function mapUserRecord(user: {
  id: string;
  tenantId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Array<{ role: { name: string } }>;
}) {
  return {
    id: user.id,
    tenantId: user.tenantId,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email,
    phone: user.phone ?? undefined,
    role: user.roles[0]?.role.name ?? "STAFF",
    status: mapUserStatus(user.status),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

const userInclude = {
  roles: {
    include: {
      role: {
        select: { name: true },
      },
    },
  },
} satisfies Prisma.UserInclude;

function buildUserWhere(tenantId: string, filters: ListTenantUsersFilters): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = { tenantId };

  if (filters.status === "ACTIVE") {
    where.status = "ACTIVE";
  } else if (filters.status === "DISABLED") {
    where.status = { in: ["INACTIVE", "INVITED"] };
  }

  if (filters.role) {
    where.roles = {
      some: {
        role: {
          name: filters.role,
        },
      },
    };
  }

  if (filters.search?.trim()) {
    const term = filters.search.trim();
    where.OR = [
      { email: { contains: term, mode: "insensitive" } },
      { firstName: { contains: term, mode: "insensitive" } },
      { lastName: { contains: term, mode: "insensitive" } },
    ];
  }

  return where;
}

export async function listTenantUsers(tenantId: string, filters: ListTenantUsersFilters) {
  const where = buildUserWhere(tenantId, filters);
  const sortBy = filters.sortBy ?? "createdAt";
  const sortOrder = filters.sortOrder ?? "desc";

  const orderBy: Prisma.UserOrderByWithRelationInput =
    sortBy === "email"
      ? { email: sortOrder }
      : sortBy === "firstName"
        ? { firstName: sortOrder }
        : sortBy === "lastName"
          ? { lastName: sortOrder }
          : { [sortBy]: sortOrder };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: userInclude,
      ...getPagination(filters),
      orderBy,
    }),
    prisma.user.count({ where }),
  ]);

  const items = users.map(mapUserRecord);
  const page = buildPaginatedResponse(items, total, filters);

  return {
    data: items,
    pagination: {
      page: page.page,
      limit: page.pageSize,
      total: page.total,
      totalPages: page.totalPages,
    },
  };
}

export async function getTenantUser(tenantId: string, userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId, tenantId },
    include: userInclude,
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return mapUserRecord(user);
}
