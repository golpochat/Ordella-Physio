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

  const staffList = await fetchJson(`${GATEWAY}/staff`, {
    headers: {
      authorization: `Bearer ${token}`,
      "x-tenant-id": TENANT_ID,
    },
  });

  const payload = staffList.body?.data ?? staffList.body;
  const members = payload?.data ?? payload;
  const emails = Array.isArray(members) ? members.map((m) => m.email).sort() : [];

  const results = [
    {
      name: "GET /staff returns 200",
      ok: staffList.status === 200,
      status: staffList.status,
    },
    {
      name: "staff list includes therapist@ordella.dev",
      ok: emails.includes("therapist@ordella.dev"),
      emails,
    },
    {
      name: "staff list includes staff@ordella.dev",
      ok: emails.includes("staff@ordella.dev"),
      emails,
    },
    {
      name: "staff list has at least 3 members",
      ok: Array.isArray(members) && members.length >= 3,
      count: Array.isArray(members) ? members.length : 0,
    },
  ];

  console.log("=== BL-D.1 — staff members seed ===\n");
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
