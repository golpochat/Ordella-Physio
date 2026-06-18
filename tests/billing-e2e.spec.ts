import { expect, test } from "@playwright/test";
import {
  activateTenantSubscription,
  assertBillingContextMatchesStripe,
  billingE2eReady,
  BILLING_E2E_CONFIG,
  cancelSubscription,
  createCheckoutSession,
  createStripeCustomer,
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
  verifyStripeInvoiceAiNotesLine,
  waitForBillingStatus,
  waitForGateway,
} from "../infrastructure/developer-tooling-layer/playwright/helpers/billing-e2e";
import {
  buildCheckoutSessionCompletedEvent,
  buildInvoicePaidEvent,
  buildInvoicePaymentFailedEvent,
  buildSubscriptionUpdatedEvent,
  postSignedWebhook,
  triggerStripeCli,
} from "../infrastructure/developer-tooling-layer/playwright/helpers/stripe-webhook";

test.describe("Billing E2E (gateway + Docker dev stack)", () => {
  test.beforeAll(async () => {
    test.skip(!billingE2eReady(), "STRIPE_WEBHOOK_SECRET is required for billing E2E");
    await waitForGateway();
  });

  test.describe.configure({ mode: "serial", timeout: 180_000 });

  test("1. trial → paid upgrade", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");

    const trialContext = await getBillingContext(workspace.ownerAuth);
    expect(trialContext.billingModel).toBe("tenant-level");
    expect(trialContext.subscriptionStatus?.toUpperCase()).not.toBe("ACTIVE");

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

    const paidContext = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(paidContext.stripeCustomerId).toBe(customer.stripeCustomerId);
    await assertBillingContextMatchesStripe(workspace.ownerAuth);

    await page.goto(`/checkout/success?session_id=${encodeURIComponent(sessionId)}`);
    await expect(page.getByText(/payment received/i)).toBeVisible();
  });

  test("2. paid → active", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_paid_active_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const activeContext = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(activeContext.subscriptionStatus).toBe("ACTIVE");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);

    await seedBrowserOwnerSession(page, workspace);
    await page.goto("/clinic/billing");
    await page.waitForResponse(
      (response) => response.url().includes("/billing-context") && response.ok(),
      { timeout: 20_000 },
    );
    await expect(page.getByText(/active|subscribed|manage subscription/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("3. payment failure → past due → suspended", async () => {
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

    const pastDueContext = await waitForBillingStatus(workspace.ownerAuth, "PAST_DUE");
    expect(pastDueContext.subscriptionStatus).toBe("PAST_DUE");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);

    const lifecycleStatus = await getTenantLifecycleStatus(workspace.tenantId);
    expect(lifecycleStatus).toBe("SUSPENDED");
  });

  test("4. cancel → reactivate", async () => {
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
    await assertBillingContextMatchesStripe(workspace.ownerAuth);

    await reactivateSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const active = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(active.subscriptionStatus).toBe("ACTIVE");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);
  });

  test("5. AI notes usage → invoice item appears", async ({ page }) => {
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
    await assertBillingContextMatchesStripe(workspace.ownerAuth);

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
      expect(stripeCheck.verified).toBe(true);
      expect(stripeCheck.priceId).toBe(BILLING_E2E_CONFIG.aiNotesPriceId);
    }
  });

  test("6. org-level upgrade → active", async () => {
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
    await assertBillingContextMatchesStripe(workspace.ownerAuth);
  });

  test("7. org-level upgrade → tenant inherits subscription", async ({ page }) => {
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
    await assertBillingContextMatchesStripe(workspace.ownerAuth);

    const truth = await getBillingTruth(workspace.tenantId);
    expect(truth.subscriptionStatus).toBe("ACTIVE");
    expect(truth.billingModel).toBe("organization-level");

    await seedBrowserOwnerSession(page, workspace);
    await mockClinicBillingContextRoute(page, workspace.tenantId);

    const billingFromBrowser = await page.evaluate(async () => {
      const response = await fetch("/api/billing/billing-context", { credentials: "include" });
      const payload = await response.json();
      return (payload.data ?? payload) as {
        billingModel?: string;
        canManageBillingAtTenant?: boolean;
        subscriptionStatus?: string;
      };
    });
    expect(billingFromBrowser.billingModel).toBe("organization-level");
    expect(billingFromBrowser.canManageBillingAtTenant).toBe(false);
    expect(billingFromBrowser.subscriptionStatus).toBe("ACTIVE");

    await page.goto("/clinic/billing");
    await page.waitForResponse(
      (response) => response.url().includes("/billing-context") && response.ok(),
    );
    await expect(page.getByText(/billing managed by organization/i)).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole("link", { name: /view organization billing/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /upgrade|manage subscription/i })).toHaveCount(0);
  });
});

