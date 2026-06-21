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
  const gracefulUpstreamError =
    body.includes("Unable to load data") || body.includes("Try again");
  const fail =
    body.includes("access-denied") ||
    body.includes("portal error") ||
    url.includes("/login") ||
    url.includes("/forbidden") ||
    url.includes("/access-denied") ||
    consoleErrors.some((e) => e.includes("Cannot read properties of undefined")) ||
    (!gracefulUpstreamError &&
      body.includes("Something went wrong") &&
      !body.includes("Model Registry") &&
      !body.includes("Training jobs") &&
      !body.includes("Datasets") &&
      !body.includes("Experiments") &&
      !body.includes("Agents") &&
      !body.includes("Feature flags") &&
      !body.includes("Cost") &&
      !body.includes("Gateway") &&
      !body.includes("Observability") &&
      !body.includes("Audit"));

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

const healthPaths = [
  "http://localhost:3049/ai/health",
  "http://localhost:3049/ai/platform/health",
  "http://localhost:3049/ai/training/health",
  "http://localhost:3049/ai/drift/health",
  "http://localhost:3049/ai/flags/health",
  "http://localhost:3049/ai/gateway/health",
  "http://localhost:3049/ai/cost/health",
  "http://localhost:3049/ai/security/health",
  "http://localhost:3049/ai/observability/health",
  "http://localhost:3049/ai/agents/health",
];

for (const path of healthPaths) {
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
    ignoreApi: ["/api/ai"],
    routes: [
      "/clinic/ai/models",
      "/clinic/ai/training",
      "/clinic/ai/datasets",
      "/clinic/ai/experiments",
      "/clinic/ai/agents",
      "/clinic/ai/flags",
      "/clinic/ai/cost",
      "/clinic/ai/gateway/keys",
      "/clinic/ai/observability",
      "/clinic/ai/security/audit",
    ],
  },
  {
    user: "therapist@ordella.dev",
    password: "Therapist123!",
    routes: ["/therapist/notes/create"],
  },
];

for (const suite of suites) {
  const page = await browser.newPage();
  await login(page, suite.user, suite.password);
  console.log(`\n=== ${suite.user} ===`);
  for (const route of suite.routes) {
    const result = await probeRoute(page, route, {
      ignoreApi: suite.ignoreApi,
    });
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

for (const path of ["/api/ai/models", "/api/ai/datasets", "/api/ai/training/jobs"]) {
  try {
    const r = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}`, "x-tenant-id": "demo-tenant" },
    });
    const text = await r.text();
    console.log(JSON.stringify({ api: path, status: r.status, body: text.slice(0, 120) }));
  } catch (error) {
    console.log(JSON.stringify({ api: path, status: "error", message: String(error) }));
  }
}

await browser.close();
