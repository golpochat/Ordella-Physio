import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { Role } from "@prisma/client";
import type { SecurityRole } from "@ordella/security";
import { generateToken } from "@ordella/utils";
import { passwordHasher } from "@/utils/password-hasher";
import { toUserRecord, type UserRecord } from "@/users/users.mapper";
import { UsersRepository } from "@/users/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(input: {
    tenantId: string;
    email: string;
    password: string;
    role: SecurityRole | Role;
  }): Promise<UserRecord> {
    const existing = await this.usersRepository.findByEmail(input.tenantId, input.email);
    if (existing) {
      throw new ConflictException("User already exists for this tenant");
    }

    const passwordHash = await passwordHasher.hash(input.password);
    const user = await this.usersRepository.createUser({
      tenantId: input.tenantId,
      email: input.email,
      passwordHash,
      role: input.role as Role,
      verificationToken: generateToken(24),
    });

    return toUserRecord(user);
  }

  async findByEmail(tenantId: string, email: string): Promise<UserRecord | null> {
    const user = await this.usersRepository.findByEmail(tenantId, email);
    return user ? toUserRecord(user) : null;
  }

  async findById(tenantId: string, userId: string): Promise<UserRecord | null> {
    const user = await this.usersRepository.findById(tenantId, userId);
    return user ? toUserRecord(user) : null;
  }

  async getById(tenantId: string, userId: string): Promise<UserRecord> {
    const user = await this.findById(tenantId, userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async validatePassword(user: UserRecord, password: string): Promise<boolean> {
    return passwordHasher.compare(password, user.passwordHash);
  }

  async updatePassword(tenantId: string, userId: string, password: string): Promise<UserRecord> {
    const passwordHash = await passwordHasher.hash(password);
    const user = await this.usersRepository.updateUser(tenantId, userId, { passwordHash });
    return toUserRecord(user);
  }

  async markEmailVerified(tenantId: string, userId: string): Promise<UserRecord> {
    const user = await this.usersRepository.updateUser(tenantId, userId, {
      emailVerified: true,
      verificationToken: null,
    });
    return toUserRecord(user);
  }
}
