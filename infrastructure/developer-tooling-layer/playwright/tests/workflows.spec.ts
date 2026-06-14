import { test, expect, type Page } from "@playwright/test";

const tenantId = process.env.TEST_TENANT_ID ?? "demo-tenant";
const adminEmail = process.env.TEST_ADMIN_EMAIL ?? "e2e-admin@ordella.dev";
const adminPassword = process.env.TEST_ADMIN_PASSWORD ?? "ClinicAdmin123!";

async function loginFromUi(page: Page) {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  await page.locator("#email").fill(adminEmail);
  await page.locator("#password").fill(adminPassword);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 30_000,
  });
}

test.describe("Login", () => {
  test("clinic admin can sign in", async ({ page }) => {
    await loginFromUi(page);
    await expect(page).not.toHaveURL(/\/login/);
  });
});

test.describe("Dashboard navigation", () => {
  test.beforeEach(async ({ page }) => {
    await loginFromUi(page);
  });

  test("loads clinic dashboard after login", async ({ page }) => {
    await page.goto("/clinic");
    await expect(page).toHaveURL(/\/clinic/);
  });
});

test.describe("Patient creation", () => {
  test.beforeEach(async ({ page }) => {
    await loginFromUi(page);
  });

  test("patient list page is reachable", async ({ page }) => {
    await page.goto("/clinic/patients");
    await expect(page).toHaveURL(/\/clinic\/patients/);
  });
});

test.describe("Appointment booking", () => {
  test.beforeEach(async ({ page }) => {
    await loginFromUi(page);
  });

  test("appointments page is reachable", async ({ page }) => {
    await page.goto("/clinic/appointments");
    await expect(page).toHaveURL(/\/clinic\/appointments/);
  });
});

test.describe("Notes creation", () => {
  test.beforeEach(async ({ page }) => {
    await loginFromUi(page);
  });

  test("notes page is reachable", async ({ page }) => {
    await page.goto("/clinic/notes");
    await expect(page).toHaveURL(/\/clinic\/notes/);
  });
});

test.describe("Billing flow", () => {
  test.beforeEach(async ({ page }) => {
    await loginFromUi(page);
  });

  test("billing invoices page is reachable", async ({ page }) => {
    await page.goto("/billing/invoices");
    await expect(page).toHaveURL(/\/billing\/invoices/);
  });
});
