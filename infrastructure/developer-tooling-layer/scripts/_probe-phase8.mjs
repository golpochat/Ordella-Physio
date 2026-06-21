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

// API stream check
const loginRes = await fetch(`${BASE}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-tenant-id": "demo-tenant" },
  body: JSON.stringify({ email: "clinicadmin@ordella.dev", password: "ClinicAdmin123!" }),
});
const loginBody = await loginRes.json();
const token = loginBody.accessToken ?? loginBody.data?.accessToken;
const streamRes = await fetch(`${BASE}/api/messaging/stream`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "x-tenant-id": "demo-tenant",
    Accept: "text/event-stream",
  },
});
console.log(
  JSON.stringify({
    test: "8.0 messaging-stream",
    status: streamRes.status,
    ok: streamRes.status === 200,
    contentType: streamRes.headers.get("content-type"),
  }),
);
if (streamRes.body) await streamRes.body.cancel();

const suites = [
  {
    user: "clinicadmin@ordella.dev",
    password: "ClinicAdmin123!",
    routes: [
      "/clinic/messages",
      "/clinic/notifications",
      "/settings/notifications/providers",
      "/settings/notifications/analytics",
      "/settings/notifications/logs",
    ],
    ignoreApi: [],
  },
  {
    user: "therapist@ordella.dev",
    password: "Therapist123!",
    routes: ["/therapist/messages", "/therapist/notifications"],
  },
  {
    user: "staff@ordella.dev",
    password: "Staff123!",
    routes: ["/staff/messages", "/staff/notifications"],
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

// Gateway health
for (const path of [
  "http://localhost:3049/messaging/health",
  "http://localhost:3049/messaging/ready",
  "http://localhost:3049/notifications/health",
]) {
  const r = await fetch(path);
  console.log(JSON.stringify({ health: path, status: r.status }));
}

await browser.close();
