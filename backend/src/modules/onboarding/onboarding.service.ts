import { prisma } from "../../lib/prisma";

import { ConflictError, ForbiddenError, ValidationError } from "../../utils/api-error";

import { hashPassword } from "../../utils/password";

import { ensureDefaultRoles } from "../rbac/rbac.service";

import { buildAuthResponse } from "../auth/auth.service";

import { writeAuditLog } from "../utilities/audit.service";

import { slugifyClinicName, tenantCodeFromSlug, uniqueTenantSlug } from "../../utils/slug";

import {
  getBillingPeriodAmount,
  getPlanBasePrice,
  isPaidPlan,
  type BillingCycle,
  type PlanId,
} from "../billing/pricing-plans";

import { calculateCheckoutTotals, VAT_RATE_TABLE } from "../billing/vat-rates";

import type {
  CompleteCheckoutInput,
  RegisterWorkspaceInput,
  StartTrialInput,
  UpdateTenantProfileInput,
} from "./onboarding.validation";

import { getTrialDurationDays } from "./trial.service";

function deriveAdminName(email: string, firstName?: string, lastName?: string) {
  if (firstName?.trim()) {
    return {
      firstName: firstName.trim(),
      lastName: lastName?.trim() || "Admin",
    };
  }

  const localPart = email.split("@")[0] ?? "admin";
  const normalized = localPart.replace(/[._-]+/g, " ").trim();
  const [first, ...rest] = normalized.split(/\s+/);
  return {
    firstName: first.charAt(0).toUpperCase() + first.slice(1),
    lastName: rest.length > 0 ? rest.join(" ") : "Admin",
  };
}

async function assertEmailAvailable(email: string) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new ConflictError(
      "An account with this email already exists. Sign in or use a different email.",
    );
  }
}

async function createTenantWorkspace(input: {
  clinicName: string;
  email: string;
  password: string;
  plan: PlanId;
  status: "TRIALING" | "REGISTERED" | "ACTIVE";
  trialStart?: Date;
  trialEnd?: Date;
  timezone?: string;
  country?: string;
}) {
  const email = input.email.toLowerCase();
  await assertEmailAvailable(email);

  const baseSlug = slugifyClinicName(input.clinicName);
  const slug = await uniqueTenantSlug(baseSlug, async (candidate) => {
    const found = await prisma.tenant.findUnique({ where: { slug: candidate } });
    return Boolean(found);
  });

  const code = tenantCodeFromSlug(slug);
  const now = new Date();
  const passwordHash = await hashPassword(input.password);
  const { firstName, lastName } = deriveAdminName(email);

  return prisma.$transaction(async (tx) => {
    const tenant = await tx.tenant.create({
      data: {
        name: input.clinicName.trim(),
        slug,
        code,
        status: input.status,
        timezone: input.timezone ?? "UTC",
        currency: "EUR",
        country: input.country,
        subscriptionPlan: input.plan,
        trialStart: input.trialStart,
        trialEnd: input.trialEnd,
        profileCompletion: {
          clinicProfile: false,
          therapists: false,
          locations: false,
          billing: false,
          integrations: false,
        },
      },
    });

    await ensureDefaultRoles(tenant.id);

    const adminRole = await tx.role.findUniqueOrThrow({
      where: { tenantId_name: { tenantId: tenant.id, name: "ADMIN" } },
    });

    const user = await tx.user.create({
      data: {
        tenantId: tenant.id,
        email,
        passwordHash,
        firstName,
        lastName,
        passwordChangedAt: now,
        roles: { create: [{ roleId: adminRole.id }] },
      },
    });

    return { tenant, user };
  });
}

function buildTenantPayload(tenant: {
  id: string;
  name: string;
  slug: string;
  status: string;
  trialStart: Date | null;
  trialEnd: Date | null;
  subscriptionPlan: string | null;
}) {
  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    status: tenant.status,
    trialStart: tenant.trialStart,
    trialEnd: tenant.trialEnd,
    subscriptionPlan: tenant.subscriptionPlan,
  };
}

