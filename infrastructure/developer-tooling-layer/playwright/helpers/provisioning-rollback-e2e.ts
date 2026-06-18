import type { Page } from "@playwright/test";
import Stripe from "stripe";
import { BILLING_E2E_CONFIG, loginSuperAdmin, waitForGateway, type AuthSession } from "./billing-e2e";

export const PROVISIONING_E2E_CONFIG = {
  ...BILLING_E2E_CONFIG,
  failHeader: "x-provisioning-fail-at",
};

export type ProvisioningFormData = {
  organizationName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  billingModel: "tenant-level" | "organization-level";
  tenantName: string;
  ownerEmail: string;
  timezone?: string;
  currency?: string;
};

export type ProvisioningMarkers = {
  suffix: string;
  organizationName: string;
  tenantName: string;
  ownerEmail: string;
  billingModel: "tenant-level" | "organization-level";
};

export type ProvisioningSuccessContext = ProvisioningMarkers & {
  organizationId: string;
  tenantId: string;
  ownerUserId: string;
  tenantCode?: string;
};

export function provisioningE2eReady(): boolean {
  return Boolean(PROVISIONING_E2E_CONFIG.gatewayUrl);
}

export function uniqueProvisioningSuffix(): string {
  return `prov-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildProvisioningMarkers(
  suffix: string,
  billingModel: "tenant-level" | "organization-level" = "tenant-level",
): ProvisioningMarkers {
  return {
    suffix,
    organizationName: `Rollback Org ${suffix}`,
    tenantName: `Rollback Clinic ${suffix}`,
    ownerEmail: `rollback-owner-${suffix}@e2e.test`,
    billingModel,
  };
}

function unwrapGatewayBody<T>(body: unknown): T {
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

function authHeaders(auth: AuthSession): Record<string, string> {
  return {
    authorization: `Bearer ${auth.accessToken}`,
    "x-tenant-id": auth.tenantId,
    accept: "application/json",
  };
}

export async function searchOrganizations(
  auth: AuthSession,
  search: string,
): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(
    `${PROVISIONING_E2E_CONFIG.gatewayUrl}/organizations?search=${encodeURIComponent(search)}&limit=50`,
    { headers: authHeaders(auth) },
  );

  if (!response.ok) {
    throw new Error(`Organization search failed (${response.status})`);
  }

  const body = unwrapGatewayBody<{ data: Array<{ id: string; name: string }> }>(await response.json());
  return body.data ?? [];
}

export async function listTenants(
  auth: AuthSession,
): Promise<Array<{ id: string; name: string; organizationId?: string | null; ownerUserId?: string | null }>> {
  const response = await fetch(`${PROVISIONING_E2E_CONFIG.gatewayUrl}/tenants?limit=200`, {
    headers: authHeaders(auth),
  });

  if (!response.ok) {
    throw new Error(`Tenant list failed (${response.status})`);
  }

  const body = unwrapGatewayBody<{
    data?: Array<{ id: string; name: string; organizationId?: string | null; ownerUserId?: string | null }>;
  } | Array<{ id: string; name: string; organizationId?: string | null; ownerUserId?: string | null }>>(
    await response.json(),
  );

  if (Array.isArray(body)) {
    return body;
  }

  return body.data ?? [];
}

export async function getOrganizationById(
  organizationId: string,
): Promise<Record<string, unknown> | null> {
  const response = await fetch(
    `${PROVISIONING_E2E_CONFIG.gatewayUrl}/organizations/internal/${encodeURIComponent(organizationId)}`,
    { headers: { accept: "application/json" } },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Organization lookup failed (${response.status})`);
  }

  return (await response.json()) as Record<string, unknown>;
}

export async function getTenantOrganizationLink(
  tenantId: string,
): Promise<Record<string, unknown> | null> {
  const response = await fetch(
    `${PROVISIONING_E2E_CONFIG.gatewayUrl}/tenants/internal/organization-tenant/${encodeURIComponent(tenantId)}`,
    { headers: { accept: "application/json" } },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Tenant lookup failed (${response.status})`);
  }

  return (await response.json()) as Record<string, unknown>;
}

export async function getOwnerByEmail(email: string): Promise<Record<string, unknown> | null> {
  const response = await fetch(
    `${PROVISIONING_E2E_CONFIG.gatewayUrl}/auth/internal/users/by-email/${encodeURIComponent(email)}`,
    { headers: { accept: "application/json" } },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Owner lookup failed (${response.status})`);
  }

  return (await response.json()) as Record<string, unknown>;
}

export async function getBillingProvisioningStatus(
  tenantId: string,
  auth?: AuthSession,
) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (auth) {
    Object.assign(headers, authHeaders(auth));
  }

  const response = await fetch(
    `${PROVISIONING_E2E_CONFIG.gatewayUrl}/billing/internal/provisioning-status/${encodeURIComponent(tenantId)}`,
    { headers },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as {
    hasTenantBillingAccount: boolean;
    hasOrganizationBillingAccount: boolean;
    tenantStripeCustomerId: string | null;
    organizationStripeCustomerId: string | null;
    tenantSubscriptionId: string | null;
    organizationSubscriptionId: string | null;
    organizationId: string | null;
  };
}

