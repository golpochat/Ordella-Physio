import type { createApiClient } from "@/lib/api-client";
import type {
  ClinicAppointment,
  ClinicAppointmentListResponse,
  ClinicInvoice,
  ClinicNote,
  ClinicNoteListResponse,
  ClinicPatient,
  ClinicPatientListResponse,
  ClinicProfile,
  ClinicStaffMember,
  CreateClinicLocationPayload,
  CreateClinicLocationResponse,
  UpdateClinicLocationPayload,
  UpdateClinicLocationResponse,
  ClinicLocationStatusActionResponse,
  ClinicLocation,
  ClinicStripeInvoice,
  ClinicStripeSubscription,
  CancelClinicSubscriptionPayload,
  CreateClinicSubscriptionPayload,
  CreateClinicAppointmentPayload,
  CreateClinicPatientPayload,
  CreateClinicStaffPayload,
  CreateClinicUserPayload,
  CreateClinicUserResponse,
  ClinicUser,
  ClinicUserListFilters,
  ClinicUserListResponse,
  ClinicLocationListFilters,
  ClinicLocationListResponse,
  ClinicLocationConfigNamespacesResponse,
  ClinicLocationConfigRecord,
  ClinicLocationConfigNamespace,
  UpdateClinicLocationConfigResponse,
  UpdateClinicUserPayload,
  UpdateClinicUserResponse,
  ChangeClinicUserRolePayload,
  ChangeClinicUserRoleResponse,
  UpdateClinicPatientPayload,
  UpdateClinicProfilePayload,
  UpdateUserProfilePayload,
  UpdateUserProfileResponse,
  UploadAvatarResponse,
  RemoveAvatarResponse,
  UserProfile,
  UpdateClinicStaffRolePayload,
} from "@/lib/clinic-portal-types";

export type ClinicApiClient = ReturnType<typeof createApiClient>;

