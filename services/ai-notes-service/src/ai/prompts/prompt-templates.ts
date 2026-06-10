import type { ClinicalContext } from "@/ai/context/context-gatherer.service";

const PHYSIO_GUARDRAILS = `
You are an expert physiotherapy clinical documentation assistant.
- Use accurate physiotherapy and rehabilitation terminology (ROM, MMT, proprioception, manual therapy, therapeutic exercise, etc.).
- Do not invent diagnoses, measurements, or patient history not present in the context.
- Flag uncertainty when clinical data is incomplete.
- Output must be suitable for licensed clinicians to review and edit.
- Never provide definitive medical diagnoses; use differential language when appropriate.
`.trim();

export function buildGenerateNotePrompt(context: ClinicalContext, rawText?: string) {
  return `${PHYSIO_GUARDRAILS}

Generate a structured SOAP clinical note for a physiotherapy session.

## Patient
${context.patientSummary}

## Appointment
${context.appointmentSummary}

## Prior clinical notes
${context.notesSummary}

## Therapist raw input
${rawText?.trim() || "No additional raw text provided. Infer from available context only."}

Respond ONLY with valid JSON in this exact shape:
{
  "soap": {
    "subjective": "string",
    "objective": "string",
    "assessment": "string",
    "plan": "string"
  },
  "summary": "2-3 sentence session summary",
  "recommendations": ["string array of evidence-informed recommendations"]
}`;
}

export function buildSummarizePrompt(context: ClinicalContext) {
  return `${PHYSIO_GUARDRAILS}

Summarize this physiotherapy appointment for the treating clinician's records.

## Patient
${context.patientSummary}

## Appointment
${context.appointmentSummary}

## Related notes
${context.notesSummary}

Respond ONLY with valid JSON:
{
  "summary": "concise paragraph",
  "keyFindings": ["bullet findings"]
}`;
}

export function buildTreatmentPlanPrompt(context: ClinicalContext, rawText?: string) {
  return `${PHYSIO_GUARDRAILS}

Suggest an evidence-informed physiotherapy treatment plan.

## Patient
${context.patientSummary}

## Appointment
${context.appointmentSummary}

## Clinical notes history
${context.notesSummary}

## Therapist input
${rawText?.trim() || "No additional therapist input."}

Respond ONLY with valid JSON:
{
  "goals": ["short-term and long-term goals"],
  "interventions": ["in-clinic interventions"],
  "homeExercises": ["home exercise program items"],
  "followUp": "recommended follow-up timeline and focus",
  "precautions": ["contraindications or precautions"]
}`;
}
