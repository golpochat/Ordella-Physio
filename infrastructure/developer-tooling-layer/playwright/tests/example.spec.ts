import { test, expect } from "@playwright/test";

test.describe("Ordella Physio E2E scaffold", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /ordella physio/i })).toBeVisible();
  });

  test("login page is reachable", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });

  test("health placeholder navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /go to login/i })).toBeVisible();
  });
});
