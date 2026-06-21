const GATEWAY = "http://localhost:3049";
const FRONTEND = "http://localhost:3010";
const TENANT_ID = "demo-tenant";
const ORG_ADMIN = {
  email: "orgadmin@ordella.dev",
  password: "OrgAdmin123!",
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

async function loginOrgAdmin() {
  const { status, body } = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify({
      email: ORG_ADMIN.email,
      password: ORG_ADMIN.password,
    }),
  });

  const data = body?.data ?? body;
  const accessToken = data?.accessToken;
  const user = data?.user;

  return { status, accessToken, user, body };
}

async function main() {
  const results = [];

  const health = await fetchJson(`${GATEWAY}/organizations/health`);
  results.push({
    id: "5.0",
    name: "organization-service health",
    ok: health.status === 200,
    status: health.status,
    statusLabel: health.status === 200 ? "PASS" : "FAIL",
  });

  const login = await loginOrgAdmin();
  const roleOk = login.user?.role === "ORG_ADMIN";
  results.push({
    id: "5.1",
    name: "ORG_ADMIN login",
    ok: login.status === 200 && roleOk && Boolean(login.accessToken),
    status: login.status,
    role: login.user?.role,
    organizationId: login.user?.organizationId,
    statusLabel: login.status === 200 && roleOk ? "PASS" : "FAIL",
  });

  if (!login.accessToken) {
    console.log(JSON.stringify({ results, summary: { pass: results.filter((r) => r.ok).length, fail: results.filter((r) => !r.ok).length } }));
    process.exit(1);
  }

  const billingContext = await fetchJson(
    `${GATEWAY}/tenants/internal/billing-context/${encodeURIComponent(TENANT_ID)}`,
    {
      headers: {
        authorization: `Bearer ${login.accessToken}`,
        "x-tenant-id": TENANT_ID,
      },
    },
  );

  const ctx = billingContext.body?.data ?? billingContext.body;
  const orgBilling =
    ctx?.billingModel === "organization-level" && ctx?.organizationId === "demo-org";
  results.push({
    id: "5.2",
    name: "billing context (organization-level)",
    ok: billingContext.status === 200 && orgBilling,
    status: billingContext.status,
    billingModel: ctx?.billingModel,
    organizationId: ctx?.organizationId,
    statusLabel: billingContext.status === 200 && orgBilling ? "PASS" : "FAIL",
  });

  const orgList = await fetchJson(`${GATEWAY}/organizations`, {
    headers: {
      authorization: `Bearer ${login.accessToken}`,
    },
  });
  results.push({
    id: "5.3",
    name: "GET /organizations (org admin)",
    ok: orgList.status === 200,
    status: orgList.status,
    statusLabel: orgList.status === 200 ? "PASS" : "FAIL*",
  });

  for (const route of ["/organization", "/organization/billing", "/organization/billing/upgrade"]) {
    const page = await fetchJson(`${FRONTEND}${route}`, {
      headers: { accept: "text/html" },
      redirect: "manual",
    });
    const ok = page.status === 200 || page.status === 307 || page.status === 308;
    results.push({
      id: `5.4${route}`,
      name: `frontend ${route}`,
      ok,
      status: page.status,
      statusLabel: ok ? "PASS*" : "FAIL",
      note: "Unauthenticated HTML probe; full UI needs browser login",
    });
  }

  const pass = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;

  console.log("=== Phase 5 — Organization portal probes ===\n");
  for (const row of results) {
    console.log(JSON.stringify(row));
  }
  console.log(`\n=== Summary ===\n${JSON.stringify({ total: results.length, pass, fail })}`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
