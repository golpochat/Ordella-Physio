const GATEWAY = "http://localhost:3049";
const FRONTEND = "http://localhost:3010";
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
  return { status: response.status, body, headers: response.headers };
}

async function main() {
  const login = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify({
      email: "orgadmin@ordella.dev",
      password: "OrgAdmin123!",
    }),
  });

  const token = login.body?.data?.accessToken ?? login.body?.accessToken;
  if (!token) {
    console.error("Login failed", login.status, login.body);
    process.exit(1);
  }

  const authHeaders = {
    authorization: `Bearer ${token}`,
    "x-tenant-id": TENANT_ID,
  };

  const billingContextGateway = await fetchJson(`${GATEWAY}/billing/billing-context`, {
    headers: authHeaders,
  });

  const billingContextBff = await fetchJson(`${FRONTEND}/api/billing/billing-context`, {
    headers: authHeaders,
  });

  const notifications = await fetchJson(`${FRONTEND}/api/notifications/unread-count`, {
    headers: authHeaders,
  });

  const messaging = await fetchJson(`${FRONTEND}/api/messaging/unread-count`, {
    headers: authHeaders,
  });

  const results = [
    {
      name: "gateway billing-context",
      ok: billingContextGateway.status === 200,
      status: billingContextGateway.status,
    },
    {
      name: "bff billing-context",
      ok: billingContextBff.status === 200,
      status: billingContextBff.status,
    },
    {
      name: "bff notifications unread-count",
      status: notifications.status,
      note: "Org users should not poll this from UI after fix",
    },
    {
      name: "bff messaging unread-count",
      status: messaging.status,
      note: "Org users should not poll this from UI after fix",
    },
  ];

  console.log(JSON.stringify({ results }, null, 2));
  const failed = results.filter((r) => r.ok === false);
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
