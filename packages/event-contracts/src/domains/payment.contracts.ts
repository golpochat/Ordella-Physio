import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const paymentSucceededPayloadSchema = z.object({
  paymentId: z.string().min(1),
  tenantId: z.string().min(1),
  invoiceId: z.string().min(1),
});

export const PAYMENT_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.PAYMENT_SUCCEEDED,
    domain: "payment",
    version: 1,
    schemaId: "payment.succeeded.v1",
    payloadSchema: paymentSucceededPayloadSchema,
  },
];
