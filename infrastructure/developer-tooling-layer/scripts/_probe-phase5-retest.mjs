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
  return { status: response.status, body, headers: response.headers };
}

async function loginOrgAdmin() {
  const { status, body } = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify(ORG_ADMIN),
  });

  const data = body?.data ?? body;
  return {
    status,
    accessToken: data?.accessToken,
    user: data?.user,
  };
}

async function main() {
  const login = await loginOrgAdmin();
  if (!login.accessToken) {
    console.error("Login failed", login.status);
    process.exit(1);
  }

  const authHeaders = {
    authorization: `Bearer ${login.accessToken}`,
    "x-tenant-id": TENANT_ID,
  };

  const profilePage = await fetchJson(`${FRONTEND}/organization/profile`, {
    headers: { accept: "text/html" },
    redirect: "manual",
  });

  const billingPage = await fetchJson(`${FRONTEND}/organization/billing`, {
    headers: { accept: "text/html" },
    redirect: "manual",
  });

  const profileApi = await fetchJson(`${FRONTEND}/api/auth/users/me`, {
    headers: authHeaders,
  });

  const billingContext = await fetchJson(`${FRONTEND}/api/billing/billing-context`, {
    headers: authHeaders,
  });

  const results = [
    {
      id: "5.6",
      name: "organization profile page (HTML)",
      ok: profilePage.status === 200 || profilePage.status === 307,
      status: profilePage.status,
    },
    {
      id: "5.6b",
      name: "auth users/me for profile form",
      ok: profileApi.status === 200,
      status: profileApi.status,
      email: profileApi.body?.data?.email ?? profileApi.body?.email,
    },
    {
      id: "5.7",
      name: "billing-context (no console 403 regression)",
      ok: billingContext.status === 200,
      status: billingContext.status,
    },
    {
      id: "5.8",
      name: "organization billing page (HTML)",
      ok: billingPage.status === 200 || billingPage.status === 307,
      status: billingPage.status,
    },
  ];

  console.log("=== Phase 5 retest — org profile (5.6–5.8) ===\n");
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
