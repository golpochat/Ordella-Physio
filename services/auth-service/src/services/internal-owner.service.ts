import { Injectable } from "@nestjs/common";
import { generateToken } from "@ordella/utils";
import { EmailService } from "@/email/email.service";
import { UsersRepository } from "@/users/users.repository";
import { passwordHasher } from "@/utils/password-hasher";
import {
  emailExistsError,
  userNotFoundError,
  userValidationError,
} from "@/utils/user-errors";
import { sanitizeManagedUser } from "@/models/User";
import { EMAIL_REGEX } from "@ordella/validation";

export type InternalOwnerUser = {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  status: "INVITED" | "ACTIVE" | "DISABLED";
};

function deriveInvitedName(email: string): { firstName: string; lastName: string } {
  const local = email.split("@")[0]?.trim() || "owner";
  const parts = local.split(/[._-]+/).filter(Boolean);
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Pending";
  const lastName = parts[1]
    ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
    : "Owner";
  return { firstName, lastName };
}

function toInternalOwnerUser(user: {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  verificationToken: string | null;
}): InternalOwnerUser {
  let status: InternalOwnerUser["status"] = "ACTIVE";
  if (!user.isActive) {
    status = user.verificationToken && !user.emailVerified ? "INVITED" : "DISABLED";
  }

  return {
    id: user.id,
    tenantId: user.tenantId,
    email: user.email,
    role: user.role,
    status,
  };
}

@Injectable()
export class InternalOwnerService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
  ) {}

  async findByEmail(email: string): Promise<InternalOwnerUser | null> {
    const user = await this.usersRepository.findByEmailGlobal(email);
    return user ? toInternalOwnerUser(user) : null;
  }

  async createInvitedOwner(input: { tenantId: string; email: string }): Promise<InternalOwnerUser> {
    const email = input.email.trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      throw userValidationError([{ field: "ownerEmail", message: "Enter a valid email." }]);
    }

    const existing = await this.usersRepository.findByEmailGlobal(email);
    if (existing) {
      throw emailExistsError("This email is already in use.");
    }

    const { firstName, lastName } = deriveInvitedName(email);
    const verificationToken = generateToken(32);
    const passwordHash = await passwordHasher.hash(generateToken(48));

    const user = await this.usersRepository.createUser({
      tenantId: input.tenantId,
      email,
      passwordHash,
      role: "OWNER",
      firstName,
      lastName,
      verificationToken,
      isActive: false,
      emailVerified: false,
    });

    await this.emailService.sendVerificationEmail({
      tenantId: user.tenantId,
      email: user.email,
      token: verificationToken,
    });

    return toInternalOwnerUser(user);
  }

  async assignUserToTenant(input: {
    userId: string;
    tenantId: string;
    role?: "OWNER";
  }): Promise<InternalOwnerUser> {
    const user = await this.usersRepository.findByIdGlobal(input.userId);
    if (!user) {
      throw userNotFoundError();
    }

    const updated = await this.usersRepository.updateUserGlobal(input.userId, {
      tenantId: input.tenantId,
      role: input.role ?? "OWNER",
      isActive: true,
    });

    return toInternalOwnerUser(updated);
  }

  async getUserById(userId: string): Promise<InternalOwnerUser | null> {
    const user = await this.usersRepository.findByIdGlobal(userId);
    return user ? toInternalOwnerUser(user) : null;
  }

  async revertUserTenantAssignment(userId: string, previousTenantId: string) {
    const user = await this.usersRepository.findByIdGlobal(userId);
    if (!user) {
      return { message: "User not found." };
    }

    await this.usersRepository.updateUserGlobal(userId, {
      tenantId: previousTenantId,
    });

    return { message: "User tenant assignment reverted." };
  }

  async rollbackProvisionedUser(userId: string, options?: { invitedOnly?: boolean }) {
    const user = await this.usersRepository.findByIdGlobal(userId);
    if (!user) {
      return { message: "User already removed." };
    }

    if (options?.invitedOnly) {
      const isInvited = !user.isActive && user.verificationToken && !user.emailVerified;
      if (!isInvited) {
        return { message: "User rollback skipped for non-invited account." };
      }
    }

    await this.usersRepository.deleteUserGlobal(userId);
    return { message: "User provisioning rollback completed." };
  }
}
