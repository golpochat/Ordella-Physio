const GATEWAY = "http://localhost:3049";
const TENANT_ID = "demo-tenant";

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

async function main() {
  const login = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify({
      email: "clinicadmin@ordella.dev",
      password: "ClinicAdmin123!",
    }),
  });

  const data = login.body?.data ?? login.body;
  const token = data?.accessToken;
  if (!token) {
    console.error("Login failed", login.status, login.body);
    process.exit(1);
  }

  const authHeaders = {
    authorization: `Bearer ${token}`,
    "x-tenant-id": TENANT_ID,
  };

  const tenantSubscription = await fetchJson(
    `${GATEWAY}/tenants/${TENANT_ID}/subscription`,
    { headers: authHeaders },
  );
  const tenantPlan =
    tenantSubscription.body?.data?.plan ?? tenantSubscription.body?.plan ?? null;

  const enterpriseSso = await fetchJson(`${GATEWAY}/enterprise/sso`, {
    headers: authHeaders,
  });

  const billingSubscription = await fetchJson(`${GATEWAY}/billing/subscription`, {
    headers: authHeaders,
  });
  const billingPlan =
    billingSubscription.body?.data?.plan ??
    billingSubscription.body?.data?.subscription?.plan ??
    billingSubscription.body?.plan ??
    null;

  const results = [
    {
      name: "GET /tenants/:id/subscription returns 200",
      ok: tenantSubscription.status === 200,
      status: tenantSubscription.status,
    },
    {
      name: "tenant subscription plan is ENTERPRISE",
      ok: tenantPlan === "ENTERPRISE",
      plan: tenantPlan,
    },
    {
      name: "GET /enterprise/sso returns 200 (not 403)",
      ok: enterpriseSso.status === 200,
      status: enterpriseSso.status,
      body: typeof enterpriseSso.body === "string" ? enterpriseSso.body.slice(0, 120) : enterpriseSso.body,
    },
    {
      name: "GET /billing/subscription plan is ENTERPRISE",
      ok: billingPlan === "ENTERPRISE",
      plan: billingPlan,
    },
  ];

  console.log("=== BL-D.5 — enterprise plan on demo-tenant ===\n");
  for (const row of results) {
    console.log(JSON.stringify(row));
  }

  const fail = results.filter((r) => !r.ok).length;
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
