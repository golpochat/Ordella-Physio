import { createHmac } from "node:crypto";
import type { Page } from "@playwright/test";
import Stripe from "stripe";
import {
  buildCheckoutSessionCompletedEvent,
  buildInvoicePaymentFailedEvent,
  buildInvoicePaidEvent,
  buildInvoiceWithAiNotesEvent,
  buildInvoiceUpcomingEvent,
  buildSubscriptionDeletedEvent,
  buildSubscriptionUpdatedEvent,
  postSignedWebhook,
} from "./stripe-webhook";

export const BILLING_E2E_CONFIG = {
  gatewayUrl: process.env.API_GATEWAY_URL ?? "http://localhost:3049",
  frontendUrl: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3010",
  webhookSecret:
    process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_local_dev_stripe_webhook_secret",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  aiNotesPriceId: process.env.STRIPE_PRICE_AI_NOTES ?? "",
  superAdminEmail: process.env.TEST_SUPER_ADMIN_EMAIL ?? "superadmin@ordella.dev",
  superAdminPassword: process.env.TEST_SUPER_ADMIN_PASSWORD ?? "SuperAdmin123!",
  superAdminTenantId: process.env.TEST_TENANT_ID ?? "demo-tenant",
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  tenantId: string;
  userId?: string;
  email: string;
  role?: string;
};

export type ProvisionedWorkspace = {
  organizationId: string;
  tenantId: string;
  tenantName: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerAuth: AuthSession;
  billingModel: "tenant-level" | "organization-level";
};

export type BillingContext = {
  billingModel: string;
  subscriptionStatus: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  aiNotesUsageCount: number;
  canManageBillingAtTenant: boolean;
  organizationName?: string | null;
};

function uniqueSuffix(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type AuthResponseBody = {
  accessToken: string;
  refreshToken?: string;
  user?: { id: string; email: string; role?: string; roles?: string[] };
};

function unwrapGatewayBody<T>(body: unknown): T {
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

function parseAuthResponse(body: unknown): AuthSession {
  const payload = unwrapGatewayBody<AuthResponseBody>(body);
  if (!payload.accessToken || !payload.user?.id) {
    throw new Error("Auth response missing accessToken or user.id");
  }

  return {
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    tenantId: "",
    userId: payload.user.id,
    email: payload.user.email,
    role: payload.user.role ?? payload.user.roles?.[0],
  };
}

export function billingE2eReady(): boolean {
  return Boolean(BILLING_E2E_CONFIG.webhookSecret);
}

export function stripeApiReady(): boolean {
  const key = BILLING_E2E_CONFIG.stripeSecretKey;
  if (!key || !BILLING_E2E_CONFIG.webhookSecret) {
    return false;
  }
  return !key.includes("local_dev") && !key.includes("change-me");
}

export async function waitForGateway(timeoutMs = 30_000): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/health`);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }
  throw new Error(
    `API gateway not reachable at ${BILLING_E2E_CONFIG.gatewayUrl}. Start docker compose dev stack.`,
  );
}

export async function loginUser(input: {
  tenantId: string;
  email: string;
  password: string;
}): Promise<AuthSession> {
  const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": input.tenantId,
    },
    body: JSON.stringify({ email: input.email, password: input.password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed (${response.status}): ${await response.text()}`);
  }

  const session = parseAuthResponse(await response.json());
  return { ...session, tenantId: input.tenantId };
}

export async function registerUser(input: {
  tenantId: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthSession> {
  const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": input.tenantId,
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      role: input.role ?? "OWNER",
    }),
  });

  if (!response.ok && response.status !== 409) {
    throw new Error(`Register failed (${response.status}): ${await response.text()}`);
  }

  return loginUser(input);
}

