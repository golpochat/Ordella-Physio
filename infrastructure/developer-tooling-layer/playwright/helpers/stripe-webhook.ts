import Stripe from "stripe";

export type StripeEventType =
  | "checkout.session.completed"
  | "invoice.payment_failed"
  | "invoice.paid"
  | "invoice.created"
  | "invoice.finalized"
  | "invoice.upcoming"
  | "customer.subscription.updated"
  | "customer.subscription.deleted";

function uniqueId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function signStripeWebhookPayload(payload: string, secret: string): string {
  return Stripe.webhooks.generateTestHeaderString({
    payload,
    secret,
  });
}

export function buildCheckoutSessionCompletedEvent(input: {
  tenantId: string;
  customerId: string;
  subscriptionId?: string;
  organizationId?: string;
}) {
  const metadata: Record<string, string> = {
    tenantId: input.tenantId,
    plan: "pro",
  };
  if (input.organizationId) {
    metadata.organizationId = input.organizationId;
  }

  return {
    id: uniqueId("evt_checkout"),
    object: "event",
    type: "checkout.session.completed",
    data: {
      object: {
        id: uniqueId("cs"),
        object: "checkout.session",
        mode: "subscription",
        customer: input.customerId,
        client_reference_id: input.tenantId,
        subscription: input.subscriptionId ?? uniqueId("sub"),
        metadata,
      },
    },
  };
}

export function buildSubscriptionUpdatedEvent(input: {
  tenantId?: string;
  organizationId?: string;
  customerId: string;
  subscriptionId: string;
  status: "active" | "past_due" | "canceled" | "trialing";
  plan?: string;
}) {
  const metadata: Record<string, string> = {
    plan: input.plan ?? "PROFESSIONAL",
  };
  if (input.tenantId) {
    metadata.tenantId = input.tenantId;
  }
  if (input.organizationId) {
    metadata.organizationId = input.organizationId;
  }

  const now = Math.floor(Date.now() / 1000);

  return {
    id: uniqueId("evt_sub"),
    object: "event",
    type: "customer.subscription.updated",
    data: {
      object: {
        id: input.subscriptionId,
        object: "subscription",
        status: input.status,
        customer: input.customerId,
        metadata,
        current_period_start: now,
        current_period_end: now + 2_592_000,
        cancel_at_period_end: input.status === "canceled",
        canceled_at: input.status === "canceled" ? now : null,
        items: {
          data: [
            {
              id: uniqueId("si"),
              price: { id: process.env.STRIPE_PRICE_PRO ?? "price_test_pro" },
            },
          ],
        },
      },
    },
  };
}

export function buildSubscriptionDeletedEvent(input: {
  tenantId?: string;
  organizationId?: string;
  customerId: string;
  subscriptionId: string;
}) {
  const metadata: Record<string, string> = { plan: "PROFESSIONAL" };
  if (input.tenantId) metadata.tenantId = input.tenantId;
  if (input.organizationId) metadata.organizationId = input.organizationId;

  const now = Math.floor(Date.now() / 1000);

  return {
    id: uniqueId("evt_sub_del"),
    object: "event",
    type: "customer.subscription.deleted",
    data: {
      object: {
        id: input.subscriptionId,
        object: "subscription",
        status: "canceled",
        customer: input.customerId,
        metadata,
        current_period_start: now,
        current_period_end: now + 2_592_000,
        cancel_at_period_end: true,
        canceled_at: now,
        items: { data: [] },
      },
    },
  };
}

export function buildInvoicePaymentFailedEvent(input: {
  customerId: string;
  subscriptionId: string;
}) {
  return {
    id: uniqueId("evt_inv_fail"),
    object: "event",
    type: "invoice.payment_failed",
    data: {
      object: {
        id: uniqueId("in_fail"),
        object: "invoice",
        customer: input.customerId,
        subscription: input.subscriptionId,
        status: "open",
        amount_due: 4900,
        amount_paid: 0,
        currency: "gbp",
      },
    },
  };
}

export function buildInvoicePaidEvent(input: {
  customerId: string;
  subscriptionId: string;
}) {
  return {
    id: uniqueId("evt_inv_paid"),
    object: "event",
    type: "invoice.paid",
    data: {
      object: {
        id: uniqueId("in_paid"),
        object: "invoice",
        customer: input.customerId,
        subscription: input.subscriptionId,
        status: "paid",
        amount_due: 4900,
        amount_paid: 4900,
        currency: "gbp",
      },
    },
  };
}

export function buildInvoiceWithAiNotesEvent(input: {
  customerId: string;
  subscriptionId: string;
  aiNotesPriceId: string;
  quantity: number;
  tenantId: string;
}) {
  const lineId = uniqueId("il_ai");
  return {
    id: uniqueId("evt_inv_ai"),
    object: "event",
    type: "invoice.created",
    data: {
      object: {
        id: uniqueId("in_ai"),
        object: "invoice",
        customer: input.customerId,
        subscription: input.subscriptionId,
        status: "draft",
        amount_due: input.quantity * 150,
        amount_paid: 0,
        currency: "gbp",
        lines: {
          data: [
            {
              id: lineId,
              object: "line_item",
              amount: input.quantity * 150,
              quantity: input.quantity,
              price: { id: input.aiNotesPriceId },
              metadata: { usageType: "ai_notes", tenantId: input.tenantId },
            },
          ],
        },
      },
    },
  };
}

export function buildInvoiceUpcomingEvent(input: {
  customerId: string;
  subscriptionId: string;
  aiNotesPriceId: string;
  quantity: number;
  tenantId: string;
}) {
  const lineId = uniqueId("il_upcoming_ai");
  return {
    id: uniqueId("evt_inv_upcoming"),
    object: "event",
    type: "invoice.upcoming",
    data: {
      object: {
        id: uniqueId("in_upcoming"),
        object: "invoice",
        customer: input.customerId,
        subscription: input.subscriptionId,
        status: "draft",
        amount_due: input.quantity * 150,
        amount_paid: 0,
        currency: "gbp",
        lines: {
          data: [
            {
              id: lineId,
              object: "line_item",
              amount: input.quantity * 150,
              quantity: input.quantity,
              price: { id: input.aiNotesPriceId },
              metadata: { usageType: "ai_notes", tenantId: input.tenantId },
            },
          ],
        },
      },
    },
  };
}

export async function postSignedWebhook(
  gatewayUrl: string,
  event: Record<string, unknown>,
  webhookSecret: string,
): Promise<Response> {
  const payload = JSON.stringify(event);
  const signature = signStripeWebhookPayload(payload, webhookSecret);

  return fetch(`${gatewayUrl}/billing/webhook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "stripe-signature": signature,
    },
    body: payload,
  });
}

export async function triggerStripeCli(eventType: string): Promise<void> {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const exec = promisify(execFile);

  try {
    await exec("stripe", ["trigger", eventType], { timeout: 30_000 });
  } catch (error) {
    console.warn(`[billing-e2e] stripe trigger ${eventType} skipped:`, error);
  }
}
