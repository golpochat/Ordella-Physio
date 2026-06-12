import type { createApiClient } from "@/lib/api-client";
import type {
  ClinicStaffConfigNamespacesResponse,
  ClinicStaffConfigNamespace,
  ClinicStaffConfigRecord,
  ClinicStaffListFilters,
  ClinicStaffListResponse,
  ClinicStaffMemberDetailResponse,
  ClinicStaffStatusActionResponse,
  CreateClinicStaffMemberPayload,
  CreateClinicStaffMemberResponse,
  UpdateClinicStaffConfigResponse,
  UpdateClinicStaffMemberPayload,
  UpdateClinicStaffMemberResponse,
} from "@/lib/clinic-staff-member-types";

type StaffMemberApiClient = ReturnType<typeof createApiClient>;

export function createClinicStaffMemberApi(api: StaffMemberApiClient) {
  return {
    listStaffMembers(params?: ClinicStaffListFilters) {
      return api.get<ClinicStaffListResponse>("staffMember", "", {
        params,
        unwrapData: false,
      });
    },

    getStaffMember(id: string) {
      return api.get<ClinicStaffMemberDetailResponse>("staffMember", `/${id}`);
    },

    createStaffMember(payload: CreateClinicStaffMemberPayload) {
      return api.post<CreateClinicStaffMemberResponse>("staffMember", "", payload);
    },

    updateStaffMember(id: string, payload: UpdateClinicStaffMemberPayload) {
      return api.put<UpdateClinicStaffMemberResponse>("staffMember", `/${id}`, payload);
    },

    deactivateStaffMember(id: string) {
      return api.post<ClinicStaffStatusActionResponse>("staffMember", `/${id}/deactivate`);
    },

    activateStaffMember(id: string) {
      return api.post<ClinicStaffStatusActionResponse>("staffMember", `/${id}/activate`);
    },

    listStaffConfigNamespaces(staffId: string) {
      return api.get<ClinicStaffConfigNamespacesResponse>("staffMember", `/${staffId}/config`);
    },

    getStaffConfig(staffId: string, namespace: ClinicStaffConfigNamespace) {
      return api.get<ClinicStaffConfigRecord>("staffMember", `/${staffId}/config/${namespace}`);
    },

    updateStaffConfig(staffId: string, namespace: ClinicStaffConfigNamespace, data: unknown) {
      return api.put<UpdateClinicStaffConfigResponse>(
        "staffMember",
        `/${staffId}/config/${namespace}`,
        { data },
      );
    },
  };
}
