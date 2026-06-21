import { chromium } from "@playwright/test";

const BASE = "http://localhost:3010";

async function login(page, email, password) {
  await page.goto(`${BASE}/login`);
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: /^log in$/i }).click();
  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30_000 });
}

async function probeRoute(page, route, opts = {}) {
  const apiFails = [];
  const handler = (res) => {
    const url = res.url();
    if (url.includes("/api/") && res.status() >= 400) {
      if (opts.ignoreApi?.some((p) => url.includes(p))) return;
      apiFails.push(`${res.status()} ${url.replace(BASE, "")}`);
    }
  };
  page.on("response", handler);

  const consoleErrors = [];
  const consoleHandler = (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (opts.ignoreConsole?.some((p) => text.includes(p))) return;
      consoleErrors.push(text.slice(0, 120));
    }
  };
  page.on("console", consoleHandler);

  await page.goto(`${BASE}${route}`);
  await page.waitForTimeout(1500);

  const body = await page.locator("body").innerText();
  const url = page.url();
  const fail =
    body.includes("access-denied") ||
    body.includes("portal error") ||
    body.includes("Unable to load") ||
    body.includes("Something went wrong") ||
    url.includes("/login") ||
    url.includes("/forbidden");

  page.off("response", handler);
  page.off("console", consoleHandler);

  return {
    route,
    finalUrl: url.replace(BASE, ""),
    fail,
    apiFails: [...new Set(apiFails)],
    consoleErrors,
    snippet: body.slice(0, 100).replace(/\s+/g, " "),
  };
}

const browser = await chromium.launch();

for (const path of [
  "http://localhost:3049/reporting/health",
  "http://localhost:3049/audit-logs/health",
]) {
  try {
    const r = await fetch(path);
    console.log(JSON.stringify({ health: path, status: r.status }));
  } catch (error) {
    console.log(JSON.stringify({ health: path, status: "error", message: String(error) }));
  }
}

const suites = [
  {
    user: "clinicadmin@ordella.dev",
    password: "ClinicAdmin123!",
    routes: [
      "/clinic/reports",
      "/clinic/reports/appointments",
      "/clinic/reports/revenue",
      "/clinic/reports/patients",
      "/clinic/reports/saved",
      "/clinic/audit-logs",
    ],
  },
  {
    user: "superadmin@ordella.dev",
    password: "SuperAdmin123!",
    routes: ["/super-admin/reports", "/super-admin/audit-logs"],
  },
];

for (const suite of suites) {
  const page = await browser.newPage();
  await login(page, suite.user, suite.password);
  console.log(`\n=== ${suite.user} ===`);
  for (const route of suite.routes) {
    const result = await probeRoute(page, route);
    console.log(JSON.stringify(result));
  }
  await page.close();
}

const loginRes = await fetch(`${BASE}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-tenant-id": "demo-tenant" },
  body: JSON.stringify({ email: "clinicadmin@ordella.dev", password: "ClinicAdmin123!" }),
});
const loginBody = await loginRes.json();
const token = loginBody.data?.accessToken ?? loginBody.accessToken;

for (const path of [
  "/api/reporting/dashboard",
  "/api/reporting/reports/appointments",
  "/api/reporting/reports/revenue",
  "/api/reporting/reports/patients",
  "/api/audit",
]) {
  const r = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, "x-tenant-id": "demo-tenant" },
  });
  const text = await r.text();
  console.log(JSON.stringify({ api: path, status: r.status, body: text.slice(0, 120) }));
}

await browser.close();