export function createClinicPortalApi(api: ClinicApiClient, tenantId: string) {
  const staffBase = `/${tenantId}/staff`;

  return {
    listStaff() {
      return api.get<ClinicStaffMember[]>("tenant", staffBase);
    },

    createStaff(payload: CreateClinicStaffPayload) {
      return api.post<ClinicStaffMember>("tenant", staffBase, payload);
    },

    updateStaffRole(staffId: string, payload: UpdateClinicStaffRolePayload) {
      return api.patch<ClinicStaffMember>("tenant", `${staffBase}/${staffId}`, payload);
    },

    deleteStaff(staffId: string) {
      return api.delete<void>("tenant", `${staffBase}/${staffId}`);
    },

    getStaffMember(staffId: string) {
      return api.get<ClinicStaffMember>("tenant", `${staffBase}/${staffId}`).catch(async () => {
        const list = await api.get<ClinicStaffMember[]>("tenant", staffBase);
        return (Array.isArray(list) ? list : []).find((item) => item.id === staffId) ?? null;
      });
    },

    listPatients(params?: { page?: number; limit?: number; name?: string }) {
      return api.get<ClinicPatientListResponse | ClinicPatient[]>("patient", "", { params });
    },

    getPatient(id: string) {
      return api.get<ClinicPatient>("patient", `/${id}`);
    },

    createPatient(payload: CreateClinicPatientPayload) {
      return api.post<ClinicPatient>("patient", "", payload);
    },

    updatePatient(id: string, payload: UpdateClinicPatientPayload) {
      return api.patch<ClinicPatient>("patient", `/${id}`, payload);
    },

    deletePatient(id: string) {
      return api.delete<void>("patient", `/${id}`);
    },

    listAppointments(params?: { page?: number; limit?: number }) {
      return api.get<ClinicAppointmentListResponse | ClinicAppointment[]>("appointment", "", {
        params,
      });
    },

    getAppointment(id: string) {
      return api.get<ClinicAppointment>("appointment", `/${id}`);
    },

    createAppointment(payload: CreateClinicAppointmentPayload) {
      return api.post<ClinicAppointment>("appointment", "", payload);
    },

    listLocations(params?: ClinicLocationListFilters) {
      return api.get<ClinicLocationListResponse>("tenant", `/${tenantId}/locations`, {
        params,
        unwrapData: false,
      });
    },

    createLocation(payload: CreateClinicLocationPayload) {
      return api.post<CreateClinicLocationResponse>("tenant", `/${tenantId}/locations`, payload);
    },

    getLocation(locationId: string) {
      return api.get<ClinicLocation>("tenant", `/${tenantId}/locations/${locationId}`);
    },

    updateLocation(locationId: string, payload: UpdateClinicLocationPayload) {
      return api.put<UpdateClinicLocationResponse>(
        "tenant",
        `/${tenantId}/locations/${locationId}`,
        payload,
      );
    },

    deactivateLocation(locationId: string) {
      return api.post<ClinicLocationStatusActionResponse>(
        "tenant",
        `/${tenantId}/locations/${locationId}/deactivate`,
      );
    },

    activateLocation(locationId: string) {
      return api.post<ClinicLocationStatusActionResponse>(
        "tenant",
        `/${tenantId}/locations/${locationId}/activate`,
      );
    },

    listLocationConfigNamespaces(locationId: string) {
      return api.get<ClinicLocationConfigNamespacesResponse>(
        "tenant",
        `/${tenantId}/locations/${locationId}/config`,
      );
    },

    getLocationConfig(locationId: string, namespace: ClinicLocationConfigNamespace) {
      return api.get<ClinicLocationConfigRecord>(
        "tenant",
        `/${tenantId}/locations/${locationId}/config/${namespace}`,
      );
    },

    updateLocationConfig(locationId: string, namespace: ClinicLocationConfigNamespace, data: unknown) {
      return api.put<UpdateClinicLocationConfigResponse>(
        "tenant",
        `/${tenantId}/locations/${locationId}/config/${namespace}`,
        { data },
      );
    },

    listBilling() {
      return api.get<ClinicInvoice[]>("billing", "/invoices");
    },

    getInvoice(invoiceId: string) {
      return api.get<ClinicInvoice>("billing", `/invoices/${invoiceId}`);
    },

    getSubscription() {
      return api.get<ClinicStripeSubscription>("billing", "/subscription");
    },

    listStripeInvoices() {
      return api.get<ClinicStripeInvoice[]>("billing", "/stripe-invoices");
    },

    createSubscription(payload: CreateClinicSubscriptionPayload) {
      return api.post<ClinicStripeSubscription>("billing", "/create-subscription", payload);
    },

    cancelSubscription(payload: CancelClinicSubscriptionPayload) {
      return api.post<ClinicStripeSubscription>("billing", "/cancel-subscription", payload);
    },

    createCustomerPortal(returnUrl?: string) {
      return api.post<{ url: string }>("billing", "/customer-portal", {
        returnUrl,
      });
    },

    listNotes(params?: { page?: number; limit?: number }) {
      return api.get<ClinicNoteListResponse | ClinicNote[]>("notes", "", { params });
    },

    getNote(id: string) {
      return api.get<ClinicNote>("notes", `/${id}`);
    },

    listUsers(params?: ClinicUserListFilters) {
      return api.get<ClinicUserListResponse>("auth", "/users", {
        params,
        unwrapData: false,
      });
    },

    createUser(payload: CreateClinicUserPayload) {
      return api.post<CreateClinicUserResponse>("auth", "/users", payload);
    },

    getUser(id: string) {
      return api.get<ClinicUser>("auth", `/users/${id}`);
    },

    updateUser(id: string, payload: UpdateClinicUserPayload) {
      return api.put<UpdateClinicUserResponse>("auth", `/users/${id}`, payload);
    },

    disableUser(id: string) {
      return api.post<UpdateClinicUserResponse>("auth", `/users/${id}/disable`);
    },

    activateUser(id: string) {
      return api.post<UpdateClinicUserResponse>("auth", `/users/${id}/activate`);
    },

    resetUserPassword(id: string, password: string) {
      return api.post<{ message: string }>("auth", `/users/${id}/reset-password`, { password });
    },

    changeUserRole(id: string, payload: ChangeClinicUserRolePayload) {
      return api.post<ChangeClinicUserRoleResponse>("auth", `/users/${id}/change-role`, payload);
    },

    changePassword(payload: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) {
      return api.post<{ message: string }>("auth", "/users/change-password", payload);
    },

    getProfile() {
      return api.get<UserProfile>("auth", "/users/me");
    },

    updateProfile(payload: UpdateUserProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", "/users/me", payload);
    },

    uploadAvatar(file: File) {
      const formData = new FormData();
      formData.append("avatar", file);
      return api.postForm<UploadAvatarResponse>("auth", "/users/me/avatar", formData);
    },

    removeAvatar() {
      return api.delete<RemoveAvatarResponse>("auth", "/users/me/avatar");
    },
  };
}

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function normalizeStaffList(response: ClinicStaffMember[] | undefined): ClinicStaffMember[] {
  return response ?? [];
}

export function normalizeUserList(
  response: ClinicUser[] | ClinicUserListResponse | { data: ClinicUser[] } | undefined,
): ClinicUser[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function normalizeUserListResponse(
  response: ClinicUserListResponse | ClinicUser[] | undefined,
): ClinicUserListResponse {
  if (!response) {
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    };
  }

  if (Array.isArray(response)) {
    return {
      data: response,
      pagination: {
        page: 1,
        limit: response.length,
        total: response.length,
        totalPages: response.length > 0 ? 1 : 0,
      },
    };
  }

  return response;
}
