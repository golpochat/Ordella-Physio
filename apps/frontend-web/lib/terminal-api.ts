import type { createApiClient } from "@/lib/api-client";
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

type TerminalApiClient = ReturnType<typeof createApiClient>;

export type PosSession = {
  id: string;
  tenantId: string;
  terminalId: string;
  operatorId: string;
  status: "OPEN" | "CLOSED" | "RECONCILED";
  openingCash: number;
  closingCash?: number | null;
  expectedTotal?: number | null;
  actualTotal?: number | null;
  variance?: number | null;
  openedAt: string;
  closedAt?: string | null;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    stripeIntentId?: string | null;
  }>;
};

export type PairingCodeResponse = {
  code: string;
  expiresAt: string;
  terminalId: string;
};

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

    generatePairingCode(terminalId: string) {
      return api.post<PairingCodeResponse>("terminal", `/${terminalId}/pairing-code`);
    },

    openPosSession(payload: { terminalId: string; openingCash?: number }) {
      return api.post<PosSession>("terminal", "/pos/sessions/open", payload);
    },

    getPosSession(sessionId: string) {
      return api.get<PosSession>("terminal", `/pos/sessions/${sessionId}`);
    },

    addPosItem(
      sessionId: string,
      payload: { description: string; quantity: number; unitPrice: number },
    ) {
      return api.post("terminal", `/pos/sessions/${sessionId}/items`, payload);
    },

    createPosPaymentIntent(sessionId: string) {
      return api.post<{ payment: PosSession["payments"][0]; clientSecret?: string }>(
        "terminal",
        `/pos/sessions/${sessionId}/payment-intent`,
      );
    },

    closePosSession(sessionId: string, payload: { closingCash: number }) {
      return api.post<PosSession>("terminal", `/pos/sessions/${sessionId}/close`, payload);
    },
  };
}
