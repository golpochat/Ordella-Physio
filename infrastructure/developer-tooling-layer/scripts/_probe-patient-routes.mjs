import { chromium } from "@playwright/test";

const BASE = "http://localhost:3010";
const routes = [
  "/patient",
  "/patient/profile",
  "/patient/appointments",
  "/patient/notes",
  "/patient/billing",
  "/patient/messages",
  "/patient/notifications",
];

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`${BASE}/login`);
await page.locator("#email").fill("patient1@ordella.dev");
await page.locator("#password").fill("Patient123!");
await page.getByRole("button", { name: /^log in$/i }).click();
await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30_000 });

for (const route of routes) {
  const errors = [];
  const handler = (msg) => {
    if (msg.type() === "error") errors.push(msg.text().slice(0, 120));
  };
  page.on("console", handler);

  await page.goto(`${BASE}${route}`);
  await page.waitForTimeout(2000);

  const body = await page.locator("body").innerText();
  const url = page.url();
  const fail =
    body.includes("access-denied") ||
    body.includes("portal error") ||
    body.includes("Unable to load") ||
    url.includes("/login") ||
    url.includes("/forbidden");

  console.log(
    JSON.stringify({
      route,
      finalUrl: url,
      fail,
      snippet: body.slice(0, 120).replace(/\s+/g, " "),
      errors: errors.slice(0, 2),
    }),
  );

  page.off("console", handler);
}

await browser.close();
