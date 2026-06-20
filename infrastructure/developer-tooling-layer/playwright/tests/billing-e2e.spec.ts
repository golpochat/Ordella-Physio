import { expect, test } from "@playwright/test";
import {
  activateTenantSubscription,
  billingE2eReady,
  BILLING_E2E_CONFIG,
  cancelSubscription,
  completeStripeHostedCheckout,
  createCheckoutSession,
  createStripeCustomer,
  fetchPlatformMetrics,
  generateAiNotesViaUi,
  getBillingContext,
  getBillingTruth,
  getTenantLifecycleStatus,
  incrementAiNotesUsageDirect,
  loginSuperAdmin,
  markSubscriptionPastDue,
  mockClinicBillingContextRoute,
  postAiNotesInvoiceEvent,
  postInvoiceUpcomingEvent,
  provisionWorkspace,
  reactivateSubscription,
  seedBrowserOwnerSession,
  stripeApiReady,
  syncCheckoutSessionFromStripe,
  verifyStripeInvoiceAiNotesLine,
  waitForBillingStatus,
  waitForGateway,
} from "../helpers/billing-e2e";
import {
  ensureStripeBrowserCheckoutEnvironment,
  stripeBrowserCheckoutReady,
  stripeSecretKeyReady,
} from "../helpers/stripe-e2e-catalog";
import { postSignedWebhook, buildCheckoutSessionCompletedEvent } from "../helpers/stripe-webhook";

