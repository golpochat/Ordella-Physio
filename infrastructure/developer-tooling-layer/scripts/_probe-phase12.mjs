const GATEWAY = "http://localhost:3049";

/** Services present in docker-compose.dev.yml (expect 200 via gateway). */
const DEV_STACK_SERVICES = new Set([
  "auth",
  "tenant",
  "patient",
  "appointment",
  "notes",
  "billing",
  "reporting",
  "messaging",
  "notification",
  "marketplace",
  "enterprise",
  "organization",
  "terminal",
  "user-role",
  "staff",
  "audit",
  "file-storage",
  "notification-provider",
  "pharmacy",
]);

const HEALTH_CHECKS = [
  { id: "gateway", name: "api-gateway", path: "/health", devStack: true },
  { id: "auth", name: "auth (core-service)", path: "/auth/health", devStack: true },
  { id: "tenant", name: "tenant-service", path: "/tenants/health", devStack: true },
  { id: "patient", name: "patient-service", path: "/patients/health", devStack: true },
  { id: "appointment", name: "appointment-service", path: "/appointments/health", devStack: true },
  { id: "notes", name: "notes-service", path: "/notes/health", devStack: true },
  { id: "billing", name: "billing-service", path: "/billing/health", devStack: true },
  { id: "reporting", name: "reporting-service", path: "/reporting/health", devStack: true },
  { id: "messaging", name: "messaging-service", path: "/messaging/health", devStack: true },
  { id: "notification", name: "notification-service", path: "/notifications/health", devStack: true },
  { id: "marketplace", name: "marketplace-service", path: "/marketplace/health", devStack: true },
  { id: "enterprise", name: "enterprise-service", path: "/enterprise/health", devStack: true },
  { id: "organization", name: "organization-service", path: "/organizations/health", devStack: true },
  { id: "terminal", name: "terminal-service", path: "/terminals/health", devStack: true },
  { id: "user-role", name: "user-role-service", path: "/roles/health", devStack: true },
  { id: "staff", name: "staff-service", path: "/staff/health", devStack: true },
  { id: "audit", name: "audit-service", path: "/audit-logs/health", devStack: true },
  { id: "file-storage", name: "file-storage-service", path: "/files/health", devStack: true },
  {
    id: "notification-provider",
    name: "notification-provider-service",
    path: "/notification-providers/health",
    devStack: true,
  },
  { id: "pharmacy", name: "pharmacy-service", path: "/pharmacy/health", devStack: true },
  { id: "payment", name: "payment-service", path: "/payments/health", devStack: false },
  { id: "communication", name: "communication-service", path: "/communication/health", devStack: false },
  { id: "ai-notes", name: "ai-notes-service", path: "/ai/health", devStack: false },
  { id: "search-index", name: "search-index-service", path: "/search-index/health", devStack: false },
  { id: "ai-service", name: "ai-service", path: "/ai/platform/health", devStack: false },
  { id: "ai-training", name: "ai-training-service", path: "/ai/training/health", devStack: false },
  { id: "ai-monitoring", name: "ai-monitoring-service", path: "/ai/drift/health", devStack: false },
  { id: "ai-deploy", name: "ai-deploy-service", path: "/ai/deploy/health", devStack: false },
  { id: "feature-flags", name: "feature-flags-service", path: "/ai/flags/health", devStack: false },
  { id: "ai-gateway", name: "ai-gateway-service", path: "/ai/gateway/health", devStack: false },
  { id: "ai-cost", name: "ai-cost-service", path: "/ai/cost/health", devStack: false },
  { id: "ai-security", name: "ai-security-service", path: "/ai/security/health", devStack: false },
  { id: "ai-observability", name: "ai-observability-service", path: "/ai/observability/health", devStack: false },
  { id: "ai-agents", name: "ai-agents-service", path: "/ai/agents/health", devStack: false },
];

const READY_CHECKS = [
  { id: "messaging-ready", name: "messaging-service", path: "/messaging/ready", devStack: true },
  { id: "notifications-ready", name: "notification-service", path: "/notifications/ready", devStack: true },
  {
    id: "notification-provider-ready",
    name: "notification-provider-service",
    path: "/notification-providers/ready",
    devStack: true,
  },
  { id: "terminals-ready", name: "terminal-service", path: "/terminals/ready", devStack: true },
  { id: "pharmacy-ready", name: "pharmacy-service", path: "/pharmacy/ready", devStack: true },
];

async function probe(path) {
  const url = `${GATEWAY}${path}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    let body = text.slice(0, 120);
    try {
      const json = JSON.parse(text);
      body = JSON.stringify(json).slice(0, 120);
    } catch {
      // keep text snippet
    }
    return { url, status: res.status, body };
  } catch (error) {
    return { url, status: "error", body: String(error).slice(0, 120) };
  }
}

function evaluate(check, result) {
  const inDev = DEV_STACK_SERVICES.has(check.id) || check.devStack === true;
  const ok = inDev ? result.status === 200 : result.status === 502 || result.status === 404;
  const statusLabel = inDev ? (result.status === 200 ? "PASS" : "FAIL") : result.status === 200 ? "PASS" : "PASS*";
  return { ...check, ...result, inDev, ok, statusLabel };
}

console.log("=== Phase 12 — Gateway health probes ===\n");

const healthResults = [];
for (const check of HEALTH_CHECKS) {
  const result = await probe(check.path);
  const evaluated = evaluate(check, result);
  healthResults.push(evaluated);
  console.log(JSON.stringify(evaluated));
}

console.log("\n=== Phase 12 — Gateway ready probes ===\n");

const readyResults = [];
for (const check of READY_CHECKS) {
  const result = await probe(check.path);
  const evaluated = evaluate(check, result);
  readyResults.push(evaluated);
  console.log(JSON.stringify(evaluated));
}

const failures = [...healthResults, ...readyResults].filter((r) => !r.ok);
console.log("\n=== Summary ===");
console.log(
  JSON.stringify({
    total: healthResults.length + readyResults.length,
    pass: healthResults.length + readyResults.length - failures.length,
    fail: failures.length,
    failures: failures.map((f) => ({ id: f.id, path: f.path, status: f.status })),
  }),
);

process.exitCode = failures.length ? 1 : 0;
