import { Injectable } from "@nestjs/common";
import type { Role, User } from "@prisma/client";
import { getRoleLevel, isSystemRole } from "@ordella/security";
import { generateToken } from "@ordella/utils";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";
import { passwordHasher } from "@/utils/password-hasher";
import { sanitizeManagedUser } from "@/models/User";
import {
  validateAdminResetPassword,
  validateAvatarUpload,
  validateChangePassword,
  validateChangeRole,
  validateCreateUser,
  parseListUsersQuery,
  validateSelfUpdate,
  validateUpdateUser,
} from "@/validators/user.validator";
import {
  cannotDisableSystemUserError,
  cannotModifySystemUserError,
  emailExistsError,
  forbiddenFieldError,
  invalidCurrentPasswordError,
  invalidFileError,
  invalidFilterError,
  invalidPaginationError,
  roleAssignNotAllowedError,
  roleModifyNotAllowedError,
  roleNotAllowedError,
  uploadFailedError,
  userAlreadyActiveError,
  userAlreadyDisabledError,
  userNotFoundError,
  userTenantMismatchError,
  userValidationError,
} from "@/utils/user-errors";
import {
  deleteStoredAvatarFile,
  uploadAvatarFile,
  type AvatarUploadFile,
} from "@/utils/fileUpload";
import { TokenService } from "@/services/token.service";
import { UsersRepository } from "@/users/users.repository";