export function getOnboardingConfig() {
  return {
    trialDurationDays: getTrialDurationDays(),
    vatCountries: VAT_RATE_TABLE,
    plans: ["starter", "pro", "enterprise"],
  };
}

export async function registerWorkspace(
  input: RegisterWorkspaceInput & { ipAddress?: string; userAgent?: string },
) {
  if (input.intent === "checkout" && !isPaidPlan(input.plan)) {
    throw new ValidationError("Enterprise plans require a sales-assisted checkout.");
  }

  const now = new Date();
  const trialEnd =
    input.intent === "trial"
      ? new Date(now.getTime() + getTrialDurationDays() * 24 * 60 * 60 * 1000)
      : undefined;

  const result = await createTenantWorkspace({
    clinicName: input.clinicName,
    email: input.email,
    password: input.password,
    plan: input.plan,
    status: input.intent === "trial" ? "TRIALING" : "REGISTERED",
    trialStart: input.intent === "trial" ? now : undefined,
    trialEnd,
  });

  await writeAuditLog({
    tenantId: result.tenant.id,
    userId: result.user.id,
    action: input.intent === "trial" ? "onboarding.trial_started" : "onboarding.registered",
    entity: "Tenant",
    entityId: result.tenant.id,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    metadata: {
      plan: input.plan,
      billingCycle: input.billingCycle,
      intent: input.intent,
      trialEnd: trialEnd?.toISOString(),
    },
  });

  const auth = await buildAuthResponse(result.user.id, result.tenant.id, result.user.email);

  return {
    ...auth,
    tenant: buildTenantPayload(result.tenant),
    intent: input.intent,
    billingCycle: input.billingCycle,
    plan: input.plan,
  };
}

export async function startTrial(input: StartTrialInput & { ipAddress?: string; userAgent?: string }) {
  return registerWorkspace({
    clinicName: input.clinicName,
    email: input.email,
    password: input.password,
    plan: input.plan,
    billingCycle: input.billingCycle ?? "yearly",
    intent: "trial",
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });
}

export function previewCheckout(input: {
  plan: PlanId;
  billingCycle: BillingCycle;
  billingCountry: string;
}) {
  if (!isPaidPlan(input.plan)) {
    throw new ValidationError("Enterprise plan requires custom pricing.");
  }

  const baseAmount = getBillingPeriodAmount(input.plan, input.billingCycle);
  const totals = calculateCheckoutTotals(baseAmount, input.billingCountry);
  const monthlyEquivalent = getPlanBasePrice(input.plan, input.billingCycle);

  return {
    plan: input.plan,
    billingCycle: input.billingCycle,
    monthlyEquivalent,
    ...totals,
    renewalLabel: input.billingCycle === "yearly" ? "Renews yearly" : "Renews monthly",
  };
}

function validateCardDetails(input: CompleteCheckoutInput) {
  const digits = input.cardNumber.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(digits)) {
    throw new ValidationError("Enter a valid card number.");
  }

  if (!/^\d{2}\/\d{2}$/.test(input.cardExpiry)) {
    throw new ValidationError("Enter expiry as MM/YY.");
  }

  if (!/^\d{3,4}$/.test(input.cardCvc)) {
    throw new ValidationError("Enter a valid CVC.");
  }
}

function addBillingPeriod(date: Date, billingCycle: BillingCycle): Date {
  const next = new Date(date);
  if (billingCycle === "yearly") {
    next.setFullYear(next.getFullYear() + 1);
  } else {
    next.setMonth(next.getMonth() + 1);
  }
  return next;
}

