import type { PostalAddress } from "@/lib/postal-address";

const STORAGE_KEY = "ordella:checkout-draft";
const DRAFT_VERSION = 1;

export type CheckoutDraftContext = {
  plan: string;
  cycle: string;
  intent: string;
};

export type CheckoutDraft = CheckoutDraftContext & {
  version: typeof DRAFT_VERSION;
  billingAddress: PostalAddress;
  companyName: string;
  savedAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPostalAddress(value: unknown): value is PostalAddress {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.line1 === "string" &&
    typeof value.line2 === "string" &&
    typeof value.city === "string" &&
    typeof value.region === "string" &&
    typeof value.postalCode === "string" &&
    typeof value.country === "string"
  );
}

function isCheckoutDraft(value: unknown): value is CheckoutDraft {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.version === DRAFT_VERSION &&
    typeof value.plan === "string" &&
    typeof value.cycle === "string" &&
    typeof value.intent === "string" &&
    typeof value.companyName === "string" &&
    typeof value.savedAt === "string" &&
    isPostalAddress(value.billingAddress)
  );
}

function matchesContext(draft: CheckoutDraft, context: CheckoutDraftContext): boolean {
  return (
    draft.plan === context.plan &&
    draft.cycle === context.cycle &&
    draft.intent === context.intent
  );
}

export function hasCheckoutDraftContent(draft: Pick<CheckoutDraft, "billingAddress" | "companyName">): boolean {
  const { billingAddress, companyName } = draft;

  return Boolean(
    companyName.trim() ||
      billingAddress.line1.trim() ||
      billingAddress.line2.trim() ||
      billingAddress.city.trim() ||
      billingAddress.region.trim() ||
      billingAddress.postalCode.trim(),
  );
}

export function readCheckoutDraft(context: CheckoutDraftContext): CheckoutDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!isCheckoutDraft(parsed) || !matchesContext(parsed, context)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeCheckoutDraft(draft: CheckoutDraft): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!hasCheckoutDraftContent(draft)) {
    clearCheckoutDraft();
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Non-fatal — checkout can continue without draft persistence.
  }
}

export function clearCheckoutDraft(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures on clear.
  }
}
