const GATEWAY = "http://localhost:3049";
const FRONTEND = "http://localhost:3010";
const TENANT_ID = "demo-tenant";

const USERS = [
  { label: "ORG_ADMIN", email: "orgadmin@ordella.dev", password: "OrgAdmin123!" },
  { label: "ORG_BILLING_ADMIN", email: "orgbillingadmin@ordella.dev", password: "OrgBillingAdmin123!" },
];

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

async function loginUser(credentials) {
  const { status, body } = await fetchJson(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": TENANT_ID,
    },
    body: JSON.stringify(credentials),
  });

  const data = body?.data ?? body;
  return { status, accessToken: data?.accessToken, user: data?.user };
}

async function main() {
  const results = [];

  for (const account of USERS) {
    const login = await loginUser({ email: account.email, password: account.password });
    if (!login.accessToken) {
      results.push({ role: account.label, name: "login", ok: false, status: login.status });
      continue;
    }

    const authHeaders = {
      authorization: `Bearer ${login.accessToken}`,
      "x-tenant-id": TENANT_ID,
    };

    const profileApi = await fetchJson(`${GATEWAY}/auth/users/me`, { headers: authHeaders });
    const profileData = profileApi.body?.data ?? profileApi.body;

    results.push({
      role: account.label,
      name: "GET auth/users/me includes mfaEnabled",
      ok: profileApi.status === 200 && typeof profileData?.mfaEnabled === "boolean",
      status: profileApi.status,
      mfaEnabled: profileData?.mfaEnabled,
    });

    const changePasswordBad = await fetchJson(`${GATEWAY}/auth/users/change-password`, {
      method: "POST",
      headers: { ...authHeaders, "content-type": "application/json" },
      body: JSON.stringify({
        currentPassword: "wrong-password",
        newPassword: "NewPassword123!",
        confirmPassword: "NewPassword123!",
      }),
    });

    results.push({
      role: account.label,
      name: "POST change-password rejects wrong current password",
      ok: changePasswordBad.status === 400 || changePasswordBad.status === 401 || changePasswordBad.status === 422,
      status: changePasswordBad.status,
    });

    const profilePage = await fetchJson(`${FRONTEND}/organization/profile`, {
      headers: { accept: "text/html", cookie: "" },
      redirect: "manual",
    });

    results.push({
      role: account.label,
      name: "organization profile page reachable",
      ok: profilePage.status === 200 || profilePage.status === 307,
      status: profilePage.status,
    });
  }

  console.log("=== BL-5.4 — org profile security ===\n");
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
