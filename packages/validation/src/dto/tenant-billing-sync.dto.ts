import { z } from "zod";
import { idSchema } from "../zod/base-schemas";

export const tenantBillingSyncSchema = z.object({
  tenantId: idSchema,
  stripeCustomerId: z.string().min(1),
  stripeSubscriptionId: z.string().optional().nullable(),
  plan: z.string().optional(),
  subscriptionStatus: z.string().optional(),
});

export type TenantBillingSyncInput = z.infer<typeof tenantBillingSyncSchema>;
