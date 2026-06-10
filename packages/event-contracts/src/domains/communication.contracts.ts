import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const notificationCreatedPayloadSchema = z.object({
  notificationId: z.string().min(1),
  tenantId: z.string().min(1),
  channel: z.string().min(1),
});

export const COMMUNICATION_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.NOTIFICATION_CREATED,
    domain: "communication",
    version: 1,
    schemaId: "notification.created.v1",
    payloadSchema: notificationCreatedPayloadSchema,
  },
];
