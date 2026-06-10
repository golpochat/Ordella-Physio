import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const tenantCreatedPayloadSchema = z.object({
  tenantId: z.string().min(1),
  name: z.string().min(1),
});

export const TENANT_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.TENANT_CREATED,
    domain: "tenant",
    version: 1,
    schemaId: "tenant.created.v1",
    payloadSchema: tenantCreatedPayloadSchema,
  },
];
