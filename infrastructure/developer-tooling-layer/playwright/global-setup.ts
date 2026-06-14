const gatewayUrl = process.env.API_GATEWAY_URL ?? "http://localhost:3049";
const tenantId = process.env.TEST_TENANT_ID ?? "demo-tenant";
const email = process.env.TEST_ADMIN_EMAIL ?? "e2e-admin@ordella.dev";
const password = process.env.TEST_ADMIN_PASSWORD ?? "ClinicAdmin123!";

async function ensureE2EUser() {
  const headers = {
    "content-type": "application/json",
    "x-tenant-id": tenantId,
  };

  const login = await fetch(`${gatewayUrl}/auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });

  if (login.ok) {
    return;
  }

  const register = await fetch(`${gatewayUrl}/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, role: "ADMIN" }),
  });

  if (!register.ok && register.status !== 409) {
    const detail = await register.text();
    console.warn(`[playwright global-setup] Could not seed E2E user: ${detail}`);
  }
}

export default async function globalSetup() {
  process.env.TEST_TENANT_ID = tenantId;
  process.env.TEST_ADMIN_EMAIL = email;
  process.env.TEST_ADMIN_PASSWORD = password;

  try {
    const health = await fetch(`${gatewayUrl}/health`);
    if (!health.ok) {
      console.warn("[playwright global-setup] API gateway unavailable; E2E login may fail.");
      return;
    }
    await ensureE2EUser();
  } catch (error) {
    console.warn(
      `[playwright global-setup] Skipping auth seed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
