import { chromium } from "@playwright/test";

const BASE = "http://localhost:3010";

const suites = [
  {
    name: "patient",
    email: "patient1@ordella.dev",
    password: "Patient123!",
    routes: [
      "/patient",
      "/patient/profile",
      "/patient/appointments",
      "/patient/notes",
      "/patient/billing",
      "/patient/messages",
      "/patient/notifications",
    ],
  },
  {
    name: "pharmacy",
    email: "pharmacy@ordella.dev",
    password: "Pharmacy123!",
    routes: [
      "/pharmacy",
      "/pharmacy/prescriptions",
      "/pharmacy/fulfillment",
      "/pharmacy/patients",
      "/pharmacy/billing",
      "/pharmacy/reports",
      "/pharmacy/messages",
      "/pharmacy/notifications",
      "/pharmacy/profile",
    ],
  },
];

const browser = await chromium.launch();

for (const suite of suites) {
  const page = await browser.newPage();
  const networkFails = [];

  page.on("response", (res) => {
    const url = res.url();
    if (
      url.includes("/api/") &&
      res.status() >= 400 &&
      !url.includes("/api/messaging/stream")
    ) {
      networkFails.push(`${res.status()} ${url.replace(BASE, "")}`);
    }
  });

  await page.goto(`${BASE}/login`);
  await page.locator("#email").fill(suite.email);
  await page.locator("#password").fill(suite.password);
  await page.getByRole("button", { name: /^log in$/i }).click();
  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30_000 });

  console.log(`\n=== ${suite.name.toUpperCase()} (${suite.email}) ===`);

  for (const route of suite.routes) {
    const consoleErrors = [];
    const handler = (msg) => {
      if (msg.type() === "error" && !msg.text().includes("/api/messaging/stream")) {
        consoleErrors.push(msg.text().slice(0, 120));
      }
    };
    page.on("console", handler);

    await page.goto(`${BASE}${route}`);
    await page.waitForTimeout(1500);

    const body = await page.locator("body").innerText();
    const url = page.url();
    const fail =
      body.includes("access-denied") ||
      body.includes("portal error") ||
      body.includes("Unable to load") ||
      url.includes("/login") ||
      url.includes("/forbidden");

    const heading = body.split("\n").find((l) => l.trim().length > 2) ?? "";

    console.log(
      JSON.stringify({
        route,
        finalUrl: url.replace(BASE, ""),
        fail,
        heading: heading.slice(0, 60),
        apiFails: [...new Set(networkFails)].slice(-3),
        consoleErrors: consoleErrors.slice(0, 2),
      }),
    );

    page.off("console", handler);
    networkFails.length = 0;
  }

  await page.close();
}

await browser.close();
