#!/usr/bin/env node
/**
 * Provision Stripe test price IDs and write them to repo .env files for local Docker billing.
 *
 * Prerequisites:
 *   - STRIPE_SECRET_KEY=sk_test_... in repo root `.env` (or exported in shell)
 *
 * Usage:
 *   pnpm stripe:wire-local
 *   pnpm stripe:wire-local -- --recreate-billing
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");
const ROOT_ENV = path.join(REPO_ROOT, ".env");
const BILLING_ENV = path.join(REPO_ROOT, "services/billing-service/.env");

const LOOKUP_KEYS = {
  starter: "ordella_local_starter_yearly",
  pro: "ordella_local_pro_yearly",
  enterprise: "ordella_local_enterprise_yearly",
  aiNotes: "ordella_local_ai_notes_metered",
};

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const entries = {};
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

function upsertEnvFile(filePath, updates) {
  const lines = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8").split(/\r?\n/) : [];
  const seen = new Set();
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

function loadEnv() {
  for (const filePath of [ROOT_ENV, BILLING_ENV]) {
    for (const [key, value] of Object.entries(parseEnvFile(filePath))) {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

function isPlaceholderSecret(value) {
  if (!value) {
    return true;
  }
  const normalized = value.toLowerCase();
  return (
    normalized.includes("change-me") ||
    normalized.includes("change_me") ||
    normalized.includes("local_dev") ||
    normalized === "sk_test_local_dev"
  );
}

async function findOrCreateRecurringPrice(stripe, input) {
  const existing = await stripe.prices.list({ lookup_keys: [input.lookupKey], limit: 1 });
  if (existing.data[0]?.id) {
    return existing.data[0].id;
  }

  const product = await stripe.products.create({
    name: input.productName,
    metadata: { ordella_local: "true", lookup_key: input.lookupKey },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: "eur",
    unit_amount: input.unitAmount,
    recurring: { interval: input.interval },
    lookup_key: input.lookupKey,
    metadata: { ordella_local: "true" },
  });

  return price.id;
}

async function findOrCreateMeteredPrice(stripe, lookupKey) {
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  if (existing.data[0]?.id) {
    return existing.data[0].id;
  }

  const product = await stripe.products.create({
    name: "Ordella Local AI Notes",
    metadata: { ordella_local: "true", lookup_key: lookupKey },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: "eur",
    unit_amount: 50,
    recurring: {
      interval: "month",
      usage_type: "metered",
      aggregate_usage: "sum",
    },
    lookup_key: lookupKey,
    metadata: { ordella_local: "true" },
  });

  return price.id;
}

async function main() {
  loadEnv();

  const recreateBilling = process.argv.includes("--recreate-billing");
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || isPlaceholderSecret(secretKey)) {
    console.error(
      [
        "STRIPE_SECRET_KEY is missing or still a placeholder.",
        "",
        "1. Copy `.env.example` to `.env` at the repo root",
        "2. Set STRIPE_SECRET_KEY=sk_test_... from https://dashboard.stripe.com/test/apikeys",
        "3. Re-run: pnpm stripe:wire-local",
        "",
        "For mock-only local demo (no real Stripe checkout), billing-service uses",
        "sk_test_local_dev_stripe_secret_key from docker-compose.dev.yml defaults.",
      ].join("\n"),
    );
    process.exit(1);
  }

  if (!secretKey.startsWith("sk_test_")) {
    console.error("Refusing to run: STRIPE_SECRET_KEY must be a test key (sk_test_...).");
    process.exit(1);
  }

  const stripe = new Stripe(secretKey);

  console.log("Provisioning Stripe test catalog for local dev...\n");

  const catalog = {
    STRIPE_PRICE_STARTER: await findOrCreateRecurringPrice(stripe, {
      lookupKey: LOOKUP_KEYS.starter,
      productName: "Ordella Local Starter",
      unitAmount: 4900,
      interval: "year",
    }),
    STRIPE_PRICE_PRO: await findOrCreateRecurringPrice(stripe, {
      lookupKey: LOOKUP_KEYS.pro,
      productName: "Ordella Local Pro",
      unitAmount: 9900,
      interval: "year",
    }),
    STRIPE_PRICE_ENTERPRISE: await findOrCreateRecurringPrice(stripe, {
      lookupKey: LOOKUP_KEYS.enterprise,
      productName: "Ordella Local Enterprise",
      unitAmount: 19900,
      interval: "year",
    }),
    STRIPE_PRICE_AI_NOTES: await findOrCreateMeteredPrice(stripe, LOOKUP_KEYS.aiNotes),
  };

  const envUpdates = {
    STRIPE_SECRET_KEY: secretKey,
    STRIPE_WEBHOOK_SECRET:
      process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_local_dev_stripe_webhook_secret",
    ...catalog,
  };

  upsertEnvFile(ROOT_ENV, envUpdates);
  upsertEnvFile(BILLING_ENV, envUpdates);

  console.log("Updated env files:");
  console.log(`  ${ROOT_ENV}`);
  console.log(`  ${BILLING_ENV}`);
  console.log("");
  for (const [key, value] of Object.entries(catalog)) {
    console.log(`  ${key}=${value}`);
  }

  if (recreateBilling) {
    console.log("\nRecreating billing-service container...");
    execSync("docker compose -f docker-compose.dev.yml up -d --no-deps --force-recreate billing-service", {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });
  } else {
    console.log("\nRestart billing-service to pick up price IDs:");
    console.log("  docker compose -f docker-compose.dev.yml up -d --no-deps --force-recreate billing-service");
  }

  console.log("\nForward Stripe webhooks locally:");
  console.log("  stripe listen --forward-to localhost:3049/billing/webhook");
  console.log("Copy the signing secret into STRIPE_WEBHOOK_SECRET, then restart billing-service.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
