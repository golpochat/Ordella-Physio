import { execSync } from "node:child_process";
import path from "node:path";
import Stripe from "stripe";
import {
  getRepoRoot,
  isPlaceholderPrice,
  isPlaceholderSecret,
  loadStripeEnvFromRepo,
  upsertEnvFile,
} from "./stripe-env-loader";

export type StripeE2eCatalog = {
  starterPriceId: string;
  proPriceId: string;
  enterprisePriceId: string;
  aiNotesPriceId: string;
};

const LOOKUP_KEYS = {
  starter: "ordella_e2e_starter_yearly",
  pro: "ordella_e2e_pro_yearly",
  enterprise: "ordella_e2e_enterprise_yearly",
  aiNotes: "ordella_e2e_ai_notes_metered",
} as const;

let catalogCache: StripeE2eCatalog | null = null;

export { loadStripeEnvFromRepo };

export function stripeSecretKeyReady(): boolean {
  loadStripeEnvFromRepo();
  return !isPlaceholderSecret(process.env.STRIPE_SECRET_KEY);
}

export function stripeBrowserCheckoutReady(): boolean {
  loadStripeEnvFromRepo();
  if (!stripeSecretKeyReady() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return false;
  }
  return !isPlaceholderPrice(process.env.STRIPE_PRICE_PRO);
}

async function findOrCreateRecurringPrice(
  stripe: Stripe,
  input: {
    lookupKey: string;
    productName: string;
    unitAmount: number;
    interval: "month" | "year";
  },
): Promise<string> {
  const existing = await stripe.prices.list({ lookup_keys: [input.lookupKey], limit: 1 });
  if (existing.data[0]?.id) {
    return existing.data[0].id;
  }

  const product = await stripe.products.create({
    name: input.productName,
    metadata: { ordella_e2e: "true", lookup_key: input.lookupKey },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: "eur",
    unit_amount: input.unitAmount,
    recurring: { interval: input.interval },
    lookup_key: input.lookupKey,
    metadata: { ordella_e2e: "true" },
  });

  return price.id;
}

async function findOrCreateMeteredPrice(stripe: Stripe, lookupKey: string): Promise<string> {
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  if (existing.data[0]?.id) {
    return existing.data[0].id;
  }

  const product = await stripe.products.create({
    name: "Ordella E2E AI Notes",
    metadata: { ordella_e2e: "true", lookup_key: lookupKey },
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
    metadata: { ordella_e2e: "true" },
  });

  return price.id;
}

export async function ensureStripeE2eCatalog(): Promise<StripeE2eCatalog> {
  if (catalogCache) {
    return catalogCache;
  }

  loadStripeEnvFromRepo();
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || isPlaceholderSecret(secretKey)) {
    throw new Error("STRIPE_SECRET_KEY is not configured for browser checkout E2E.");
  }

  const stripe = new Stripe(secretKey);

  const catalog: StripeE2eCatalog = {
    starterPriceId: await findOrCreateRecurringPrice(stripe, {
      lookupKey: LOOKUP_KEYS.starter,
      productName: "Ordella E2E Starter",
      unitAmount: 4900,
      interval: "year",
    }),
    proPriceId: await findOrCreateRecurringPrice(stripe, {
      lookupKey: LOOKUP_KEYS.pro,
      productName: "Ordella E2E Pro",
      unitAmount: 9900,
      interval: "year",
    }),
    enterprisePriceId: await findOrCreateRecurringPrice(stripe, {
      lookupKey: LOOKUP_KEYS.enterprise,
      productName: "Ordella E2E Enterprise",
      unitAmount: 19900,
      interval: "year",
    }),
    aiNotesPriceId: await findOrCreateMeteredPrice(stripe, LOOKUP_KEYS.aiNotes),
  };

  catalogCache = catalog;
  return catalog;
}

async function waitForBillingCheckoutReady(timeoutMs = 90_000): Promise<void> {
  const gatewayUrl = process.env.API_GATEWAY_URL ?? "http://localhost:3049";
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${gatewayUrl}/billing/health`);
      if (response.ok) {
        return;
      }
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 2_000));
  }
  throw new Error("billing-service did not become ready after Stripe catalog sync");
}

export async function syncStripeCatalogToBillingService(catalog: StripeE2eCatalog): Promise<void> {
  const repoRoot = getRepoRoot();
  const updates = {
    STRIPE_PRICE_STARTER: catalog.starterPriceId,
    STRIPE_PRICE_PRO: catalog.proPriceId,
    STRIPE_PRICE_ENTERPRISE: catalog.enterprisePriceId,
    STRIPE_PRICE_AI_NOTES: catalog.aiNotesPriceId,
  };

  upsertEnvFile(path.join(repoRoot, ".env"), updates);
  upsertEnvFile(path.join(repoRoot, "services/billing-service/.env"), updates);

  for (const [key, value] of Object.entries(updates)) {
    process.env[key] = value;
  }

  try {
    execSync(
      "docker compose -f docker-compose.dev.yml up -d --force-recreate billing-service api-gateway core-service",
      {
        cwd: repoRoot,
        stdio: "pipe",
      },
    );
    await waitForBillingCheckoutReady();
  } catch (error) {
    console.warn(
      `[billing-e2e] Could not recreate billing-service container: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function ensureStripeBrowserCheckoutEnvironment(): Promise<void> {
  loadStripeEnvFromRepo();
  if (!stripeSecretKeyReady()) {
    return;
  }

  if (stripeBrowserCheckoutReady()) {
    return;
  }

  const catalog = await ensureStripeE2eCatalog();
  await syncStripeCatalogToBillingService(catalog);
}
