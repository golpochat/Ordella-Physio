#!/usr/bin/env node
/**
 * Aggregates per-service Jest coverage for Phase 3 reporting.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dirname, "../..");
const servicesDir = join(repoRoot, "services");

const CRITICAL_SERVICES = [
  "auth-service",
  "api-gateway",
  "tenant-service",
  "patient-service",
  "appointment-service",
  "billing-service",
  "subscription-billing",
  "file-storage",
  "search-index",
  "ai-gateway",
  "ai",
];

const THRESHOLD = 25;

function pct(covered, total) {
  if (!total) return 100;
  return (covered / total) * 100;
}

function readCoverage(serviceDir) {
  const finalPath = join(servicesDir, serviceDir, "coverage", "coverage-final.json");
  const summaryPath = join(servicesDir, serviceDir, "coverage", "coverage-summary.json");

  if (existsSync(summaryPath)) {
    const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
    const total = summary.total;
    if (!total) return null;
    return {
      lines: total.lines.pct,
      branches: total.branches.pct,
      functions: total.functions.pct,
      statements: total.statements.pct,
    };
  }

  if (!existsSync(finalPath)) {
    return null;
  }

  const final = JSON.parse(readFileSync(finalPath, "utf8"));
  const totals = {
    lines: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
    functions: { covered: 0, total: 0 },
    statements: { covered: 0, total: 0 },
  };

  for (const entry of Object.values(final)) {
    if (entry.statements) {
      for (const metric of Object.keys(totals)) {
        totals[metric].covered += entry[metric]?.covered ?? 0;
        totals[metric].total += entry[metric]?.total ?? 0;
      }
      continue;
    }

    if (entry.s) {
      const statementHits = Object.values(entry.s);
      totals.statements.covered += statementHits.filter((hit) => hit > 0).length;
      totals.statements.total += statementHits.length;
      totals.lines.covered += statementHits.filter((hit) => hit > 0).length;
      totals.lines.total += statementHits.length;
    }

    if (entry.f) {
      const functionHits = Object.values(entry.f);
      totals.functions.covered += functionHits.filter((hit) => hit > 0).length;
      totals.functions.total += functionHits.length;
    }

    if (entry.b) {
      for (const branchHits of Object.values(entry.b)) {
        totals.branches.covered += branchHits.filter((hit) => hit > 0).length;
        totals.branches.total += branchHits.length;
      }
    }
  }

  return {
    lines: pct(totals.lines.covered, totals.lines.total),
    branches: totals.branches.total ? pct(totals.branches.covered, totals.branches.total) : null,
    functions: pct(totals.functions.covered, totals.functions.total),
    statements: pct(totals.statements.covered, totals.statements.total),
  };
}

function minCoverage(coverage) {
  const values = [coverage.lines, coverage.functions, coverage.statements];
  if (coverage.branches !== null) values.push(coverage.branches);
  return Math.min(...values);
}

function formatPct(value) {
  return typeof value === "number" ? `${value.toFixed(1)}%` : "n/a";
}

const rows = [];
const above = [];
const below = [];

for (const service of CRITICAL_SERVICES) {
  const coverage = readCoverage(service);
  const minPct = coverage ? minCoverage(coverage) : null;

  rows.push({ service, coverage, minPct });

  if (minPct === null) {
    below.push({ service, reason: "no coverage report" });
  } else if (minPct >= THRESHOLD) {
    above.push(service);
  } else {
    below.push({ service, reason: `min metric ${minPct.toFixed(1)}% < ${THRESHOLD}%` });
  }
}

console.log("Ordella Physio — Phase 3 Coverage Report");
console.log("========================================");
console.log(`Threshold reference: ${THRESHOLD}% (controller-focused suites)`);
console.log("");

for (const row of rows) {
  if (!row.coverage) {
    console.log(`- ${row.service}: no coverage data (run pnpm test:cov)`);
    continue;
  }

  console.log(
    `- ${row.service}: lines ${formatPct(row.coverage.lines)}, branches ${row.coverage.branches === null ? "n/a" : formatPct(row.coverage.branches)}, functions ${formatPct(row.coverage.functions)}, statements ${formatPct(row.coverage.statements)}`,
  );
}

console.log("");
console.log(`Above threshold (${above.length}): ${above.length ? above.join(", ") : "none"}`);
console.log(`Below threshold (${below.length}):`);
for (const item of below) {
  console.log(`  - ${item.service}: ${item.reason}`);
}

const suggestions = [
  { area: "billing-service Stripe webhooks", risk: "money-critical" },
  { area: "subscription-billing plan changes", risk: "money-critical" },
  { area: "tenant-service staff/permission endpoints", risk: "tenant-critical" },
  { area: "patient-service medical-record mutations", risk: "PHI-critical" },
  { area: "ai-gateway rate-limit + abuse detection", risk: "AI-critical" },
];

console.log("");
console.log("Suggested next targets (high-risk, likely low coverage):");
for (const item of suggestions) {
  console.log(`  - ${item.area} (${item.risk})`);
}

const otherServices = readdirSync(servicesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !CRITICAL_SERVICES.includes(name));

const otherWithCoverage = otherServices
  .map((service) => ({ service, coverage: readCoverage(service) }))
  .filter((row) => row.coverage);

if (otherWithCoverage.length > 0) {
  console.log("");
  console.log("Other services with coverage data:");
  for (const row of otherWithCoverage) {
    console.log(`  - ${row.service}: lines ${formatPct(row.coverage.lines)}`);
  }
}
