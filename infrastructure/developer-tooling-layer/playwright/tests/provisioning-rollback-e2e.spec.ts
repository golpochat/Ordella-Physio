import { expect, test } from "@playwright/test";
import {
  assertNoProvisioningArtifacts,
  assertProvisioningSuccess,
  buildProvisioningMarkers,
  fillProvisioningWizard,
  installProvisioningFailInjection,
  listTenants,
  loginSuperAdmin,
  provisioningE2eReady,
  searchOrganizations,
  submitProvisioningWizard,
  uniqueProvisioningSuffix,
  waitForGateway,
} from "../helpers/provisioning-rollback-e2e";

test.describe("Super-admin provisioning rollback", () => {
  test.beforeAll(async () => {
    test.skip(!provisioningE2eReady(), "API gateway URL is required for provisioning rollback E2E");
    await waitForGateway();
  });

  test.describe.configure({ mode: "serial", timeout: 180_000 });

  test("successful provisioning", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const suffix = uniqueProvisioningSuffix();
    const markers = buildProvisioningMarkers(suffix, "tenant-level");

    await fillProvisioningWizard(page, markers);
    await submitProvisioningWizard(page);

    await expect(page.getByText("Platform provisioned")).toBeVisible({ timeout: 30_000 });

    const orgCode = await page.locator("code").first().textContent();
    const tenantCode = await page.locator("code").nth(1).textContent();
    expect(orgCode).toBeTruthy();
    expect(tenantCode).toBeTruthy();

    const organizations = await searchOrganizations(superAdmin, markers.organizationName);
    const organization = organizations.find((item) => item.name === markers.organizationName);
    expect(organization).toBeTruthy();

    const tenants = await listTenants(superAdmin);
    const tenant = tenants.find((item) => item.name === markers.tenantName);
    expect(tenant).toBeTruthy();

    await assertProvisioningSuccess(superAdmin, markers, {
      ...markers,
      organizationId: organization!.id,
      tenantId: tenant!.id,
      ownerUserId: String(tenant!.ownerUserId ?? ""),
      tenantCode: tenantCode ?? undefined,
    });
  });

  test("rollback on org failure", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const markers = buildProvisioningMarkers(uniqueProvisioningSuffix(), "tenant-level");
    const removeInjection = installProvisioningFailInjection(page, "org");

    try {
      await fillProvisioningWizard(page, markers);
      await submitProvisioningWizard(page);

      await expect(page.getByText(/provisioning failure injected at org/i)).toBeVisible({
        timeout: 30_000,
      });
      await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();

      await assertNoProvisioningArtifacts(superAdmin, markers);

      await page.goto("/super-admin/organizations");
      await expect(page.getByText(markers.organizationName)).not.toBeVisible();
      await page.goto("/super-admin/tenants");
      await expect(page.getByText(markers.tenantName)).not.toBeVisible();
    } finally {
      removeInjection();
    }
  });

  test("rollback on tenant failure", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const markers = buildProvisioningMarkers(uniqueProvisioningSuffix(), "tenant-level");
    const removeInjection = installProvisioningFailInjection(page, "tenant");

    try {
      await fillProvisioningWizard(page, markers);
      await submitProvisioningWizard(page);

      await expect(page.getByText(/provisioning failure injected at tenant/i)).toBeVisible({
        timeout: 30_000,
      });

      await assertNoProvisioningArtifacts(superAdmin, markers);

      await page.goto("/super-admin/organizations");
      await expect(page.getByText(markers.organizationName)).not.toBeVisible();
      await page.goto("/super-admin/tenants");
      await expect(page.getByText(markers.tenantName)).not.toBeVisible();
    } finally {
      removeInjection();
    }
  });

  test("rollback on owner failure", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const markers = buildProvisioningMarkers(uniqueProvisioningSuffix(), "tenant-level");
    const removeInjection = installProvisioningFailInjection(page, "owner");

    try {
      await fillProvisioningWizard(page, markers);
      await submitProvisioningWizard(page);

      await expect(page.getByText(/provisioning failure injected at owner/i)).toBeVisible({
        timeout: 30_000,
      });

      await assertNoProvisioningArtifacts(superAdmin, markers);

      await page.goto("/super-admin/organizations");
      await expect(page.getByText(markers.organizationName)).not.toBeVisible();
      await page.goto("/super-admin/tenants");
      await expect(page.getByText(markers.tenantName)).not.toBeVisible();
    } finally {
      removeInjection();
    }
  });

  test("rollback on billing failure", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const markers = buildProvisioningMarkers(uniqueProvisioningSuffix(), "tenant-level");
    const removeInjection = installProvisioningFailInjection(page, "billing");

    try {
      await fillProvisioningWizard(page, markers);
      await submitProvisioningWizard(page);

      await expect(page.getByText(/provisioning failure injected at billing/i)).toBeVisible({
        timeout: 30_000,
      });

      await assertNoProvisioningArtifacts(superAdmin, markers);

      await page.goto("/super-admin/organizations");
      await expect(page.getByText(markers.organizationName)).not.toBeVisible();
      await page.goto("/super-admin/tenants");
      await expect(page.getByText(markers.tenantName)).not.toBeVisible();
    } finally {
      removeInjection();
    }
  });

  test("retry works after injected failure", async ({ page }) => {
    const superAdmin = await loginSuperAdmin();
    const suffix = uniqueProvisioningSuffix();
    const markers = buildProvisioningMarkers(suffix, "tenant-level");
    const removeInjection = installProvisioningFailInjection(page, "tenant");

    try {
      await fillProvisioningWizard(page, markers);
      await submitProvisioningWizard(page);
      await expect(page.getByText(/provisioning failure injected at tenant/i)).toBeVisible({
        timeout: 30_000,
      });
    } finally {
      removeInjection();
    }

    await assertNoProvisioningArtifacts(superAdmin, markers);

    await page.getByRole("button", { name: "Try again" }).click();
    await submitProvisioningWizard(page);

    await expect(page.getByText("Platform provisioned")).toBeVisible({ timeout: 30_000 });

    await page.goto("/super-admin/organizations");
    await expect(page.getByText(markers.organizationName)).toBeVisible({ timeout: 15_000 });

    await page.goto("/super-admin/tenants");
    await expect(page.getByText(markers.tenantName)).toBeVisible({ timeout: 15_000 });
  });
});
