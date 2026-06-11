import type { createApiClient } from "@/lib/api-client";

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
  return {
    listTerminals(params?: ClinicTerminalListFilters) {
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
