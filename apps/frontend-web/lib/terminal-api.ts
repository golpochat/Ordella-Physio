import type { createApiClient } from "@/lib/api-client";
import { isClinicBackendClient } from "@/lib/clinic-backend-normalize";

type TerminalApiClient = ReturnType<typeof createApiClient>;
import type {
  ClinicTerminal,
  ClinicTerminalListFilters,
  ClinicTerminalListResponse,
  ClinicTerminalStatusActionResponse,
  CreateClinicTerminalPayload,
  CreateClinicTerminalResponse,
  UpdateClinicTerminalPayload,
  UpdateClinicTerminalResponse,
} from "@/lib/terminal-portal-types";

export function createTerminalApi(api: TerminalApiClient) {
  const emptyList = (): ClinicTerminalListResponse => ({
    data: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
  });

  return {
    listTerminals(params?: ClinicTerminalListFilters) {
      if (isClinicBackendClient()) {
        return Promise.resolve(emptyList());
      }

      return api.get<ClinicTerminalListResponse>("terminal", "", {
        params,
        unwrapData: false,
      });
    },

    createTerminal(payload: CreateClinicTerminalPayload) {
      return api.post<CreateClinicTerminalResponse>("terminal", "", payload);
    },

    getTerminal(id: string) {
      return api.get<ClinicTerminal>("terminal", `/${id}`);
    },

    updateTerminal(id: string, payload: UpdateClinicTerminalPayload) {
      return api.put<UpdateClinicTerminalResponse>("terminal", `/${id}`, payload);
    },

    deactivateTerminal(id: string) {
      return api.post<ClinicTerminalStatusActionResponse>("terminal", `/${id}/deactivate`);
    },

    activateTerminal(id: string) {
      return api.post<ClinicTerminalStatusActionResponse>("terminal", `/${id}/activate`);
    },
  };
}
