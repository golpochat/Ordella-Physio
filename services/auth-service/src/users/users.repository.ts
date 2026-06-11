import { Injectable } from "@nestjs/common";
import type { Role } from "@prisma/client";
import { DatabaseService } from "@/database/database.module";

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
    verificationToken?: string;
  }) {
    return this.db.user.create({
      data: {
        tenantId: data.tenantId,
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        role: data.role,
        verificationToken: data.verificationToken,
      },
    });
  }

  updateUser(tenantId: string, userId: string, data: Partial<{ passwordHash: string; emailVerified: boolean; verificationToken: string | null }>) {
    return this.db.user.update({
      where: { id: userId },
      data,
    });
  }
}