export async function getBillingContext(tenantId: string) {
  const response = await fetch(
    `${PROVISIONING_E2E_CONFIG.gatewayUrl}/tenants/internal/billing-context/${encodeURIComponent(tenantId)}`,
    { headers: { accept: "application/json" } },
  );

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as {
    billingModel: string;
    organizationId?: string | null;
    stripeCustomerId?: string | null;
  };
}

function stripeClient(): Stripe | null {
  const key = PROVISIONING_E2E_CONFIG.stripeSecretKey;
  if (!key || key.includes("local_dev") || key.includes("change-me")) {
    return null;
  }
  return new Stripe(key);
}

export async function findStripeCustomersByMetadata(input: {
  organizationId?: string;
  tenantId?: string;
}): Promise<Stripe.Customer[]> {
  const stripe = stripeClient();
  if (!stripe) {
    return [];
  }

  const matches: Stripe.Customer[] = [];

  for await (const customer of stripe.customers.list({ limit: 100 })) {
    if ("deleted" in customer && customer.deleted) {
      continue;
    }

    const metadata = (customer as Stripe.Customer).metadata ?? {};
    if (input.organizationId && metadata.organizationId === input.organizationId) {
      matches.push(customer as Stripe.Customer);
      continue;
    }
    if (input.tenantId && metadata.tenantId === input.tenantId) {
      matches.push(customer as Stripe.Customer);
    }
  }

  return matches;
}

export async function findStripeCustomersByName(name: string): Promise<Stripe.Customer[]> {
  const stripe = stripeClient();
  if (!stripe) {
    return [];
  }

  const matches: Stripe.Customer[] = [];
  for await (const customer of stripe.customers.list({ limit: 100 })) {
    if ("deleted" in customer && customer.deleted) {
      continue;
    }
    if ((customer as Stripe.Customer).name === name) {
      matches.push(customer as Stripe.Customer);
    }
  }

  return matches;
}

export async function waitForAbsence(
  assertion: () => Promise<boolean>,
  timeoutMs = 20_000,
): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await assertion()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Expected provisioning artifacts to be absent, but some still exist.");
}

export async function assertNoProvisioningArtifacts(
  auth: AuthSession,
  markers: ProvisioningMarkers,
  ids?: { organizationId?: string; tenantId?: string },
): Promise<void> {
  await waitForAbsence(async () => {
    const organizations = await searchOrganizations(auth, markers.organizationName);
    const orgMatch = organizations.some((org) => org.name === markers.organizationName);
    if (orgMatch) {
      return false;
    }

    const tenants = await listTenants(auth);
    const tenantMatch = tenants.some((tenant) => tenant.name === markers.tenantName);
    if (tenantMatch) {
      return false;
    }

    const owner = await getOwnerByEmail(markers.ownerEmail);
    if (owner) {
      return false;
    }

    if (ids?.organizationId) {
      const organization = await getOrganizationById(ids.organizationId);
      if (organization) {
        return false;
      }
    }

    if (ids?.tenantId) {
      const tenant = await getTenantOrganizationLink(ids.tenantId);
      if (tenant) {
        return false;
      }

      const billing = await getBillingProvisioningStatus(ids.tenantId, auth);
      if (
        billing &&
        (billing.hasTenantBillingAccount ||
          billing.hasOrganizationBillingAccount ||
          billing.tenantStripeCustomerId ||
          billing.organizationStripeCustomerId ||
          billing.tenantSubscriptionId ||
          billing.organizationSubscriptionId)
      ) {
        return false;
      }
    }

    const stripeByName = await findStripeCustomersByName(markers.tenantName);
    if (stripeByName.length > 0) {
      return false;
    }

    const stripeByMetadata = await findStripeCustomersByMetadata({
      organizationId: ids?.organizationId,
      tenantId: ids?.tenantId,
    });
    if (stripeByMetadata.length > 0) {
      return false;
    }

    return true;
  });
}

