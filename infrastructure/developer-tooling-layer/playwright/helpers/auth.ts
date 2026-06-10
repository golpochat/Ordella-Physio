import type { Page } from "@playwright/test";

/**
 * Auth helper placeholder for E2E flows.
 * Wire to API Gateway auth or NextAuth session bootstrap when implementing tests.
 */
export async function loginAsPlaceholder(page: Page, role: "admin" | "clinic" | "therapist" | "patient" = "clinic") {
  await page.goto("/login");
  await page.getByLabel("Email").fill(`${role}@example.com`);
  await page.getByLabel("Password").fill("changeme");
  await page.getByRole("button", { name: /sign in/i }).click();
}

export async function logoutPlaceholder(page: Page) {
  await page.goto("/");
}
