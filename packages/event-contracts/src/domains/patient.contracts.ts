import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const patientCreatedPayloadSchema = z.object({
  patientId: z.string().min(1),
  tenantId: z.string().min(1),
});

export const PATIENT_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.PATIENT_CREATED,
    domain: "patient",
    version: 1,
    schemaId: "patient.created.v1",
    payloadSchema: patientCreatedPayloadSchema,
  },
];
