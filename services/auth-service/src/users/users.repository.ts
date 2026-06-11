import { Injectable } from "@nestjs/common";
import type { Prisma, Role } from "@prisma/client";
import { DatabaseService } from "@/database/database.module";
import type { ListUsersSortField } from "@/validators/user.validator";

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  findByEmail(tenantId: string, email: string) {
    return this.db.user.findUnique({
      where: { tenantId_email: { tenantId, email: email.toLowerCase() } },
    });
  }

  findById(tenantId: string, userId: string) {
    return this.db.user.findFirst({
      where: { id: userId, tenantId },
    });
  }

  findByIdGlobal(userId: string) {
    return this.db.user.findUnique({
      where: { id: userId },
    });
  }

  findMany(params?: { skip?: number; take?: number }) {
    return this.db.user.findMany({
      skip: params?.skip,
      take: params?.take,
      orderBy: { createdAt: "desc" },
    });
  }

  createUser(data: {
    tenantId: string;
    email: string;
    passwordHash: string;
    role: Role;
    firstName?: string;
    lastName?: string;
    phone?: string;
    verificationToken?: string;
  }) {
    return this.db.user.create({
      data: {
        tenantId: data.tenantId,
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        verificationToken: data.verificationToken,
      },
    });
  }

  findManyByTenant(tenantId: string, params?: { skip?: number; take?: number }) {
    return this.db.user.findMany({
      where: { tenantId },
      skip: params?.skip,
      take: params?.take,
      orderBy: { createdAt: "desc" },
    });
  }

  listUsers(params: {
    tenantId?: string;
    skip: number;
    take: number;
    search?: string;
    role?: Role;
    isActive?: boolean;
    sortBy: ListUsersSortField;
    sortOrder: "asc" | "desc";
  }) {
    const where: Prisma.UserWhereInput = {};

    if (params.tenantId) {
      where.tenantId = params.tenantId;
    }

    if (params.role) {
      where.role = params.role;
    }

    if (params.isActive !== undefined) {
      where.isActive = params.isActive;
    }

    if (params.search) {
      where.OR = [
        { firstName: { contains: params.search, mode: "insensitive" } },
        { lastName: { contains: params.search, mode: "insensitive" } },
        { email: { contains: params.search, mode: "insensitive" } },
      ];
    }

    const orderBy = { [params.sortBy]: params.sortOrder } as Prisma.UserOrderByWithRelationInput;

    return Promise.all([
      this.db.user.count({ where }),
      this.db.user.findMany({
        where,
        skip: params.skip,
        take: params.take,
        orderBy,
      }),
    ]);
  }

  updateUser(
    tenantId: string,
    userId: string,
    data: Partial<{
      passwordHash: string;
      emailVerified: boolean;
      verificationToken: string | null;
      mfaEnabled: boolean;
      mfaSecret: string | null;
      tokenVersion: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      avatarUrl: string | null;
      role: Role;
      isActive: boolean;
    }>,
  ) {
    void tenantId;
    return this.db.user.update({
      where: { id: userId },
      data: {
        ...data,
        email: data.email?.toLowerCase(),
      },
    });
  }
}
