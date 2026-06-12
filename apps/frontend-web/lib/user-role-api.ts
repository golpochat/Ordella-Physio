import type { createApiClient } from "@/lib/api-client";
import type {
  ClinicPermissionListResponse,
  ClinicRoleDetailResponse,
  ClinicRoleListFilters,
  ClinicRoleListResponse,
  CreateClinicRolePayload,
  CreateClinicRoleResponse,
  DeleteClinicRoleResponse,
  UpdateClinicRolePayload,
  UpdateClinicRoleResponse,
} from "@/lib/user-role-portal-types";

type UserRoleApiClient = ReturnType<typeof createApiClient>;

export function createUserRoleApi(api: UserRoleApiClient) {
  return {
    listRoles(params?: ClinicRoleListFilters) {
      return api.get<ClinicRoleListResponse>("userRole", "", {
        params,
        unwrapData: false,
      });
    },

    listPermissions() {
      return api.get<ClinicPermissionListResponse>("userRole", "/permissions", {
        unwrapData: false,
      });
    },

    createRole(payload: CreateClinicRolePayload) {
      return api.post<CreateClinicRoleResponse>("userRole", "", payload);
    },

    getRole(id: string) {
      return api.get<ClinicRoleDetailResponse>("userRole", `/${id}`);
    },

    updateRole(id: string, payload: UpdateClinicRolePayload) {
      return api.put<UpdateClinicRoleResponse>("userRole", `/${id}`, payload);
    },

    deleteRole(id: string) {
      return api.delete<DeleteClinicRoleResponse>("userRole", `/${id}`);
    },
  };
}
