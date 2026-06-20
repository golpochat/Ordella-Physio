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
import { loadStripeEnvFromRepo, isPlaceholderSecret } from "./stripe-env-loader";

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
  loadStripeEnvFromRepo();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? BILLING_E2E_CONFIG.webhookSecret;
  if (webhookSecret) {
    BILLING_E2E_CONFIG.webhookSecret = webhookSecret;
  }
  return Boolean(webhookSecret);
}

export function stripeApiReady(): boolean {
  loadStripeEnvFromRepo();
  const key = process.env.STRIPE_SECRET_KEY ?? BILLING_E2E_CONFIG.stripeSecretKey;
  if (key) {
    BILLING_E2E_CONFIG.stripeSecretKey = key;
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? BILLING_E2E_CONFIG.webhookSecret;
  if (webhookSecret) {
    BILLING_E2E_CONFIG.webhookSecret = webhookSecret;
  }
  if (process.env.STRIPE_PRICE_AI_NOTES) {
    BILLING_E2E_CONFIG.aiNotesPriceId = process.env.STRIPE_PRICE_AI_NOTES;
  }
  if (!key || !webhookSecret) {
    return false;
  }
  return !isPlaceholderSecret(key);
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

export async function seedBrowserOwnerSession(
  page: Page,
  workspace: ProvisionedWorkspace,
): Promise<AuthSession> {
  await page.route("**/api/auth/login", async (route) => {
    const headers = {
      ...route.request().headers(),
      "x-tenant-id": workspace.tenantId,
    };
    await route.continue({ headers });
  });

  await page.goto(`/login?tenantId=${encodeURIComponent(workspace.tenantId)}`);
  await page.locator("#email").fill(workspace.ownerEmail);
  await page.locator("#password").fill(workspace.ownerPassword);
  await page.getByRole("button", { name: /log in/i }).click();

  const tenantSelect = page.locator("#tenant");
  if (await tenantSelect.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await tenantSelect.selectOption(workspace.tenantId);
    await page.getByRole("button", { name: /log in/i }).click();
  }

  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30_000 });
  await page.unroute("**/api/auth/login");

  const auth = await loginUser({
    tenantId: workspace.tenantId,
    email: workspace.ownerEmail,
    password: workspace.ownerPassword,
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

  let upcoming: Stripe.UpcomingInvoice | null = null;
  try {
    upcoming = await stripe.invoices.retrieveUpcoming({ customer: input.customerId });
  } catch (error) {
    const stripeError = error as { code?: string; message?: string };
    if (stripeError.code !== "invoice_upcoming_none") {
      throw error;
    }
  }

  const aiLine = upcoming?.lines.data.find((line) => {
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

const STRIPE_SUBSCRIPTION_STATUS_MAP: Record<string, string> = {
  active: "ACTIVE",
  past_due: "PAST_DUE",
  canceled: "CANCELED",
  trialing: "TRIALING",
  unpaid: "UNPAID",
  incomplete: "INCOMPLETE",
  incomplete_expired: "INCOMPLETE_EXPIRED",
  paused: "PAUSED",
};

export async function assertBillingContextMatchesStripe(auth: AuthSession): Promise<void> {
  const apiContext = await getBillingContext(auth);
  const internalContext = await getBillingTruth(auth.tenantId);

  if (apiContext.subscriptionStatus !== internalContext.subscriptionStatus) {
    throw new Error(
      `billing-context API (${apiContext.subscriptionStatus}) != internal truth (${internalContext.subscriptionStatus})`,
    );
  }

  if (apiContext.stripeCustomerId !== internalContext.stripeCustomerId) {
    throw new Error("billing-context stripeCustomerId does not match internal billing truth");
  }

  if (apiContext.stripeSubscriptionId !== internalContext.stripeSubscriptionId) {
    throw new Error("billing-context stripeSubscriptionId does not match internal billing truth");
  }

  if (!stripeApiReady() || !apiContext.stripeCustomerId) {
    return;
  }

  const stripe = new Stripe(BILLING_E2E_CONFIG.stripeSecretKey);
  await stripe.customers.retrieve(apiContext.stripeCustomerId);

  if (!apiContext.stripeSubscriptionId) {
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(apiContext.stripeSubscriptionId);
  const mappedStatus =
    STRIPE_SUBSCRIPTION_STATUS_MAP[subscription.status] ?? subscription.status.toUpperCase();

  if (apiContext.subscriptionStatus?.toUpperCase() !== mappedStatus) {
    throw new Error(
      `billing-context (${apiContext.subscriptionStatus}) does not match Stripe subscription (${subscription.status})`,
    );
  }
}

export type PlatformBillingMetrics = {
  mrr?: number;
  mrrStripeLive?: number;
  arr?: number;
  arrStripeLive?: number;
  activeSubscriptions?: number;
  source?: string;
  lastUpdatedAt?: string;
};

export async function fetchPlatformMetrics(auth: AuthSession): Promise<PlatformBillingMetrics> {
  const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/billing/platform-metrics`, {
    headers: {
      authorization: `Bearer ${auth.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`platform-metrics failed (${response.status}): ${await response.text()}`);
  }

  return unwrapGatewayBody<PlatformBillingMetrics>(await response.json());
}

export async function fillOrdellaCheckoutBillingForm(page: Page): Promise<void> {
  await page.locator("#billingStreet").fill("123 Test Street");
  await page.locator("#billingCity").fill("Dublin");
  await page.locator("#billingPostal").fill("D01 F5P2");
}

export async function completeStripeHostedCheckout(
  page: Page,
  timeoutMs = 120_000,
): Promise<string> {
  if (!/checkout\.stripe\.com/.test(page.url())) {
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: timeoutMs });
  }
  await page.waitForLoadState("domcontentloaded");

  const emailField = page.getByRole("textbox", { name: /^email$/i });
  if (await emailField.isVisible({ timeout: 10_000 }).catch(() => false)) {
    await emailField.fill("billing-e2e@ordella.dev");
    await emailField.blur();
  }

  const cardRow = page.getByRole("listitem").filter({ has: page.getByRole("radio", { name: /^card$/i }) });
  if (await cardRow.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await cardRow.click();
  }

  const cardAccordion = page.locator('[data-testid="card-accordion-item-button"]');
  if (await cardAccordion.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await cardAccordion.click();
  }

  const fillCardFieldsInContext = async (
    context: Page | ReturnType<Page["frameLocator"]>,
  ): Promise<boolean> => {
    const number = context
      .locator(
        'input[name="cardnumber"], input[name="cardNumber"], input[autocomplete="cc-number"], input[placeholder*="1234"], input[data-elements-stable-field-name="cardNumber"]',
      )
      .first();
    if (!(await number.isVisible({ timeout: 1_000 }).catch(() => false))) {
      return false;
    }

    await number.fill("4242424242424242");
    const expiry = context
      .locator(
        'input[name="exp-date"], input[name="cardExpiry"], input[autocomplete="cc-exp"], input[placeholder*="MM"], input[data-elements-stable-field-name="cardExpiry"]',
      )
      .first();
    if (await expiry.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await expiry.fill("12 / 34");
    }
    const cvc = context
      .locator(
        'input[name="cvc"], input[name="cardCvc"], input[autocomplete="cc-csc"], input[placeholder*="CVC"], input[data-elements-stable-field-name="cardCvc"]',
      )
      .first();
    if (await cvc.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await cvc.fill("123");
    }
    return true;
  };

  const fillCardFields = async (): Promise<boolean> => {
    if (await fillCardFieldsInContext(page)) {
      return true;
    }

    for (const frame of page.frames()) {
      if (await fillCardFieldsInContext(frame)) {
        return true;
      }
    }

    const iframeCount = await page.locator("iframe").count();
    for (let index = 0; index < iframeCount; index += 1) {
      const frame = page.frameLocator("iframe").nth(index);
      if (await fillCardFieldsInContext(frame)) {
        return true;
      }
      const nestedCount = await frame.locator("iframe").count().catch(() => 0);
      for (let nested = 0; nested < nestedCount; nested += 1) {
        const nestedFrame = frame.frameLocator("iframe").nth(nested);
        if (await fillCardFieldsInContext(nestedFrame)) {
          return true;
        }
      }
    }

    return false;
  };

  const cardFillDeadline = Date.now() + 45_000;
  let filled = false;
  while (Date.now() < cardFillDeadline) {
    if (await fillCardFields()) {
      filled = true;
      break;
    }
    await cardRow.click().catch(() => undefined);
    await page.waitForTimeout(750);
  }

  if (!filled) {
    throw new Error("Could not locate Stripe card input fields on hosted checkout page");
  }

  const cardholderName = page.getByRole("textbox", { name: /cardholder name/i });
  if (await cardholderName.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await cardholderName.fill("Billing E2E Test");
  }

  if (await emailField.isVisible().catch(() => false)) {
    const emailValue = await emailField.inputValue();
    if (!emailValue.trim()) {
      await emailField.fill("billing-e2e@ordella.dev");
      await emailField.blur();
    }
  }

  const submit = page.getByRole("button", {
    name: /pay and subscribe|subscribe|start subscription|complete purchase/i,
  });
  await submit.click({ timeout: timeoutMs });

  await page.waitForURL(/checkout\/success/, { timeout: timeoutMs });
  const successUrl = new URL(page.url());
  const sessionId = successUrl.searchParams.get("session_id");
  if (!sessionId) {
    throw new Error("Stripe checkout completed but session_id was missing from success URL");
  }
  return sessionId;
}

export async function syncCheckoutSessionFromStripe(input: {
  auth: AuthSession;
  sessionId: string;
}): Promise<void> {
  if (!stripeApiReady()) {
    return;
  }

  const stripe = new Stripe(BILLING_E2E_CONFIG.stripeSecretKey);
  const session = await stripe.checkout.sessions.retrieve(input.sessionId, {
    expand: ["subscription", "customer"],
  });

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer && "id" in session.customer
        ? session.customer.id
        : "";
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription && "id" in session.subscription
        ? session.subscription.id
        : `sub_e2e_${input.auth.tenantId}`;

  if (!customerId) {
    throw new Error(`Stripe session ${input.sessionId} is missing customer id`);
  }

  await activateTenantSubscription({
    auth: input.auth,
    customerId,
    subscriptionId,
    sessionId: input.sessionId,
  });
}