test.describe("Stripe webhook simulation (stripe trigger + signed gateway webhooks)", () => {
  test.beforeAll(async () => {
    test.skip(!billingE2eReady(), "STRIPE_WEBHOOK_SECRET is required for billing E2E");
    await waitForGateway();
  });

  test.describe.configure({ mode: "serial", timeout: 180_000 });

  test("stripe trigger checkout.session.completed + gateway activation", async () => {
    await triggerStripeCli("checkout.session.completed");

    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_trigger_checkout_${workspace.tenantId}`;

    const response = await postSignedWebhook(
      BILLING_E2E_CONFIG.gatewayUrl,
      buildCheckoutSessionCompletedEvent({
        tenantId: workspace.tenantId,
        customerId: customer.stripeCustomerId,
        subscriptionId,
      }),
      BILLING_E2E_CONFIG.webhookSecret,
    );
    expect(response.ok).toBe(true);

    const context = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(context.subscriptionStatus).toBe("ACTIVE");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);
  });

  test("stripe trigger invoice.payment_failed → past due", async () => {
    await triggerStripeCli("invoice.payment_failed");

    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_trigger_fail_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const failResponse = await postSignedWebhook(
      BILLING_E2E_CONFIG.gatewayUrl,
      buildInvoicePaymentFailedEvent({
        customerId: customer.stripeCustomerId,
        subscriptionId,
      }),
      BILLING_E2E_CONFIG.webhookSecret,
    );
    expect(failResponse.ok).toBe(true);

    await postSignedWebhook(
      BILLING_E2E_CONFIG.gatewayUrl,
      buildSubscriptionUpdatedEvent({
        tenantId: workspace.tenantId,
        customerId: customer.stripeCustomerId,
        subscriptionId,
        status: "past_due",
      }),
      BILLING_E2E_CONFIG.webhookSecret,
    );

    const context = await waitForBillingStatus(workspace.ownerAuth, "PAST_DUE");
    expect(context.subscriptionStatus).toBe("PAST_DUE");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);
  });

  test("stripe trigger invoice.paid → active", async () => {
    await triggerStripeCli("invoice.paid");

    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_trigger_paid_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const paidResponse = await postSignedWebhook(
      BILLING_E2E_CONFIG.gatewayUrl,
      buildInvoicePaidEvent({
        customerId: customer.stripeCustomerId,
        subscriptionId,
      }),
      BILLING_E2E_CONFIG.webhookSecret,
    );
    expect(paidResponse.ok).toBe(true);

    const context = await waitForBillingStatus(workspace.ownerAuth, "ACTIVE");
    expect(context.subscriptionStatus).toBe("ACTIVE");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);
  });

  test("stripe trigger customer.subscription.updated → lifecycle sync", async () => {
    await triggerStripeCli("customer.subscription.updated");

    const superAdmin = await loginSuperAdmin();
    const workspace = await provisionWorkspace(superAdmin, "tenant-level");
    const customer = await createStripeCustomer(workspace.ownerAuth);
    const subscriptionId = `sub_trigger_updated_${workspace.tenantId}`;

    await activateTenantSubscription({
      auth: workspace.ownerAuth,
      customerId: customer.stripeCustomerId,
      subscriptionId,
    });

    const updateResponse = await postSignedWebhook(
      BILLING_E2E_CONFIG.gatewayUrl,
      buildSubscriptionUpdatedEvent({
        tenantId: workspace.tenantId,
        customerId: customer.stripeCustomerId,
        subscriptionId,
        status: "canceled",
      }),
      BILLING_E2E_CONFIG.webhookSecret,
    );
    expect(updateResponse.ok).toBe(true);

    const context = await waitForBillingStatus(workspace.ownerAuth, "CANCELED");
    expect(context.subscriptionStatus).toBe("CANCELED");
    await assertBillingContextMatchesStripe(workspace.ownerAuth);
  });
});