function signBrowserSessionCookie(payload: {
  user: { id: string; role: string; tenantId: string; roles: string[] };
}): string {
  const secret =
    process.env.SESSION_COOKIE_SECRET ?? "dev-session-cookie-secret-min-32-chars";
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export async function seedBrowserOwnerSession(
  page: Page,
  workspace: ProvisionedWorkspace,
): Promise<AuthSession> {
  const auth = await loginUser({
    tenantId: workspace.tenantId,
    email: workspace.ownerEmail,
    password: workspace.ownerPassword,
  });

  if (!auth.refreshToken) {
    throw new Error("Gateway login did not return a refresh token for browser session seeding.");
  }

  const role = auth.role ?? "OWNER";
  const sessionValue = signBrowserSessionCookie({
    user: {
      id: auth.userId!,
      role,
      tenantId: auth.tenantId,
      roles: [role],
    },
  });

  const host = new URL(BILLING_E2E_CONFIG.frontendUrl).hostname;
  await page.context().addCookies([
    {
      name: "ordella-session",
      value: sessionValue,
      domain: host,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
    {
      name: "ordella-refresh",
      value: auth.refreshToken,
      domain: host,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  await page.addInitScript((seed) => {
    window.localStorage.setItem(
      "ordella-auth",
      JSON.stringify({
        state: {
          user: {
            id: seed.userId,
            email: seed.email,
            tenantId: seed.tenantId,
            role: seed.role,
            roles: [seed.role],
            permissions: [],
          },
          isAuthenticated: true,
        },
        version: 0,
      }),
    );
    window.localStorage.setItem(
      "ordella-tenant",
      JSON.stringify({
        state: {
          tenant: {
            id: seed.tenantId,
            name: seed.tenantName,
            portalType: "PHYSIO",
          },
        },
        version: 0,
      }),
    );
  }, {
    userId: auth.userId,
    email: auth.email,
    tenantId: auth.tenantId,
    tenantName: workspace.tenantName,
    role,
  });

  await page.route(/\/api\//, async (route) => {
    if (route.request().url().includes("/billing-context")) {
      await route.fallback();
      return;
    }

    const headers = {
      ...route.request().headers(),
      authorization: `Bearer ${auth.accessToken}`,
      "x-tenant-id": auth.tenantId,
    };
    await route.continue({ headers });
  });

  const refreshResponse = await page.request.post("/api/auth/refresh");
  if (!refreshResponse.ok()) {
    // Some local frontend images return 500 from the BFF refresh route; gateway token injection above covers API calls.
  }

  return auth;
}

export async function mockClinicBillingContextRoute(page: Page, tenantId: string) {
  const context = await getBillingTruth(tenantId);

  await page.addInitScript((billingContext) => {
    (
      window as unknown as { __ORDELLA_E2E_BILLING_CONTEXT__?: typeof billingContext }
    ).__ORDELLA_E2E_BILLING_CONTEXT__ = billingContext;
  }, context);

  await page.route(/\/api\/billing\/billing-context/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: context }),
    });
  });
}

