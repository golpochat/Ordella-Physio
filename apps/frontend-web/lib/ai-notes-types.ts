export const AI_CLINICAL_DISCLAIMER =
  "AI-generated content must be reviewed by a licensed clinician.";

export type SoapNoteStructure = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

export type AiGenerateNoteRequest = {
  patientId: string;
  therapistId: string;
  appointmentId?: string;
  rawText?: string;
};

export type AiGenerateNoteResponse = {
  soap: SoapNoteStructure;
  summary: string;
  recommendations: string[];
  disclaimer: string;
  outputId: string;
};

export type AiSummarizeResponse = {
  summary: string;
  keyFindings: string[];
  disclaimer: string;
  outputId: string;
};

export type AiTreatmentPlanResponse = {
  goals: string[];
  interventions: string[];
  homeExercises: string[];
  followUp: string;
  precautions: string[];
  disclaimer: string;
  outputId: string;
};

export type AiTranscribeResponse = AiGenerateNoteResponse & {
  transcript: string;
};

export type AiPreviewPayload =
  | { kind: "generate"; data: AiGenerateNoteResponse }
  | { kind: "summarize"; data: AiSummarizeResponse }
  | { kind: "treatment-plan"; data: AiTreatmentPlanResponse };
