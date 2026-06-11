"use client";

import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { createApiClient } from "@/lib/api-client";
import { getApiClientContext } from "@/lib/api-session";
import { createAiNotesApi } from "@/lib/ai-notes-api";
import type { AiGenerateNoteRequest } from "@/lib/ai-notes-types";
import { AUTHORIZATION_HEADER, TENANT_HEADER } from "@/lib/constants";
import { isSystemUser } from "@/lib/auth/roleRedirect";
import { resolveUserRoles } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

function useAiNotesApi() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);

  return useMemo(
    () => createAiNotesApi(createApiClient(() => getApiClientContext())),
    [accessToken, user?.role, user?.roles, user?.tenantId],
  );
}

export function useAiGenerateNote() {
  const api = useAiNotesApi();
  return useMutation({
    mutationFn: (payload: AiGenerateNoteRequest) => api.generateNote(payload),
  });
}

export function useAiSummarizeAppointment() {
  const api = useAiNotesApi();
  return useMutation({
    mutationFn: (payload: Omit<AiGenerateNoteRequest, "rawText">) =>
      api.summarizeAppointment(payload),
  });
}

export function useAiTreatmentPlan() {
  const api = useAiNotesApi();
  return useMutation({
    mutationFn: (payload: AiGenerateNoteRequest) => api.suggestTreatmentPlan(payload),
  });
}

export function useAiAcceptOutput() {
  const api = useAiNotesApi();
  return useMutation({
    mutationFn: ({ outputId, accepted }: { outputId: string; accepted: boolean }) =>
      api.acceptOutput(outputId, accepted),
  });
}

export function useAiTranscribeNote() {
  const api = useAiNotesApi();
  const session = useAuthStore((s) => ({
    accessToken: s.accessToken,
    user: s.user,
  }));

  return useMutation({
    mutationFn: ({
      payload,
      audio,
      filename,
    }: {
      payload: AiGenerateNoteRequest;
      audio: Blob;
      filename: string;
    }) => {
      const roles = session.user ? resolveUserRoles(session.user) : [];
      const tenantId = isSystemUser(roles) ? null : session.user?.tenantId;
      const headers: Record<string, string> = {};

      if (session.accessToken) {
        headers[AUTHORIZATION_HEADER] = `Bearer ${session.accessToken}`;
      }

      if (tenantId) {
        headers[TENANT_HEADER] = tenantId;
      }

      return api.transcribeAndGenerate(payload, audio, filename, headers);
    },
  });
}