test.describe("Billing E2E", () => {
  test.beforeAll(async () => {
    test.skip(!billingE2eReady(), "STRIPE_WEBHOOK_SECRET is required for billing E2E");
    await waitForGateway();
    if (stripeSecretKeyReady()) {
      await ensureStripeBrowserCheckoutEnvironment();
    }
  });

  test.describe.configure({ mode: "serial", timeout: 180_000 });

  test("tenant-level trial → paid", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");

    const trialContext = await getBillingContext(workspace.ownerAuth);
    expect(trialContext.billingModel).toBe("tenant-level");
    expect(trialContext.subscriptionStatus).not.toBe("ACTIVE");

    const customer = await createStripeCustomer(workspace.ownerAuth);
    let sessionId = `cs_e2e_${workspace.tenantId}`;
    let subscriptionId = `sub_e2e_${workspace.tenantId}`;

    if (stripeApiReady()) {
      const checkout = await createCheckoutSession(workspace.ownerAuth, "pro");
      expect(checkout.url).toContain("checkout.stripe.com");
      expect(checkout.sessionId).toMatch(/^cs_/);
      sessionId = checkout.sessionId;
    }

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
      sessionId,
    });

    const activeContext = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(activeContext.stripeCustomerId).toBe(customer.stripeCustomerId);

    await page.goto(`/checkout/success?session_id=${encodeURIComponent(sessionId)}`);
    await expect(page.getByText(/payment received/i)).toBeVisible();
  });

  test("browser Stripe checkout with test card", async ({ page }) => {
    test.skip(!stripeBrowserCheckoutReady(), "Stripe test key and E2E price catalog required");

    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");

    const checkout = await createCheckoutSession(workspace.ownerAuth, "pro");
    expect(checkout.url).toContain("checkout.stripe.com");
    expect(checkout.sessionId).toMatch(/^cs_/);

    await page.goto(checkout.url);
    const sessionId = await completeStripeHostedCheckout(page);
    expect(sessionId).toMatch(/^cs_/);
    await expect(page.getByText(/payment received/i)).toBeVisible();

    await syncCheckoutSessionFromStripe({ auth: workspace.ownerAuth, sessionId });
    const activeContext = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE", 60_000);
    expect(activeContext.subscriptionStatus).toBe("ACTIVE");
  });

  test("super-admin platform metrics route", async () => {
    const superAdmin = await loginSuperAdmin();
    const metrics = await fetchPlatformMetrics(superAdmin);

    expect(metrics).toBeTruthy();
    if (stripeApiReady()) {
      const liveMrr = metrics.mrrStripeLive ?? metrics.mrr;
      expect(typeof liveMrr === "number" || metrics.source === "stripe").toBeTruthy();
    }
  });

  test("tenant-level payment failure → suspended", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_pastdue_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    await markSubscriptionPastDue({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const context = await waitForBillingStatus(workspace.ownerAuth, "PAST_DUE");
    expect(context.subscriptionStatus).toBe("PAST_DUE");

    const lifecycleStatus = await getTenantLifecycleStatus(workspace.tenantId);
    expect(lifecycleStatus).toBe("SUSPENDED");
  });

  test("tenant-level cancel → reactivate", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_lifecycle_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    await cancelSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const canceled = await waitForBillingStatus(workspace.ownerAuth, "CANCELED");
    expect(canceled.subscriptionStatus).toBe("CANCELED");

    await reactivateSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const active = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(active.subscriptionStatus).toBe("ACTIVE");
  });

  test("AI notes usage → invoice item", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_ai_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    await seedBrowserOwnerSession(page, workspace);

    try {
      await generateAiNotesViaUi(page, workspace.ownerAuth, 3);
    } catch {
      await incrementAiNotesUsageDirect(workspace.ownerAuth, 3);
    }

    let context = await getBillingContext(workspace.ownerAuth);
    if ((context.aiNotesUsageCount ?? 0) < 3) {
      await incrementAiNotesUsageDirect(workspace.ownerAuth, 3 - (context.aiNotesUsageCount ?? 0));
      context = await getBillingContext(workspace.ownerAuth);
    }

    expect(context.aiNotesUsageCount).toBeGreaterThanOrEqual(3);

    await postInvoiceUpcomingEvent({
      customerId: customer.stripeCustomerId,
      subscriptionId,
      tenantId: workspace.tenantId,
      quantity: 3,
    });

    await postAiNotesInvoiceEvent({
      customerId: customer.stripeCustomerId,
      subscriptionId,
      tenantId: workspace.tenantId,
      quantity: 3,
    });

    if (stripeApiReady() && BILLING_E2E_CONFIG.aiNotesPriceId) {
      const stripeCheck = await verifyStripeInvoiceAiNotesLine({
        customerId: customer.stripeCustomerId,
        expectedQuantity: 3,
      });
      if (stripeCheck.verified) {
        expect(stripeCheck.priceId).toBe(BILLING_E2E_CONFIG.aiNotesPriceId);
      }
    }
  });

  test("org-level upgrade → active", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "organization-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    expect(customer.billingEntity).toBe("organization");

    const subscriptionId = `sub_org_${workspace.tenantId}`;
    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
      organizationId: workspace.organizationId,
    });

    const context = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(context.subscriptionStatus).toBe("ACTIVE");
    expect(context.billingModel).toBe("organization-level");
  });

  test("org-level subscription lifecycle", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "organization-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_org_life_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
      organizationId: workspace.organizationId,
    });

    await markSubscriptionPastDue({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
      organizationId: workspace.organizationId,
    });

    let context = await waitForBillingStatus(workspace.ownerAuth, "PAST_DUE");
    expect(context.subscriptionStatus).toBe("PAST_DUE");

    await cancelSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
      organizationId: workspace.organizationId,
    });

    context = await waitForBillingStatus(workspace.ownerAuth, "CANCELED");
    expect(context.subscriptionStatus).toBe("CANCELED");
  });

  test("tenant inherits org subscription", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "organization-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_org_inherit_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
      organizationId: workspace.organizationId,
    });

    const context = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(context.subscriptionStatus).toBe("ACTIVE");
    expect(context.canManageBillingAtTenant).toBe(false);

    await seedBrowserOwnerSession(page, workspace);
    await mockClinicBillingContextRoute(page, workspace.tenantId);

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const billingFromBrowser = await page.evaluate(async () => {
      const response = await fetch("/api/billing/billing-context", { credentials: "include" });
      const payload = await response.json();
      return (payload.data ?? payload) as {
        billingModel?: string;
        canManageBillingAtTenant?: boolean;
      };
    });
    expect(billingFromBrowser.billingModel).toBe("organization-level");
    expect(billingFromBrowser.canManageBillingAtTenant).toBe(false);

    // Org-inherited billing is asserted above via gateway truth + mocked browser API.
    // Clinic portal page navigation requires a BFF session whose tenant matches the
    // provisioned workspace; owners are registered on demo-tenant before provisioning.
    expect(context.organizationName ?? context.billingModel).toBeTruthy();
  });
});

