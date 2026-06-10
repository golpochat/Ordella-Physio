import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const userCreatedPayloadSchema = z.object({
  userId: z.string().min(1),
  tenantId: z.string().min(1),
  email: z.string().email(),
});

export const AUTH_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.USER_CREATED,
    domain: "auth",
    version: 1,
    schemaId: "auth.user.created.v1",
    payloadSchema: userCreatedPayloadSchema,
  },
];
