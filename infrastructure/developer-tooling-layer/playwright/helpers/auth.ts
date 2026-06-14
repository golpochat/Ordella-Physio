import type { Page } from "@playwright/test";

const tenantId = process.env.TEST_TENANT_ID ?? "demo-tenant";
const adminEmail = process.env.TEST_ADMIN_EMAIL ?? "e2e-admin@ordella.dev";
const adminPassword = process.env.TEST_ADMIN_PASSWORD ?? "ClinicAdmin123!";

export async function loginAsClinicAdmin(page: Page) {
  await page.goto("/login");
  await page.locator("#email").fill(adminEmail);
  await page.locator("#password").fill(adminPassword);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 30_000,
  });
}

export async function logout(page: Page) {
  await page.goto("/login");
}

export { tenantId, adminEmail, adminPassword };
