import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const noteCreatedPayloadSchema = z.object({
  noteId: z.string().min(1),
  tenantId: z.string().min(1),
  patientId: z.string().min(1),
});

export const NOTES_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.NOTE_CREATED,
    domain: "notes",
    version: 1,
    schemaId: "note.created.v1",
    payloadSchema: noteCreatedPayloadSchema,
  },
];
