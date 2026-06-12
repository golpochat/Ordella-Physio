export type RoleValidationFieldError = {
  field: string;
  message: string;
};

export type CreateRolePayload = {
  name?: string;
  code?: string;
  description?: string;
  permissions?: string[];
};

export type UpdateRolePayload = {
  name?: string;
  code?: string;
  description?: string | null;
  permissions?: string[];
};

export type RoleRecord = {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  description: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ListRoleSortField = "createdAt" | "name" | "code" | "isSystem" | "updatedAt";

export type ListRolesQuery = {
  page: number;
  limit: number;
  search?: string;
  isSystem?: boolean;
  sortBy: ListRoleSortField;
  sortOrder: "asc" | "desc";
};

export type RoleListItemRecord = RoleRecord & {
  permissionsCount: number;
};