async function waitForBillingContextReady(tenantId: string, timeoutMs = 30_000): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      await getBillingTruth(tenantId);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("404") && !message.includes("not found")) {
        throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Billing context not ready for tenant ${tenantId}`);
}

export async function loginOrRegister(input: {
  tenantId: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthSession> {
  try {
    return await loginUser(input);
  } catch {
    return registerUser(input);
  }
}

export async function loginSuperAdmin(): Promise<AuthSession> {
  return loginUser({
    tenantId: BILLING_E2E_CONFIG.superAdminTenantId,
    email: BILLING_E2E_CONFIG.superAdminEmail,
    password: BILLING_E2E_CONFIG.superAdminPassword,
  });
}

export async function provisionWorkspace(
  superAdmin: AuthSession,
  billingModel: "tenant-level" | "organization-level",
): Promise<ProvisionedWorkspace> {
  const suffix = uniqueSuffix();
  const ownerPassword = "BillingTest123!";
  const ownerSeed = await loginOrRegister({
    tenantId: BILLING_E2E_CONFIG.superAdminTenantId,
    email: `billing-owner-${suffix}@e2e.test`,
    password: ownerPassword,
    role: "OWNER",
  });

  if (!ownerSeed.userId) {
    throw new Error("Owner userId missing after registration — cannot provision workspace.");
  }

  const response = await fetch(
    `${BILLING_E2E_CONFIG.gatewayUrl}/super-admin/provisioning/full`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${superAdmin.accessToken}`,
        "x-tenant-id": superAdmin.tenantId,
      },
      body: JSON.stringify({
        organization: {
          organizationName: `Billing Org ${suffix}`,
          primaryContactName: "Billing Contact",
          primaryContactEmail: `org-contact-${suffix}@e2e.test`,
          primaryContactPhone: "+447700900123",
          billingModel,
        },
        tenant: {
          tenantName: `Billing Clinic ${suffix}`,
          timezone: "Europe/London",
          currency: "GBP",
        },
        owner: {
          ownerUserId: ownerSeed.userId,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Provision failed (${response.status}): ${await response.text()}`);
  }

  const body = unwrapGatewayBody<{
    tenantId: string;
    organizationId: string;
    ownerEmail: string;
    tenantName: string;
  }>(await response.json());

  if (!body.tenantId || !body.ownerEmail) {
    throw new Error(`Provision response missing tenant fields: ${JSON.stringify(body)}`);
  }

  const ownerAuth = await loginUser({
    tenantId: body.tenantId,
    email: body.ownerEmail,
    password: ownerPassword,
  });

  await waitForBillingContextReady(body.tenantId);

  return {
    organizationId: body.organizationId,
    tenantId: body.tenantId,
    tenantName: body.tenantName,
    ownerEmail: body.ownerEmail,
    ownerPassword,
    ownerAuth,
    billingModel,
  };
}

export async function getBillingTruth(tenantId: string): Promise<BillingContext> {
  const response = await fetch(
    `${BILLING_E2E_CONFIG.gatewayUrl}/tenants/internal/billing-context/${encodeURIComponent(tenantId)}`,
  );

  if (!response.ok) {
    throw new Error(`internal billing-context failed (${response.status}): ${await response.text()}`);
  }

  return (await response.json()) as BillingContext;
}

export async function getTenantLifecycleStatus(tenantId: string): Promise<string> {
  const response = await fetch(
    `${BILLING_E2E_CONFIG.gatewayUrl}/tenants/internal/status/${encodeURIComponent(tenantId)}`,
  );

  if (!response.ok) {
    throw new Error(`tenant status failed (${response.status}): ${await response.text()}`);
  }

  const payload = (await response.json()) as { status?: string };
  return payload.status ?? "UNKNOWN";
}

export async function getBillingContext(auth: AuthSession): Promise<BillingContext> {
  const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/billing/billing-context`, {
    headers: {
      authorization: `Bearer ${auth.accessToken}`,
      "x-tenant-id": auth.tenantId,
    },
  });

  if (response.status === 403) {
    const body = await response.text();
    if (body.includes("TENANT_SUSPENDED")) {
      return getBillingTruth(auth.tenantId);
    }
    throw new Error(`billing-context failed (403): ${body}`);
  }

  if (!response.ok) {
    throw new Error(`billing-context failed (${response.status}): ${await response.text()}`);
  }

  return (await response.json()) as BillingContext;
}

export async function waitForBillingStatus(
  auth: AuthSession,
  expected: string,
  timeoutMs = 15_000,
): Promise<BillingContext> {
  const normalizedExpected = expected.toUpperCase();
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const context = await getBillingTruth(auth.tenantId);
    if (context.subscriptionStatus?.toUpperCase() === normalizedExpected) {
      return context;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const last = await getBillingTruth(auth.tenantId);
  throw new Error(
    `Expected subscriptionStatus=${expected}, got ${last.subscriptionStatus ?? "null"}`,
  );
}

export async function createCheckoutSession(auth: AuthSession, plan: "starter" | "pro" = "pro") {
  const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/billing/checkout-session`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${auth.accessToken}`,
      "x-tenant-id": auth.tenantId,
    },
    body: JSON.stringify({
      plan,
      billingCycle: "yearly",
      successUrl: `${BILLING_E2E_CONFIG.frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${BILLING_E2E_CONFIG.frontendUrl}/checkout?intent=checkout&plan=${plan}&cycle=yearly`,
      email: auth.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`checkout-session failed (${response.status}): ${await response.text()}`);
  }

  return unwrapGatewayBody<{ url: string; sessionId: string }>(await response.json());
}

export async function createStripeCustomer(auth: AuthSession) {
  const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/billing/create-customer`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${auth.accessToken}`,
      "x-tenant-id": auth.tenantId,
    },
    body: JSON.stringify({
      tenantId: auth.tenantId,
      email: auth.email,
      name: auth.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`create-customer failed (${response.status}): ${await response.text()}`);
  }

  return unwrapGatewayBody<{ stripeCustomerId: string; billingEntity?: string }>(await response.json());
}

