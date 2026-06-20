import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(__dirname, "../../../..");
const ROOT_ENV_PATH = path.join(REPO_ROOT, ".env");
const BILLING_ENV_PATH = path.join(REPO_ROOT, "services/billing-service/.env");

let envLoaded = false;

function parseEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const entries: Record<string, string> = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    entries[key] = value;
  }
  return entries;
}

export function getRepoRoot(): string {
  return REPO_ROOT;
}

export function upsertEnvFile(filePath: string, updates: Record<string, string>): void {
  const lines = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8").split(/\r?\n/) : [];
  const seen = new Set<string>();
  const nextLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return line;
    }
    const eq = trimmed.indexOf("=");
    if (eq <= 0) {
      return line;
    }
    const key = trimmed.slice(0, eq).trim();
    if (updates[key] === undefined) {
      return line;
    }
    seen.add(key);
    return `${key}=${updates[key]}`;
  });

  for (const [key, value] of Object.entries(updates)) {
    if (!seen.has(key)) {
      nextLines.push(`${key}=${value}`);
    }
  }

  fs.writeFileSync(
    filePath,
    `${nextLines.filter((line, index, arr) => !(index === arr.length - 1 && line === "")).join("\n")}\n`,
  );
}

export function loadStripeEnvFromRepo(): void {
  if (envLoaded) {
    return;
  }

  for (const filePath of [ROOT_ENV_PATH, BILLING_ENV_PATH]) {
    for (const [key, value] of Object.entries(parseEnvFile(filePath))) {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }

  envLoaded = true;
}

export function isPlaceholderSecret(value: string | undefined): boolean {
  if (!value) {
    return true;
  }
  const normalized = value.toLowerCase();
  return (
    normalized.includes("change-me") ||
    normalized.includes("change_me") ||
    normalized === "sk_test_local_dev" ||
    normalized === "whsec_local_dev"
  );
}

export function isPlaceholderPrice(value: string | undefined): boolean {
  if (!value) {
    return true;
  }
  const normalized = value.toLowerCase();
  return (
    normalized.includes("change_me") ||
    normalized.includes("change-me") ||
    normalized.startsWith("price_local_") ||
    normalized.startsWith("price_starter_change") ||
    normalized.startsWith("price_pro_change")
  );
}