export async function completeCheckout(
  tenantId: string,
  userId: string,
  input: CompleteCheckoutInput & { ipAddress?: string; userAgent?: string },
) {
  validateCardDetails(input);

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) {
    throw new ForbiddenError("Tenant not found");
  }

  if (tenant.status !== "REGISTERED" && tenant.status !== "TRIAL_EXPIRED") {
    throw new ValidationError("This clinic workspace is not eligible for checkout.");
  }

  const preview = previewCheckout({
    plan: input.plan,
    billingCycle: input.billingCycle,
    billingCountry: input.billingCountry,
  });

  const periodStart = new Date();
  const periodEnd = addBillingPeriod(periodStart, input.billingCycle);

  const result = await prisma.$transaction(async (tx) => {
    const subscription = await tx.platformSubscription.create({
      data: {
        tenantId,
        planId: input.plan,
        billingCycle: input.billingCycle,
        baseAmount: preview.baseAmount,
        vatRate: preview.vatRate,
        vatAmount: preview.vatAmount,
        totalAmount: preview.totalAmount,
        billingCountry: preview.billingCountry,
        billingStreet: input.billingStreet,
        billingCity: input.billingCity,
        billingPostal: input.billingPostal,
        companyName: input.companyName,
        cardholderName: input.cardholderName,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      },
    });

    const invoice = await tx.platformInvoice.create({
      data: {
        subscriptionId: subscription.id,
        periodStart,
        periodEnd,
        baseAmount: preview.baseAmount,
        vatRate: preview.vatRate,
        vatAmount: preview.vatAmount,
        totalAmount: preview.totalAmount,
      },
    });

    const updatedTenant = await tx.tenant.update({
      where: { id: tenantId },
      data: {
        status: "ACTIVE",
        subscriptionPlan: input.plan,
        trialStart: null,
        trialEnd: null,
        country: preview.billingCountryLabel,
      },
    });

    return { subscription, invoice, tenant: updatedTenant };
  });

  await writeAuditLog({
    tenantId,
    userId,
    action: "onboarding.checkout_completed",
    entity: "PlatformSubscription",
    entityId: result.subscription.id,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    metadata: {
      plan: input.plan,
      billingCycle: input.billingCycle,
      totalAmount: preview.totalAmount,
      invoiceId: result.invoice.id,
    },
  });

  return {
    subscription: result.subscription,
    invoice: result.invoice,
    tenant: buildTenantPayload(result.tenant),
    checkout: preview,
  };
}

export function computeProfileCompletion(profile: Record<string, boolean> | null | undefined): number {
  const steps = profile ?? {};
  const keys = ["clinicProfile", "therapists", "locations", "billing", "integrations"];
  const completed = keys.filter((key) => steps[key]).length;
  return Math.round((completed / keys.length) * 100);
}

export async function getTenantProfile(tenantId: string) {
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) {
    throw new ForbiddenError("Tenant not found");
  }

  const profileCompletion = (tenant.profileCompletion as Record<string, boolean> | null) ?? {};

  return {
    id: tenant.id,
    name: tenant.name,
    address: tenant.address,
    city: tenant.city,
    postalCode: tenant.postalCode,
    country: tenant.country,
    timezone: tenant.timezone,
    logoUrl: tenant.logoUrl,
    vatNumber: tenant.vatNumber,
    profileCompletion,
    profileCompletionPercent: computeProfileCompletion(profileCompletion),
  };
}

export async function updateTenantProfile(tenantId: string, input: UpdateTenantProfileInput) {
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) {
    throw new ForbiddenError("Tenant not found");
  }

  const mergedCompletion = {
    ...((tenant.profileCompletion as Record<string, boolean> | null) ?? {}),
    ...(input.profileCompletion ?? {}),
  };

  const updated = await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      name: input.name,
      address: input.address,
      city: input.city,
      postalCode: input.postalCode,
      country: input.country,
      timezone: input.timezone,
      logoUrl: input.logoUrl === "" ? null : input.logoUrl,
      vatNumber: input.vatNumber,
      profileCompletion: mergedCompletion,
    },
  });

  const profileCompletion = (updated.profileCompletion as Record<string, boolean> | null) ?? {};

  return {
    id: updated.id,
    name: updated.name,
    address: updated.address,
    city: updated.city,
    postalCode: updated.postalCode,
    country: updated.country,
    timezone: updated.timezone,
    logoUrl: updated.logoUrl,
    vatNumber: updated.vatNumber,
    profileCompletion,
    profileCompletionPercent: computeProfileCompletion(profileCompletion),
  };
}
