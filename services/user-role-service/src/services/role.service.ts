import { Injectable } from "@nestjs/common";
import type { CreateRolePayload, UpdateRolePayload } from "@/models/Role";
import { RoleRepository } from "@/repositories/role.repository";
import { parseListRolesQuery, validateCreateRole, validateUpdateRole } from "@/validators/role.validator";
import {
  invalidPermissionError,
  invalidRoleFilterError,
  invalidRolePaginationError,
  roleCodeExistsError,
  roleNameExistsError,
  roleAssignedToUsersError,
  roleNotFoundError,
  roleTenantMismatchError,
  roleTenantRequiredError,
  roleValidationError,
  systemRoleCannotBeDeletedError,
  systemRoleCannotBeModifiedError,
} from "@/utils/role-errors";
import {
  toPermissionResponse,
  toRoleListItemResponse,
  toRolePermissionCodes,
  toRoleResponse,
  type AuthenticatedRoleUser,
} from "@/utils/role-helpers";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async listPermissions() {
    const permissions = await this.roleRepository.listPermissions();
    return {
      data: permissions.map(toPermissionResponse),
    };
  }

  async listRoles(query: unknown, requestingUser: AuthenticatedRoleUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw roleTenantRequiredError();
    }

    const parsed = parseListRolesQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidRolePaginationError();
      }
      throw invalidRoleFilterError();
    }

    const { page, limit, search, isSystem, sortBy, sortOrder } = parsed.payload;
    const filter = { tenantId, search, isSystem };

    const [roles, total] = await Promise.all([
      this.roleRepository.findManyFiltered({
        ...filter,
        skip: (page - 1) * limit,
        take: limit,
        sortBy,
        sortOrder,
      }),
      this.roleRepository.countFiltered(filter),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data: roles.map(toRoleListItemResponse),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getRole(id: string, requestingUser: AuthenticatedRoleUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw roleTenantRequiredError();
    }

    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw roleNotFoundError();
    }

    if (role.tenantId !== tenantId) {
      throw roleTenantMismatchError();
    }

    return {
      role: toRoleResponse(role),
      permissions: toRolePermissionCodes(role.permissions),
    };
  }

  async createRole(payload: CreateRolePayload, createdByUser: AuthenticatedRoleUser) {
    const tenantId = createdByUser.tenantId?.trim();
    if (!tenantId) {
      throw roleTenantRequiredError();
    }

    const validation = validateCreateRole(payload);
    if (!validation.valid) {
      throw roleValidationError(validation.fields);
    }

    const normalized = validation.payload;

    const existingName = await this.roleRepository.findByTenantAndName(tenantId, normalized.name);
    if (existingName) {
      throw roleNameExistsError();
    }

    const existingCode = await this.roleRepository.findByTenantAndCode(tenantId, normalized.code);
    if (existingCode) {
      throw roleCodeExistsError();
    }

    let permissionIds: string[] = [];
    if (normalized.permissions.length > 0) {
      const permissions = await this.roleRepository.findPermissionsByCodes(normalized.permissions);
      if (permissions.length !== normalized.permissions.length) {
        throw invalidPermissionError();
      }
      permissionIds = permissions.map((permission) => permission.id);
    }

    const created = await this.roleRepository.createRoleWithPermissions({
      tenantId,
      name: normalized.name,
      code: normalized.code,
      description: normalized.description,
      permissionIds,
    });

    const permissionCodes = toRolePermissionCodes(created.permissions);

    return {
      role: toRoleResponse(created),
      permissions: permissionCodes,
      message: "Role created successfully.",
    };
  }

  async updateRole(id: string, payload: UpdateRolePayload, updatedByUser: AuthenticatedRoleUser) {
    const tenantId = updatedByUser.tenantId?.trim();
    if (!tenantId) {
      throw roleTenantRequiredError();
    }

    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw roleNotFoundError();
    }

    if (role.tenantId !== tenantId) {
      throw roleTenantMismatchError();
    }

    if (role.isSystem) {
      throw systemRoleCannotBeModifiedError();
    }

    const validation = validateUpdateRole(payload);
    if (!validation.valid) {
      throw roleValidationError(validation.fields);
    }

    const normalized = validation.payload;

    if (normalized.name !== undefined && normalized.name !== role.name) {
      const existingName = await this.roleRepository.findByTenantAndName(tenantId, normalized.name);
      if (existingName && existingName.id !== role.id) {
        throw roleNameExistsError();
      }
    }

    if (normalized.code !== undefined && normalized.code !== role.code) {
      const existingCode = await this.roleRepository.findByTenantAndCode(tenantId, normalized.code);
      if (existingCode && existingCode.id !== role.id) {
        throw roleCodeExistsError();
      }
    }

    let permissionIds: string[] | undefined;
    if (normalized.permissions !== undefined) {
      if (normalized.permissions.length > 0) {
        const permissions = await this.roleRepository.findPermissionsByCodes(normalized.permissions);
        if (permissions.length !== normalized.permissions.length) {
          throw invalidPermissionError();
        }
        permissionIds = permissions.map((permission) => permission.id);
      } else {
        permissionIds = [];
      }
    }

    const updated = await this.roleRepository.updateRoleWithPermissions({
      roleId: role.id,
      name: normalized.name,
      code: normalized.code,
      description: normalized.description,
      permissionIds,
    });

    return {
      role: toRoleResponse(updated),
      permissions: toRolePermissionCodes(updated.permissions),
      message: "Role updated successfully.",
    };
  }

  async deleteRole(id: string, performedByUser: AuthenticatedRoleUser) {
    const tenantId = performedByUser.tenantId?.trim();
    if (!tenantId) {
      throw roleTenantRequiredError();
    }

    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw roleNotFoundError();
    }

    if (role.tenantId !== tenantId) {
      throw roleTenantMismatchError("You cannot delete roles from another tenant.");
    }

    if (role.isSystem) {
      throw systemRoleCannotBeDeletedError();
    }

    const assignedUsers = await this.roleRepository.countUsersAssignedToRole(role.id);
    if (assignedUsers > 0) {
      throw roleAssignedToUsersError();
    }

    await this.roleRepository.deleteRole(role.id);

    return {
      message: "Role deleted successfully.",
    };
  }
}
