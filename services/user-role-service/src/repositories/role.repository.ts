import { Injectable } from "@nestjs/common";
import type { Permission, Prisma, Role } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { ListRoleSortField } from "@/models/Role";

export type RoleListFilter = {
  tenantId: string;
  search?: string;
  isSystem?: boolean;
  skip: number;
  take: number;
  sortBy: ListRoleSortField;
  sortOrder: "asc" | "desc";
};

@Injectable()
export class RoleRepository {
  constructor(private readonly database: DatabaseService) {}

  private buildWhereClause(
    filter: Pick<RoleListFilter, "tenantId" | "search" | "isSystem">,
  ): Prisma.RoleWhereInput {
    const conditions: Prisma.RoleWhereInput[] = [{ tenantId: filter.tenantId }];

    if (filter.isSystem !== undefined) {
      conditions.push({ isSystem: filter.isSystem });
    }

    if (filter.search) {
      conditions.push({
        OR: [
          { name: { contains: filter.search, mode: "insensitive" } },
          { code: { contains: filter.search, mode: "insensitive" } },
        ],
      });
    }

    return { AND: conditions };
  }

  findManyFiltered(filter: RoleListFilter) {
    return this.database.role.findMany({
      where: this.buildWhereClause(filter),
      skip: filter.skip,
      take: filter.take,
      orderBy: { [filter.sortBy]: filter.sortOrder },
      include: {
        _count: {
          select: { permissions: true },
        },
      },
    });
  }

  countFiltered(filter: Pick<RoleListFilter, "tenantId" | "search" | "isSystem">): Promise<number> {
    return this.database.role.count({
      where: this.buildWhereClause(filter),
    });
  }

  findByTenantAndName(tenantId: string, name: string): Promise<Role | null> {
    return this.database.role.findUnique({
      where: {
        tenantId_name: { tenantId, name },
      },
    });
  }

  findByTenantAndCode(tenantId: string, code: string): Promise<Role | null> {
    return this.database.role.findUnique({
      where: {
        tenantId_code: { tenantId, code },
      },
    });
  }

  findById(id: string) {
    return this.database.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: { permission: true },
          orderBy: { permission: { code: "asc" } },
        },
      },
    });
  }

  listPermissions(): Promise<Permission[]> {
    return this.database.permission.findMany({
      orderBy: { code: "asc" },
    });
  }

  findPermissionsByCodes(codes: string[]): Promise<Permission[]> {
    if (codes.length === 0) {
      return Promise.resolve([]);
    }

    return this.database.permission.findMany({
      where: { code: { in: codes } },
    });
  }

  async createRoleWithPermissions(input: {
    tenantId: string;
    name: string;
    code: string;
    description?: string;
    permissionIds: string[];
  }): Promise<Role & { permissions: Array<{ permission: Permission }> }> {
    return this.database.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          tenantId: input.tenantId,
          name: input.name,
          code: input.code,
          description: input.description ?? null,
          isSystem: false,
        },
      });

      if (input.permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: input.permissionIds.map((permissionId) => ({
            roleId: role.id,
            permissionId,
          })),
        });
      }

      return tx.role.findUniqueOrThrow({
        where: { id: role.id },
        include: {
          permissions: {
            include: { permission: true },
            orderBy: { permission: { code: "asc" } },
          },
        },
      });
    });
  }

  countUsersAssignedToRole(roleId: string): Promise<number> {
    return this.database.userRoleAssignment.count({
      where: { roleId },
    });
  }

  async deleteRole(roleId: string): Promise<void> {
    await this.database.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({ where: { roleId } });
      await tx.role.delete({ where: { id: roleId } });
    });
  }

  async updateRoleWithPermissions(input: {
    roleId: string;
    name?: string;
    code?: string;
    description?: string | null;
    permissionIds?: string[];
  }): Promise<Role & { permissions: Array<{ permission: Permission }> }> {
    return this.database.$transaction(async (tx) => {
      await tx.role.update({
        where: { id: input.roleId },
        data: {
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.code !== undefined ? { code: input.code } : {}),
          ...(input.description !== undefined ? { description: input.description } : {}),
        },
      });

      if (input.permissionIds !== undefined) {
        await tx.rolePermission.deleteMany({ where: { roleId: input.roleId } });

        if (input.permissionIds.length > 0) {
          await tx.rolePermission.createMany({
            data: input.permissionIds.map((permissionId) => ({
              roleId: input.roleId,
              permissionId,
            })),
          });
        }
      }

      return tx.role.findUniqueOrThrow({
        where: { id: input.roleId },
        include: {
          permissions: {
            include: { permission: true },
            orderBy: { permission: { code: "asc" } },
          },
        },
      });
    });
  }
}
