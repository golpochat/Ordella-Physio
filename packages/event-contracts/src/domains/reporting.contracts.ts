import { EVENT_TYPES } from "@ordella/shared";
import { z } from "zod";
import type { EventContract } from "../core/event-contract";

const metricsGeneratedPayloadSchema = z.object({
  tenantId: z.string().min(1),
  metricType: z.string().min(1),
  periodStart: z.string().min(1),
  periodEnd: z.string().min(1),
});

export const REPORTING_EVENT_CONTRACTS: EventContract[] = [
  {
    eventName: EVENT_TYPES.METRICS_GENERATED,
    domain: "reporting",
    version: 1,
    schemaId: "metrics.generated.v1",
    payloadSchema: metricsGeneratedPayloadSchema,
  },
];
