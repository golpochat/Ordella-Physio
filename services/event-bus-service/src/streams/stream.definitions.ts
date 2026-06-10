import { DOMAIN_STREAM_NAMES } from "@/constants";
import { AUTH_STREAM_SUBJECTS } from "@/streams/subjects/auth.subjects";
import { TENANT_STREAM_SUBJECTS } from "@/streams/subjects/tenant.subjects";
import { PATIENT_STREAM_SUBJECTS } from "@/streams/subjects/patient.subjects";
import { APPOINTMENT_STREAM_SUBJECTS } from "@/streams/subjects/appointment.subjects";
import { NOTES_STREAM_SUBJECTS } from "@/streams/subjects/notes.subjects";
import { BILLING_STREAM_SUBJECTS } from "@/streams/subjects/billing.subjects";
import { PAYMENT_STREAM_SUBJECTS } from "@/streams/subjects/payment.subjects";
import { COMMUNICATION_STREAM_SUBJECTS } from "@/streams/subjects/communication.subjects";
import { REPORTING_STREAM_SUBJECTS } from "@/streams/subjects/reporting.subjects";
import { DEAD_LETTER_STREAM_CONFIG } from "@/streams/stream.config";
import type { DomainStreamDefinition } from "@/nats/nats-stream-builder";

export const DOMAIN_STREAM_DEFINITIONS: DomainStreamDefinition[] = [
  { name: DOMAIN_STREAM_NAMES.AUTH, subjects: [...AUTH_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.TENANT, subjects: [...TENANT_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.PATIENT, subjects: [...PATIENT_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.APPOINTMENT, subjects: [...APPOINTMENT_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.NOTES, subjects: [...NOTES_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.BILLING, subjects: [...BILLING_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.PAYMENT, subjects: [...PAYMENT_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.COMMUNICATION, subjects: [...COMMUNICATION_STREAM_SUBJECTS] },
  { name: DOMAIN_STREAM_NAMES.REPORTING, subjects: [...REPORTING_STREAM_SUBJECTS] },
  { name: DEAD_LETTER_STREAM_CONFIG.name, subjects: [...DEAD_LETTER_STREAM_CONFIG.subjects] },
];
