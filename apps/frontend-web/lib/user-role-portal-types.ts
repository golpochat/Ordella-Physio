export type ClinicPermission = {
  id: string;
  code: string;
  description: string | null;
};

export type ClinicPermissionListResponse = {
  data: ClinicPermission[];
};

export type ClinicRole = {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  description: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateClinicRolePayload = {
  name: string;
  code: string;
  description?: string;
  permissions?: string[];
};

export type CreateClinicRoleResponse = {
  role: ClinicRole;
  permissions: string[];
  message: string;
};

export type ClinicRoleDetailResponse = {
  role: ClinicRole;
  permissions: string[];
};

export type UpdateClinicRolePayload = {
  name?: string;
  code?: string;
  description?: string | null;
  permissions?: string[];
};

export type UpdateClinicRoleResponse = {
  role: ClinicRole;
  permissions: string[];
  message: string;
};

export type ClinicRoleListItem = ClinicRole & {
  permissionsCount: number;
};

export type ClinicRoleListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  isSystem?: boolean;
  sortBy?: "createdAt" | "name" | "code" | "isSystem" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export type ClinicRoleListResponse = {
  data: ClinicRoleListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type DeleteClinicRoleResponse = {
  message: string;
};
