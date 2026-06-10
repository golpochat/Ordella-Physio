import type { SecurityRole } from "@ordella/security";

export type AuthenticatedAiUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole | string;
  email?: string;
  permissions?: string[];
};

export const AI_DISCLAIMER =
  "AI-generated content must be reviewed by a licensed clinician before use in patient care.";

export type SoapNoteStructure = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

export type AiNoteGenerateResult = {
  soap: SoapNoteStructure;
  summary: string;
  recommendations: string[];
  disclaimer: string;
  outputId: string;
};

export type AiSummarizeResult = {
  summary: string;
  keyFindings: string[];
  disclaimer: string;
  outputId: string;
};

export type AiTreatmentPlanResult = {
  goals: string[];
  interventions: string[];
  homeExercises: string[];
  followUp: string;
  precautions: string[];
  disclaimer: string;
  outputId: string;
};

export type AiTranscribeResult = {
  transcript: string;
  disclaimer: string;
};