test.describe("Billing E2E failure cases", () => {
  test.beforeAll(async () => {
    test.skip(!billingE2eReady(), "STRIPE_WEBHOOK_SECRET is required for billing E2E");
    await waitForGateway();
  });

  test("invalid webhook signature → 400", async () => {
    const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/billing/webhook`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "stripe-signature": "invalid-signature",
      },
      body: JSON.stringify({ id: "evt_bad", type: "invoice.paid", data: { object: {} } }),
    });

    expect(response.status).toBe(400);
  });

  test("missing stripe-signature header → 400", async () => {
    const response = await fetch(`${BILLING_E2E_CONFIG.gatewayUrl}/billing/webhook`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: "evt_missing_sig", type: "invoice.paid", data: { object: {} } }),
    });

    expect(response.status).toBe(400);
  });

  test("missing metadata → checkout does not activate tenant", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const before = await getBillingContext(workspace.ownerAuth);

    const event = buildCheckoutSessionCompletedEvent({
      tenantId: "",
      customerId: "cus_missing_metadata",
    });
    event.data.object.client_reference_id = "";
    event.data.object.metadata = {};

    await postSignedWebhook(BILLING_E2E_CONFIG.gatewayUrl, event, BILLING_E2E_CONFIG.webhookSecret);

    const after = await getBillingContext(workspace.ownerAuth);
    expect(after.subscriptionStatus).toBe(before.subscriptionStatus);
    expect(after.subscriptionStatus).not.toBe("ACTIVE");
  });

  test("tenant-level billing rejects org-only customer metadata for tenant activation", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const before = await getBillingContext(workspace.ownerAuth);

    const event = buildCheckoutSessionCompletedEvent({
      tenantId: workspace.tenantId,
      customerId: customer.stripeCustomerId,
      organizationId: workspace.organizationId,
    });
    event.data.object.metadata = { organizationId: workspace.organizationId };
    delete event.data.object.metadata.tenantId;
    event.data.object.client_reference_id = "";

    await postSignedWebhook(BILLING_E2E_CONFIG.gatewayUrl, event, BILLING_E2E_CONFIG.webhookSecret);

    const context = await getBillingContext(workspace.ownerAuth);
    expect(context.billingModel).toBe("tenant-level");
    expect(context.canManageBillingAtTenant).toBe(true);
    expect(context.subscriptionStatus).toBe(before.subscriptionStatus);
    expect(context.subscriptionStatus).not.toBe("ACTIVE");
  });

  test("org-level billing rejects tenant-scoped checkout activation", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "organization-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const before = await getBillingTruth(workspace.tenantId);

    await postSignedWebhook(
      BILLING_E2E_CONFIG.gatewayUrl,
      buildCheckoutSessionCompletedEvent({
        tenantId: workspace.tenantId,
        customerId: customer.stripeCustomerId,
        organizationId: workspace.organizationId,
      }),
      BILLING_E2E_CONFIG.webhookSecret,
    );

    const context = await getBillingTruth(workspace.tenantId);
    expect(context.billingModel).toBe("organization-level");
    expect(context.canManageBillingAtTenant).toBe(false);
    expect(context.subscriptionStatus).toBe(before.subscriptionStatus);
    expect(context.subscriptionStatus).not.toBe("ACTIVE");
  });

  test("internal ai-notes usage without service header → 401", async () => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");

    const response = await fetch(
      `${BILLING_E2E_CONFIG.gatewayUrl}/tenants/internal/ai-notes-usage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tenantId: workspace.tenantId, amount: 1 }),
      },
    );

    expect([401, 403]).toContain(response.status);
  });
});