export async function activateTenantSubscription(input: {
  auth: AuthSession;
  customerId: string;
  subscriptionId: string;
  organizationId?: string;
  sessionId?: string;
}) {
  const webhookSecret = BILLING_E2E_CONFIG.webhookSecret;

  const checkoutEvent = buildCheckoutSessionCompletedEvent({
    tenantId: input.auth.tenantId,
    customerId: input.customerId,
    subscriptionId: input.subscriptionId,
    organizationId: input.organizationId,
  });
  if (input.sessionId) {
    checkoutEvent.data.object.id = input.sessionId;
  }

  await postSignedWebhook(BILLING_E2E_CONFIG.gatewayUrl, checkoutEvent, webhookSecret);

  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildSubscriptionUpdatedEvent({
      tenantId: input.organizationId ? undefined : input.auth.tenantId,
      organizationId: input.organizationId,
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
      status: "active",
    }),
    webhookSecret,
  );

  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildInvoicePaidEvent({
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
    }),
    webhookSecret,
  );
}

export async function markSubscriptionPastDue(input: {
  auth: AuthSession;
  customerId: string;
  subscriptionId: string;
  organizationId?: string;
}) {
  const webhookSecret = BILLING_E2E_CONFIG.webhookSecret;

  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildInvoicePaymentFailedEvent({
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
    }),
    webhookSecret,
  );

  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildSubscriptionUpdatedEvent({
      tenantId: input.organizationId ? undefined : input.auth.tenantId,
      organizationId: input.organizationId,
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
      status: "past_due",
    }),
    webhookSecret,
  );
}

export async function cancelSubscription(input: {
  auth: AuthSession;
  customerId: string;
  subscriptionId: string;
  organizationId?: string;
}) {
  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildSubscriptionDeletedEvent({
      tenantId: input.organizationId ? undefined : input.auth.tenantId,
      organizationId: input.organizationId,
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
    }),
    BILLING_E2E_CONFIG.webhookSecret,
  );
}

export async function reactivateSubscription(input: {
  auth: AuthSession;
  customerId: string;
  subscriptionId: string;
  organizationId?: string;
}) {
  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildSubscriptionUpdatedEvent({
      tenantId: input.organizationId ? undefined : input.auth.tenantId,
      organizationId: input.organizationId,
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
      status: "active",
    }),
    BILLING_E2E_CONFIG.webhookSecret,
  );

  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildInvoicePaidEvent({
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
    }),
    BILLING_E2E_CONFIG.webhookSecret,
  );
}

export async function generateAiNotesViaUi(
  page: import("@playwright/test").Page,
  auth: AuthSession,
  count: number,
) {
  const patientId = `patient-billing-e2e-${auth.tenantId}`;
  const therapistId = auth.userId ?? "billing-e2e-therapist";
  const appointmentId = `appt-billing-e2e-${auth.tenantId}`;

  await page.goto(
    `/therapist/notes/create?patientId=${encodeURIComponent(patientId)}&appointmentId=${encodeURIComponent(appointmentId)}&therapistId=${encodeURIComponent(therapistId)}`,
  );

  for (let index = 0; index < count; index += 1) {
    const generateButton = page.getByRole("button", { name: /generate ai note/i });
    if (await generateButton.isVisible().catch(() => false)) {
      await generateButton.click();
      const acceptButton = page.getByRole("button", { name: /accept|insert/i });
      await acceptButton.waitFor({ state: "visible", timeout: 30_000 }).catch(() => undefined);
      if (await acceptButton.isVisible().catch(() => false)) {
        await acceptButton.click();
      }
      continue;
    }

    await generateAiNotes(auth, 1);
  }
}

