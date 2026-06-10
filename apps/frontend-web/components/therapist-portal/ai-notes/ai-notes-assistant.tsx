"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AiPreviewModal } from "@/components/therapist-portal/ai-notes/ai-preview-modal";
import {
  useAiAcceptOutput,
  useAiGenerateNote,
  useAiSummarizeAppointment,
  useAiTranscribeNote,
  useAiTreatmentPlan,
} from "@/hooks/useAiNotes";
import type { AiPreviewPayload } from "@/lib/ai-notes-types";

export type AiNotesAssistantProps = {
  patientId: string;
  therapistId: string;
  appointmentId?: string;
  rawText?: string;
  onInsertContent: (content: string, noteType?: "SOAP" | "GENERAL") => void;
  showSummarize?: boolean;
  showTreatmentPlan?: boolean;
};

function soapToContent(soap: {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}) {
  return [
    "SOAP NOTE",
    "",
    "Subjective:",
    soap.subjective,
    "",
    "Objective:",
    soap.objective,
    "",
    "Assessment:",
    soap.assessment,
    "",
    "Plan:",
    soap.plan,
  ].join("\n");
}

function treatmentPlanToContent(data: {
  goals: string[];
  interventions: string[];
  homeExercises: string[];
  followUp: string;
  precautions: string[];
}) {
  return [
    "TREATMENT PLAN",
    "",
    "Goals:",
    ...data.goals.map((g) => `- ${g}`),
    "",
    "Interventions:",
    ...data.interventions.map((g) => `- ${g}`),
    "",
    "Home exercises:",
    ...data.homeExercises.map((g) => `- ${g}`),
    "",
    `Follow-up: ${data.followUp}`,
    "",
    "Precautions:",
    ...data.precautions.map((g) => `- ${g}`),
  ].join("\n");
}

export function AiNotesAssistant({
  patientId,
  therapistId,
  appointmentId,
  rawText,
  onInsertContent,
  showSummarize = false,
  showTreatmentPlan = true,
}: AiNotesAssistantProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState<AiPreviewPayload | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const generateNote = useAiGenerateNote();
  const summarize = useAiSummarizeAppointment();
  const treatmentPlan = useAiTreatmentPlan();
  const transcribe = useAiTranscribeNote();
  const acceptOutput = useAiAcceptOutput();

  const basePayload = { patientId, therapistId, appointmentId, rawText };

  const handleGenerate = () => {
    setModalOpen(true);
    setPreview(null);
    setLoadingMessage("AI is generating…");
    generateNote.mutate(basePayload, {
      onSuccess: (data) => {
        setPreview({ kind: "generate", data });
        setLoadingMessage(undefined);
      },
      onError: () => {
        toast.error("Failed to generate AI note");
        setModalOpen(false);
        setLoadingMessage(undefined);
      },
    });
  };

  const handleSummarize = () => {
    setModalOpen(true);
    setPreview(null);
    setLoadingMessage("Preparing clinical summary…");
    summarize.mutate(
      { patientId, therapistId, appointmentId },
      {
        onSuccess: (data) => {
          setPreview({ kind: "summarize", data });
          setLoadingMessage(undefined);
        },
        onError: () => {
          toast.error("Failed to summarize appointment");
          setModalOpen(false);
          setLoadingMessage(undefined);
        },
      },
    );
  };

  const handleTreatmentPlan = () => {
    setModalOpen(true);
    setPreview(null);
    setLoadingMessage("Building treatment plan…");
    treatmentPlan.mutate(basePayload, {
      onSuccess: (data) => {
        setPreview({ kind: "treatment-plan", data });
        setLoadingMessage(undefined);
      },
      onError: () => {
        toast.error("Failed to suggest treatment plan");
        setModalOpen(false);
        setLoadingMessage(undefined);
      },
    });
  };

  const handleAccept = useCallback(() => {
    if (!preview) return;

    const outputId = preview.data.outputId;
    acceptOutput.mutate({ outputId, accepted: true });

    if (preview.kind === "generate") {
      onInsertContent(soapToContent(preview.data.soap), "SOAP");
    } else if (preview.kind === "summarize") {
      const findings = preview.data.keyFindings.map((f) => `- ${f}`).join("\n");
      onInsertContent(
        ["APPOINTMENT SUMMARY", "", preview.data.summary, "", "Key findings:", findings].join("\n"),
      );
    } else {
      onInsertContent(treatmentPlanToContent(preview.data));
    }

    setModalOpen(false);
    setPreview(null);
    toast.success("AI content inserted — please review before saving");
  }, [acceptOutput, onInsertContent, preview]);

  const handleReject = useCallback(() => {
    if (preview?.data.outputId) {
      acceptOutput.mutate({ outputId: preview.data.outputId, accepted: false });
    }
    setModalOpen(false);
    setPreview(null);
  }, [acceptOutput, preview]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setModalOpen(true);
        setPreview(null);
        setLoadingMessage("Transcribing speech and generating note…");
        transcribe.mutate(
          { payload: basePayload, audio: blob, filename: "recording.webm" },
          {
            onSuccess: (data) => {
              setPreview({ kind: "generate", data });
              setLoadingMessage(undefined);
            },
            onError: () => {
              toast.error("Voice-to-note failed");
              setModalOpen(false);
              setLoadingMessage(undefined);
            },
          },
        );
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      toast.error("Microphone access is required for voice-to-note");
    }
  };

  const isBusy =
    generateNote.isPending ||
    summarize.isPending ||
    treatmentPlan.isPending ||
    transcribe.isPending;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" disabled={isBusy || !patientId} onClick={handleGenerate}>
          Generate AI Note
        </Button>
        {showSummarize ? (
          <Button type="button" variant="outline" disabled={isBusy || !patientId} onClick={handleSummarize}>
            Summarize Appointment
          </Button>
        ) : null}
        {showTreatmentPlan ? (
          <Button
            type="button"
            variant="outline"
            disabled={isBusy || !patientId}
            onClick={handleTreatmentPlan}
          >
            Suggest Treatment Plan
          </Button>
        ) : null}
        <Button
          type="button"
          variant="outline"
          disabled={isBusy || !patientId}
          onClick={() => void toggleRecording()}
        >
          {isRecording ? "Stop recording" : "Voice to note"}
        </Button>
      </div>

      <AiPreviewModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        preview={preview}
        isLoading={Boolean(loadingMessage)}
        loadingMessage={loadingMessage}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </>
  );
}
