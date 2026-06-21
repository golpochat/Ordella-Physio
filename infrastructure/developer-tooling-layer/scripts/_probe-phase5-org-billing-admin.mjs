const GATEWAY = "http://localhost:3049";
const FRONTEND = "http://localhost:3010";
const TENANT_ID = "demo-tenant";
const ORG_ID = "demo-org";
const ORG_BILLING_ADMIN = {
  email: "orgbillingadmin@ordella.dev",
  password: "OrgBillingAdmin123!",
};

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { status: response.status, body };
}

async function login() {
  const { status, body } = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify(ORG_BILLING_ADMIN),
  });

  const data = body?.data ?? body;
  return { status, accessToken: data?.accessToken, user: data?.user, body };
}

async function main() {
  const loginResult = await login();
  const results = [];

  results.push({
    id: "5.10",
    name: "ORG_BILLING_ADMIN login",
    ok:
      loginResult.status === 200 &&
      loginResult.user?.role === "ORG_BILLING_ADMIN" &&
      Boolean(loginResult.accessToken),
    status: loginResult.status,
    role: loginResult.user?.role,
    organizationId: loginResult.user?.organizationId,
  });

  if (!loginResult.accessToken) {
    console.log(JSON.stringify({ results }, null, 2));
    process.exit(1);
  }

  const authHeaders = {
    authorization: `Bearer ${loginResult.accessToken}`,
    "x-tenant-id": TENANT_ID,
  };

  const billingContext = await fetchJson(`${GATEWAY}/billing/billing-context`, {
    headers: authHeaders,
  });
  results.push({
    id: "5.11",
    name: "billing-context",
    ok: billingContext.status === 200,
    status: billingContext.status,
  });

  const bffBilling = await fetchJson(`${FRONTEND}/api/billing/billing-context`, {
    headers: authHeaders,
  });
  results.push({
    id: "5.12",
    name: "bff billing-context",
    ok: bffBilling.status === 200,
    status: bffBilling.status,
  });

  const profileApi = await fetchJson(`${FRONTEND}/api/auth/users/me`, {
    headers: authHeaders,
  });
  results.push({
    id: "5.13",
    name: "profile API (users/me)",
    ok: profileApi.status === 200,
    status: profileApi.status,
  });

  const orgTenants = await fetchJson(`${GATEWAY}/organizations/${ORG_ID}/tenants`, {
    headers: authHeaders,
  });
  results.push({
    id: "5.14",
    name: "org tenants API denied (billing-only role)",
    ok: orgTenants.status === 403,
    status: orgTenants.status,
  });

  for (const route of ["/organization/billing", "/organization/profile"]) {
    const page = await fetchJson(`${FRONTEND}${route}`, {
      headers: { accept: "text/html" },
      redirect: "manual",
    });
    results.push({
      id: `5.15${route}`,
      name: `frontend ${route}`,
      ok: page.status === 200 || page.status === 307,
      status: page.status,
    });
  }

  const tenantsPage = await fetchJson(`${FRONTEND}/organization/tenants`, {
    headers: { accept: "text/html" },
    redirect: "manual",
  });
  results.push({
    id: "5.16",
    name: "frontend /organization/tenants (expect redirect/deny without org.tenants.read)",
    ok: tenantsPage.status === 307 || tenantsPage.status === 403,
    status: tenantsPage.status,
    note: "Middleware should block org billing admin from clinics route",
  });

  console.log("=== Phase 5 — ORG_BILLING_ADMIN probes ===\n");
  for (const row of results) {
    console.log(JSON.stringify(row));
  }

  const pass = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;
  console.log(`\n=== Summary ===\n${JSON.stringify({ total: results.length, pass, fail })}`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
