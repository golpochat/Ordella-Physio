import type { createAiPaths } from "@/lib/ai-admin-paths";

type AiPaths = ReturnType<typeof createAiPaths>;

export function aiGatewaySectionNav(paths: AiPaths) {
  return [
    { href: paths.gatewayKeys, label: "Keys" },
    { href: paths.gatewayUsage, label: "Usage" },
    { href: paths.gatewayLimits, label: "Limits" },
  ];
}

export function aiCostSectionNav(paths: AiPaths) {
  return [
    { href: paths.cost, label: "Dashboard" },
    { href: paths.costBudget, label: "Budget" },
    { href: paths.costAlerts, label: "Alerts" },
  ];
}

export function aiSecuritySectionNav(paths: AiPaths) {
  return [
    { href: paths.securityAudit, label: "Audit" },
    { href: paths.securityPolicies, label: "Policies" },
    { href: paths.securityPii, label: "PII" },
  ];
}

export function aiObservabilitySectionNav(paths: AiPaths) {
  return [
    { href: paths.observability, label: "Dashboard" },
    { href: paths.observabilityTraces, label: "Traces" },
    { href: paths.observabilityLogs, label: "Logs" },
    { href: paths.observabilityMetrics, label: "Metrics" },
  ];
}
