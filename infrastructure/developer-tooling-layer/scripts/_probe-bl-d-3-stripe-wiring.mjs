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

async function login(email, password) {
  const { status, body } = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify({ email, password }),
  });
  const data = body?.data ?? body;
  return { status, accessToken: data?.accessToken };
}

async function main() {
  const loginResult = await login("clinicadmin@ordella.dev", "ClinicAdmin123!");
  if (!loginResult.accessToken) {
    console.error("Login failed", loginResult.status);
    process.exit(1);
  }

  const headers = {
    authorization: `Bearer ${loginResult.accessToken}`,
    "x-tenant-id": TENANT_ID,
    "content-type": "application/json",
  };

  const subscription = await fetchJson(`${GATEWAY}/billing/subscription`, { headers });
  const subData = subscription.body?.data ?? subscription.body;

  const billingContext = await fetchJson(`${GATEWAY}/billing/billing-context`, { headers });
  const contextData = billingContext.body?.data ?? billingContext.body;

  const invoices = await fetchJson(`${GATEWAY}/billing/invoices`, { headers });

  const portal = await fetchJson(`${GATEWAY}/billing/customer-portal`, {
    method: "POST",
    headers,
    body: JSON.stringify({ returnUrl: "http://localhost:3010/clinic/billing" }),
  });
  const portalData = portal.body?.data ?? portal.body;

  const checkout = await fetchJson(`${GATEWAY}/billing/checkout-session`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      plan: "pro",
      billingCycle: "yearly",
      email: "clinicadmin@ordella.dev",
      name: "Demo Clinic",
    }),
  });
  const checkoutData = checkout.body?.data ?? checkout.body;

  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
  const realStripe =
    stripeKey.startsWith("sk_test_") && !stripeKey.toLowerCase().includes("local_dev");

  const results = [
    {
      name: "GET /billing/subscription returns 200",
      ok: subscription.status === 200,
      status: subscription.status,
    },
    {
      name: "demo org subscription is not none",
      ok: subData?.status && subData.status !== "none",
      status: subData?.status,
      plan: subData?.plan,
    },
    {
      name: "GET /billing/billing-context returns 200",
      ok: billingContext.status === 200,
      billingModel: contextData?.billingModel,
    },
    {
      name: "GET /billing/invoices does not 5xx (mock mode returns [])",
      ok: invoices.status === 200,
      status: invoices.status,
    },
    {
      name: "POST customer-portal returns portal URL",
      ok: (portal.status === 200 || portal.status === 201) && Boolean(portalData?.url),
      status: portal.status,
    },
    {
      name: "POST checkout-session returns checkout URL",
      ok: (checkout.status === 200 || checkout.status === 201) && Boolean(checkoutData?.url),
      status: checkout.status,
      hasUrl: Boolean(checkoutData?.url),
      mockOrStripe: realStripe ? "stripe" : "mock/local",
    },
  ];

  console.log("=== BL-D.3 — Stripe local wiring ===\n");
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
