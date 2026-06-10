import type { createApiClient } from "@/lib/api-client";
import type {
  AiGenerateNoteRequest,
  AiGenerateNoteResponse,
  AiSummarizeResponse,
  AiTreatmentPlanResponse,
  AiTranscribeResponse,
} from "@/lib/ai-notes-types";

export type AiNotesApiClient = ReturnType<typeof createApiClient>;

export function createAiNotesApi(api: AiNotesApiClient) {
  return {
    generateNote(payload: AiGenerateNoteRequest) {
      return api.post<AiGenerateNoteResponse>("ai", "/notes/generate", payload);
    },

    summarizeAppointment(payload: Omit<AiGenerateNoteRequest, "rawText">) {
      return api.post<AiSummarizeResponse>("ai", "/notes/summarize", payload);
    },

    suggestTreatmentPlan(payload: AiGenerateNoteRequest) {
      return api.post<AiTreatmentPlanResponse>("ai", "/notes/treatment-plan", payload);
    },

    acceptOutput(outputId: string, accepted: boolean) {
      return api.post<{ outputId: string; accepted: boolean }>("ai", "/notes/accept", {
        outputId,
        accepted,
      });
    },

    async transcribeAndGenerate(
      payload: AiGenerateNoteRequest,
      audio: Blob,
      filename: string,
      headers?: Record<string, string>,
    ) {
      const form = new FormData();
      form.append("audio", audio, filename);
      form.append("patientId", payload.patientId);
      form.append("therapistId", payload.therapistId);
      if (payload.appointmentId) form.append("appointmentId", payload.appointmentId);
      if (payload.rawText) form.append("rawText", payload.rawText);

      const response = await fetch("/api/ai/notes/transcribe", {
        method: "POST",
        body: form,
        credentials: "include",
        headers,
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error((data as { message?: string } | null)?.message ?? "Transcription failed");
      }

      return data as AiTranscribeResponse;
    },
  };
}
