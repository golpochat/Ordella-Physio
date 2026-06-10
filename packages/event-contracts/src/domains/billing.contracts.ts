import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const invoiceCreatedPayloadSchema = z.object({
  invoiceId: z.string().min(1),
  tenantId: z.string().min(1),
  patientId: z.string().min(1),
});

export const BILLING_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.INVOICE_CREATED,
    domain: "billing",
    version: 1,
    schemaId: "invoice.created.v1",
    payloadSchema: invoiceCreatedPayloadSchema,
  },
];