export async function assertProvisioningSuccess(
  auth: AuthSession,
  markers: ProvisioningMarkers,
  result: ProvisioningSuccessContext,
): Promise<void> {
  const organization = await getOrganizationById(result.organizationId);
  if (!organization) {
    throw new Error(`Organization ${result.organizationId} was not found`);
  }

  const tenant = await getTenantOrganizationLink(result.tenantId);
  if (!tenant) {
    throw new Error(`Tenant ${result.tenantId} was not found`);
  }

  const owner = await getOwnerByEmail(markers.ownerEmail);
  if (!owner) {
    throw new Error(`Owner ${markers.ownerEmail} was not found`);
  }

  if (String(tenant.organizationId) !== result.organizationId) {
    throw new Error("Tenant is not linked to the provisioned organization");
  }

  if (String(owner.tenantId) !== result.tenantId) {
    throw new Error("Owner is not linked to the provisioned tenant");
  }

  const billingContext = await getBillingContext(result.tenantId);
  if (!billingContext || billingContext.billingModel !== markers.billingModel) {
    throw new Error(`Billing model mismatch for tenant ${result.tenantId}`);
  }

  const billingStatus = await getBillingProvisioningStatus(result.tenantId, auth);
  if (!billingStatus) {
    throw new Error("Billing provisioning status unavailable");
  }

  if (markers.billingModel === "tenant-level") {
    if (!billingStatus.hasTenantBillingAccount || !billingStatus.tenantStripeCustomerId) {
      throw new Error("Tenant-level Stripe customer was not provisioned");
    }
  } else if (!billingStatus.hasOrganizationBillingAccount || !billingStatus.organizationStripeCustomerId) {
    throw new Error("Organization-level Stripe customer was not provisioned");
  }

  const stripeCustomers = await findStripeCustomersByMetadata({
    organizationId: result.organizationId,
    tenantId: markers.billingModel === "tenant-level" ? result.tenantId : undefined,
  });

  if (stripeCustomers.length === 0 && stripeClient()) {
    throw new Error("Stripe customer metadata was not found for the provisioned workspace");
  }

  if (markers.billingModel === "tenant-level" && stripeCustomers.length > 0) {
    const metadata = stripeCustomers[0]?.metadata ?? {};
    if (metadata.tenantId !== result.tenantId) {
      throw new Error("Stripe customer metadata.tenantId is incorrect");
    }
    if (metadata.organizationId !== result.organizationId) {
      throw new Error("Stripe customer metadata.organizationId is incorrect");
    }
  }
}

export type ProvisioningFailStage = "org" | "tenant" | "owner" | "billing";

function normalizeProvisioningFailStage(
  value: string | null | undefined,
): ProvisioningFailStage | null {
  if (!value?.trim()) {
    return null;
  }

  const aliases: Record<string, ProvisioningFailStage> = {
    org: "org",
    organization: "org",
    tenant: "tenant",
    owner: "owner",
    billing: "billing",
  };

  return aliases[value.trim().toLowerCase()] ?? null;
}

function resolveFailStageFromPage(
  page: Page,
  explicitFailAt?: ProvisioningFailStage,
): ProvisioningFailStage | null {
  if (explicitFailAt) {
    return explicitFailAt;
  }

  try {
    const failAt = normalizeProvisioningFailStage(new URL(page.url()).searchParams.get("failAt"));
    return failAt ?? null;
  } catch {
    return null;
  }
}

export function installProvisioningFailInjection(
  page: Page,
  failAt?: ProvisioningFailStage,
): () => void {
  const handler = async (route: import("@playwright/test").Route) => {
    const request = route.request();
    if (
      request.method() === "POST" &&
      request.url().includes("/api/super-admin/provisioning/full")
    ) {
      const stage = resolveFailStageFromPage(page, failAt);
      const headers = { ...request.headers() };
      if (stage) {
        headers[PROVISIONING_E2E_CONFIG.failHeader] = stage;
      }
      await route.continue({ headers });
      return;
    }

    await route.continue();
  };

  void page.route("**/api/super-admin/provisioning/full", handler);
  return () => {
    void page.unroute("**/api/super-admin/provisioning/full", handler);
  };
}

/** Reads `?failAt=org|tenant|owner|billing` from the wizard URL and forwards it as the fail header. */
export function installProvisioningFailFromQuery(page: Page): () => void {
  return installProvisioningFailInjection(page);
}

export async function fillProvisioningWizard(
  page: Page,
  markers: ProvisioningMarkers,
  options?: { failAt?: ProvisioningFailStage },
): Promise<void> {
  const query = options?.failAt ? `?failAt=${options.failAt}` : "";
  await page.goto(`/super-admin/provisioning/new${query}`);

  await page.getByLabel("Organization name").fill(markers.organizationName);
  await page.getByLabel("Primary contact name").fill("Rollback Contact");
  await page.getByLabel("Primary contact email").fill(`org-contact-${markers.suffix}@e2e.test`);
  await page.getByLabel("Primary contact phone").fill("+447700900123");
  await page.locator("#provision-billing-model").selectOption(markers.billingModel);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Tenant name").fill(markers.tenantName);
  await page.locator("#provision-timezone").selectOption(markers.timezone ?? "Europe/London");
  await page.locator("#provision-currency").selectOption(markers.currency ?? "GBP");
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Owner email").fill(markers.ownerEmail);
}

export async function submitProvisioningWizard(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Provision" }).click();
}

export { loginSuperAdmin, waitForGateway };