@Injectable()
export class UserManagementService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
  ) {}

  async listUsers(query: unknown, requestingUser: AuthenticatedRequestUser) {
    const parsed = parseListUsersQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidPaginationError();
      }
      throw invalidFilterError();
    }

    const filters = parsed.payload;
    const tenantScope = isSystemRole(requestingUser.role) ? undefined : requestingUser.tenantId;
    const skip = (filters.page - 1) * filters.limit;

    const [total, users] = await this.usersRepository.listUsers({
      tenantId: tenantScope,
      skip,
      take: filters.limit,
      search: filters.search,
      role: filters.role,
      isActive:
        filters.status === undefined ? undefined : filters.status === "ACTIVE",
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });

    const totalPages = total === 0 ? 0 : Math.ceil(total / filters.limit);

    return {
      data: users.map((user) => sanitizeManagedUser(user)),
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages,
      },
    };
  }

  async createUser(payload: unknown, createdByUser: AuthenticatedRequestUser) {
    const validation = validateCreateUser(payload);
    if (!validation.valid) {
      throw userValidationError(validation.fields);
    }

    const tenantId = createdByUser.tenantId;
    const data = validation.payload;

    const existing = await this.usersRepository.findByEmail(tenantId, data.email);
    if (existing) {
      throw emailExistsError();
    }

    if (!this.canAssignRole(createdByUser.role, data.role)) {
      throw roleNotAllowedError();
    }

    const passwordHash = await passwordHasher.hash(data.password);
    const user = await this.usersRepository.createUser({
      tenantId,
      email: data.email,
      passwordHash,
      role: data.role as Role,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      verificationToken: generateToken(24),
    });

    return {
      user: sanitizeManagedUser(user),
      message: "User created successfully.",
    };
  }

  async getMyProfile(userId: string, tenantId: string) {
    const user = await this.usersRepository.findById(tenantId, userId);
    if (!user) {
      throw userNotFoundError();
    }

    return sanitizeManagedUser(user);
  }

  async selfUpdate(userId: string, tenantId: string, payload: unknown) {
    const user = await this.usersRepository.findById(tenantId, userId);
    if (!user) {
      throw userNotFoundError();
    }

    const validation = validateSelfUpdate(payload);
    if (!validation.valid) {
      if (validation.error === "FORBIDDEN_FIELD") {
        throw forbiddenFieldError("You cannot modify this field.", validation.field);
      }
      throw userValidationError(validation.fields);
    }

    const data = validation.payload;
    const updated = await this.usersRepository.updateUser(tenantId, userId, {
      ...(data.firstName !== undefined ? { firstName: data.firstName } : {}),
      ...(data.lastName !== undefined ? { lastName: data.lastName } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
    });

    return {
      user: sanitizeManagedUser(updated),
      message: "Profile updated successfully.",
    };
  }

  async updateAvatar(userId: string, tenantId: string, file: AvatarUploadFile | undefined) {
    const user = await this.usersRepository.findById(tenantId, userId);
    if (!user) {
      throw userNotFoundError();
    }

    const validation = validateAvatarUpload(file);
    if (!validation.valid) {
      if (validation.error === "INVALID_FILE") {
        throw invalidFileError();
      }
      throw userValidationError(validation.fields);
    }

    let avatarUrl: string;
    try {
      avatarUrl = await uploadAvatarFile(validation.file, userId);
    } catch {
      throw uploadFailedError();
    }

    const previousAvatarUrl = user.avatarUrl;
    const updated = await this.usersRepository.updateUser(tenantId, userId, {
      avatarUrl,
    });

    await deleteStoredAvatarFile(previousAvatarUrl);

    return {
      avatarUrl: updated.avatarUrl ?? avatarUrl,
      user: sanitizeManagedUser(updated),
      message: "Avatar updated successfully.",
    };
  }

  async removeAvatar(userId: string, tenantId: string) {
    const user = await this.usersRepository.findById(tenantId, userId);
    if (!user) {
      throw userNotFoundError();
    }

    const previousAvatarUrl = user.avatarUrl;
    const updated = await this.usersRepository.updateUser(tenantId, userId, {
      avatarUrl: null,
    });

    await deleteStoredAvatarFile(previousAvatarUrl);

    return {
      user: sanitizeManagedUser(updated),
      message: "Avatar removed successfully.",
    };
  }

  async getUser(id: string, requestedBy: AuthenticatedRequestUser) {
    const user = isSystemRole(requestedBy.role)
      ? await this.usersRepository.findByIdGlobal(id)
      : await this.usersRepository.findById(requestedBy.tenantId, id);

    if (!user) {
      throw userNotFoundError();
    }

    if (!isSystemRole(requestedBy.role) && user.tenantId !== requestedBy.tenantId) {
      throw userTenantMismatchError();
    }

    return sanitizeManagedUser(user);
  }

  async disableUser(id: string, performedByUser: AuthenticatedRequestUser) {
    const user = await this.findUserForStatusChange(id);
    this.assertCanModifyUser(performedByUser, user, { preventSystemDisable: true });

    if (!user.isActive) {
      throw userAlreadyDisabledError();
    }

    const updated = await this.usersRepository.updateUser(user.tenantId, id, {
      isActive: false,
    });

    return {
      user: sanitizeManagedUser(updated),
      message: "User disabled successfully.",
    };
  }

  async activateUser(id: string, performedByUser: AuthenticatedRequestUser) {
    const user = await this.findUserForStatusChange(id);
    this.assertCanModifyUser(performedByUser, user);

    if (user.isActive) {
      throw userAlreadyActiveError();
    }

    const updated = await this.usersRepository.updateUser(user.tenantId, id, {
      isActive: true,
    });

    return {
      user: sanitizeManagedUser(updated),
      message: "User activated successfully.",
    };
  }

  async adminResetPassword(
    id: string,
    payload: unknown,
    performedByUser: AuthenticatedRequestUser,
  ) {
    const user = await this.findUserForStatusChange(id);
    this.assertCanModifyUser(performedByUser, user);

    const validation = validateAdminResetPassword(payload);
    if (!validation.valid) {
      throw userValidationError(validation.fields);
    }

    const passwordHash = await passwordHasher.hash(validation.payload.password);
    await this.usersRepository.updateUser(user.tenantId, id, { passwordHash });
    await this.tokenService.invalidateAllUserTokens(id, user.tenantId);

    return { message: "Password updated successfully." };
  }

  async changePassword(userId: string, tenantId: string, payload: unknown) {
    const user = await this.usersRepository.findById(tenantId, userId);
    if (!user) {
      throw userNotFoundError();
    }

    const validation = validateChangePassword(payload);
    if (!validation.valid) {
      throw userValidationError(validation.fields);
    }

    const data = validation.payload;
    const currentValid = await passwordHasher.compare(data.currentPassword, user.passwordHash);
    if (!currentValid) {
      throw invalidCurrentPasswordError();
    }

    const passwordHash = await passwordHasher.hash(data.newPassword);
    await this.usersRepository.updateUser(tenantId, userId, { passwordHash });
    await this.tokenService.invalidateAllUserTokens(userId, tenantId);

    return { message: "Password updated successfully." };
  }

  async changeUserRole(id: string, payload: unknown, performedByUser: AuthenticatedRequestUser) {
    const user = await this.findUserForStatusChange(id);

    if (!isSystemRole(performedByUser.role) && user.tenantId !== performedByUser.tenantId) {
      throw userTenantMismatchError();
    }

    if (!isSystemRole(performedByUser.role) && user.role === "SYSTEM") {
      throw cannotModifySystemUserError();
    }

    this.assertCanModifyUser(performedByUser, user);

    const validation = validateChangeRole(payload);
    if (!validation.valid) {
      throw userValidationError(validation.fields);
    }

    const newRole = validation.payload.role;

    if (user.role === "SYSTEM" && newRole !== "SYSTEM") {
      if (!isSystemRole(performedByUser.role)) {
        throw cannotModifySystemUserError();
      }
    }

    if (!isSystemRole(performedByUser.role) && newRole === "SYSTEM") {
      throw roleAssignNotAllowedError();
    }

    if (!this.canAssignRole(performedByUser.role, newRole)) {
      throw roleAssignNotAllowedError();
    }

    const updated = await this.usersRepository.updateUser(user.tenantId, id, {
      role: newRole as Role,
    });

    return {
      user: sanitizeManagedUser(updated),
      message: "User role updated successfully.",
    };
  }

  async updateUser(id: string, payload: unknown, updatedByUser: AuthenticatedRequestUser) {
    const user = await this.findUserForStatusChange(id);
    this.assertCanModifyUser(updatedByUser, user, { preventSystemDisable: false });

    if (!isSystemRole(updatedByUser.role) && user.role === "SYSTEM") {
      throw roleAssignNotAllowedError("You cannot modify system users.");
    }

    const validation = validateUpdateUser(payload);
    if (!validation.valid) {
      throw userValidationError(validation.fields);
    }

    const data = validation.payload;
    const tenantId = user.tenantId;

    if (data.email !== undefined && data.email !== user.email) {
      const existing = await this.usersRepository.findByEmail(tenantId, data.email);
      if (existing && existing.id !== user.id) {
        throw emailExistsError();
      }
    }

    if (data.role !== undefined && data.role !== user.role) {
      if (!isSystemRole(updatedByUser.role) && data.role === "SYSTEM") {
        throw roleAssignNotAllowedError();
      }

      if (!this.canAssignRole(updatedByUser.role, data.role)) {
        throw roleAssignNotAllowedError();
      }
    }

    const updated = await this.usersRepository.updateUser(tenantId, id, {
      ...(data.firstName !== undefined ? { firstName: data.firstName } : {}),
      ...(data.lastName !== undefined ? { lastName: data.lastName } : {}),
      ...(data.email !== undefined ? { email: data.email } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.role !== undefined ? { role: data.role as Role } : {}),
      ...(data.status !== undefined ? { isActive: data.status === "ACTIVE" } : {}),
    });

    return {
      user: sanitizeManagedUser(updated),
      message: "User updated successfully.",
    };
  }

  private async findUserForStatusChange(id: string) {
    const user = await this.usersRepository.findByIdGlobal(id);
    if (!user) {
      throw userNotFoundError();
    }

    return user;
  }

  private assertCanModifyUser(
    performedByUser: AuthenticatedRequestUser,
    targetUser: User,
    options?: { preventSystemDisable?: boolean },
  ) {
    if (!isSystemRole(performedByUser.role) && targetUser.tenantId !== performedByUser.tenantId) {
      throw userTenantMismatchError();
    }

    if (!this.canModifyUser(performedByUser.role, targetUser.role)) {
      throw roleModifyNotAllowedError();
    }

    if (
      options?.preventSystemDisable &&
      targetUser.role === "SYSTEM" &&
      !isSystemRole(performedByUser.role)
    ) {
      throw cannotDisableSystemUserError();
    }
  }

  private canModifyUser(
    actorRole: AuthenticatedRequestUser["role"],
    targetRole: string,
  ): boolean {
    if (isSystemRole(actorRole)) {
      return true;
    }

    return getRoleLevel(actorRole) >= getRoleLevel(targetRole as AuthenticatedRequestUser["role"]);
  }

  private canAssignRole(actorRole: AuthenticatedRequestUser["role"], targetRole: string): boolean {
    return this.canModifyUser(actorRole, targetRole);
  }
}
