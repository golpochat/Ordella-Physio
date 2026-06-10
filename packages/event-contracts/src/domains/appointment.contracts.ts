import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const appointmentCreatedPayloadSchema = z.object({
  appointmentId: z.string().min(1),
  tenantId: z.string().min(1),
  patientId: z.string().min(1),
});

export const APPOINTMENT_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.APPOINTMENT_CREATED,
    domain: "appointment",
    version: 1,
    schemaId: "appointment.created.v1",
    payloadSchema: appointmentCreatedPayloadSchema,
  },
];
