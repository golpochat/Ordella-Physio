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
  return { status, accessToken: data?.accessToken, user: data?.user };
}

async function main() {
  const therapistLogin = await login("therapist@ordella.dev", "Therapist123!");
  const clinicLogin = await login("clinicadmin@ordella.dev", "ClinicAdmin123!");

  const results = [];

  if (!therapistLogin.accessToken) {
    console.error("Therapist login failed");
    process.exit(1);
  }

  const authHeaders = {
    authorization: `Bearer ${therapistLogin.accessToken}`,
    "x-tenant-id": TENANT_ID,
  };

  const therapistNotes = await fetchJson(
    `${GATEWAY}/notes?therapistId=dev_user_therapist&limit=100`,
    { headers: authHeaders },
  );

  const therapistPayload = therapistNotes.body?.data ?? therapistNotes.body;
  const therapistList = therapistPayload?.data ?? therapistPayload;
  const therapistCount = Array.isArray(therapistList) ? therapistList.length : 0;

  results.push({
    name: "GET /notes?therapistId=dev_user_therapist returns 200",
    ok: therapistNotes.status === 200,
    status: therapistNotes.status,
  });
  results.push({
    name: "therapist notes list has seeded entries",
    ok: therapistCount >= 4,
    count: therapistCount,
  });
  results.push({
    name: "seeded SOAP note present",
    ok: Array.isArray(therapistList) && therapistList.some((n) => n.id === "dev_note_soap_patient1"),
  });

  if (clinicLogin.accessToken) {
    const clinicNotes = await fetchJson(`${GATEWAY}/notes?limit=100`, {
      headers: {
        authorization: `Bearer ${clinicLogin.accessToken}`,
        "x-tenant-id": TENANT_ID,
      },
    });

    const clinicPayload = clinicNotes.body?.data ?? clinicNotes.body;
    const clinicList = clinicPayload?.data ?? clinicPayload;
    const clinicCount = Array.isArray(clinicList) ? clinicList.length : 0;

    results.push({
      name: "clinic admin GET /notes returns 200",
      ok: clinicNotes.status === 200,
      status: clinicNotes.status,
    });
    results.push({
      name: "clinic admin sees seeded notes",
      ok: clinicCount >= 4,
      count: clinicCount,
    });
  }

  console.log("=== BL-D.2 — clinical notes seed ===\n");
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
