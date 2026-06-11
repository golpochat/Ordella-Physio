"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createTerminalApi } from "@/lib/terminal-api";
import type {
  ClinicTerminalListFilters,
  ClinicTerminalStatusActionResponse,
  CreateClinicTerminalPayload,
  UpdateClinicTerminalPayload,
} from "@/lib/terminal-portal-types";

export function useTerminalApi() {
  const api = useApi();
  return useMemo(() => createTerminalApi(api), [api]);
}

function requireTerminalApi(api: ReturnType<typeof createTerminalApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function useClinicTerminalsList(filters: ClinicTerminalListFilters = {}) {
  const terminalApi = useTerminalApi();

  return useQuery({
    queryKey: ["clinic", "terminals", "list", filters],
    queryFn: () => requireTerminalApi(terminalApi).listTerminals(filters),
    enabled: Boolean(terminalApi),
  });
}

export function useCreateClinicTerminal() {
  const terminalApi = useTerminalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicTerminalPayload) =>
      requireTerminalApi(terminalApi).createTerminal(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "terminals"] }),
  });
}

export function useClinicTerminal(terminalId: string) {
  const terminalApi = useTerminalApi();

  return useQuery({
    queryKey: ["clinic", "terminals", terminalId],
    queryFn: () => requireTerminalApi(terminalApi).getTerminal(terminalId),
    enabled: Boolean(terminalApi && terminalId),
  });
}

export function useUpdateClinicTerminal(terminalId: string) {
  const terminalApi = useTerminalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicTerminalPayload) =>
      requireTerminalApi(terminalApi).updateTerminal(terminalId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "terminals"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "terminals", terminalId] });
    },
  });
}

export function useDeactivateClinicTerminal(terminalId: string) {
  const terminalApi = useTerminalApi();
  const queryClient = useQueryClient();

  return useMutation<ClinicTerminalStatusActionResponse>({
    mutationFn: () => requireTerminalApi(terminalApi).deactivateTerminal(terminalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "terminals"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "terminals", terminalId] });
    },
  });
}

export function useActivateClinicTerminal(terminalId: string) {
  const terminalApi = useTerminalApi();
  const queryClient = useQueryClient();

  return useMutation<ClinicTerminalStatusActionResponse>({
    mutationFn: () => requireTerminalApi(terminalApi).activateTerminal(terminalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "terminals"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "terminals", terminalId] });
    },
  });
}