export async function generateAiNotes(auth: AuthSession, count: number) {
  for (let index = 0; index < count; index += 1) {
    const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/ai/notes/generate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${auth.accessToken}`,
        "x-tenant-id": auth.tenantId,
      },
      body: JSON.stringify({
        patientId: `patient-billing-e2e-${auth.tenantId}`,
        therapistId: auth.userId,
        appointmentId: `appt-billing-e2e-${index}`,
        rawText: `Billing E2E AI note generation event ${index + 1}.`,
      }),
    });

    if (response.status >= 500) {
      throw new Error(`AI notes generate failed (${response.status}): ${await response.text()}`);
    }
  }
}

export async function incrementAiNotesUsageDirect(auth: AuthSession, amount: number) {
  const response = await fetch(
    `${BILLING_E2E_CONFIG.gatewayUrl}/tenants/internal/ai-notes-usage`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-internal-service": "ai-notes-service",
      },
      body: JSON.stringify({ tenantId: auth.tenantId, amount }),
    },
  );

  if (!response.ok) {
    throw new Error(`ai-notes-usage failed (${response.status}): ${await response.text()}`);
  }
}

export async function postAiNotesInvoiceEvent(input: {
  customerId: string;
  subscriptionId: string;
  tenantId: string;
  quantity: number;
}) {
  const aiNotesPriceId = BILLING_E2E_CONFIG.aiNotesPriceId || "price_ai_notes_test";
  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildInvoiceWithAiNotesEvent({
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
      aiNotesPriceId,
      quantity: input.quantity,
      tenantId: input.tenantId,
    }),
    BILLING_E2E_CONFIG.webhookSecret,
  );
}

export async function postInvoiceUpcomingEvent(input: {
  customerId: string;
  subscriptionId: string;
  tenantId: string;
  quantity: number;
}) {
  const aiNotesPriceId = BILLING_E2E_CONFIG.aiNotesPriceId || "price_ai_notes_test";
  await postSignedWebhook(
    BILLING_E2E_CONFIG.gatewayUrl,
    buildInvoiceUpcomingEvent({
      customerId: input.customerId,
      subscriptionId: input.subscriptionId,
      aiNotesPriceId,
      quantity: input.quantity,
      tenantId: input.tenantId,
    }),
    BILLING_E2E_CONFIG.webhookSecret,
  );
}

export async function verifyStripeInvoiceAiNotesLine(input: {
  customerId: string;
  expectedQuantity: number;
}) {
  if (!stripeApiReady()) {
    return { verified: false, reason: "STRIPE_SECRET_KEY not configured" };
  }

  const stripe = new Stripe(BILLING_E2E_CONFIG.stripeSecretKey);
  const aiNotesPriceId = BILLING_E2E_CONFIG.aiNotesPriceId;

  const upcoming = await stripe.invoices.retrieveUpcoming({ customer: input.customerId });
  const aiLine = upcoming.lines.data.find((line) => {
    const priceId = typeof line.price === "string" ? line.price : line.price?.id;
    return priceId === aiNotesPriceId || line.metadata?.usageType === "ai_notes";
  });

  if (!aiLine) {
    const invoices = await stripe.invoices.list({ customer: input.customerId, limit: 5 });
    const fromHistory = invoices.data
      .flatMap((invoice) => invoice.lines.data)
      .find((line) => {
        const priceId = typeof line.price === "string" ? line.price : line.price?.id;
        return priceId === aiNotesPriceId || line.metadata?.usageType === "ai_notes";
      });

    if (!fromHistory) {
      return { verified: false, reason: "No AI notes line item found in Stripe" };
    }

    return {
      verified: (fromHistory.quantity ?? 0) >= input.expectedQuantity,
      quantity: fromHistory.quantity ?? 0,
      priceId: typeof fromHistory.price === "string" ? fromHistory.price : fromHistory.price?.id,
    };
  }

  return {
    verified: (aiLine.quantity ?? 0) >= input.expectedQuantity,
    quantity: aiLine.quantity ?? 0,
    priceId: typeof aiLine.price === "string" ? aiLine.price : aiLine.price?.id,
  };
}

export function subscriptionIdsFromContext(context: BillingContext) {
  return {
    customerId: context.stripeCustomerId ?? `cus_e2e_${Date.now()}`,
    subscriptionId: context.stripeSubscriptionId ?? `sub_e2e_${Date.now()}`,
  };
}
