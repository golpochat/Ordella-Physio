import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { tenantNotFoundError } from "@/utils/tenant-errors";

const PROFILE_COMPLETION_KEYS = [
  "clinicProfile",
  "therapists",
  "locations",
  "billing",
  "integrations",
] as const;

type ProfileCompletionKey = (typeof PROFILE_COMPLETION_KEYS)[number];
type ProfileCompletion = Record<ProfileCompletionKey, boolean>;

const ONBOARDING_NAMESPACE = "onboarding";

export type TenantProfileResponse = {
  id: string;
  name: string;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  timezone?: string | null;
  logoUrl?: string | null;
  vatNumber?: string | null;
  profileCompletion: ProfileCompletion;
  profileCompletionPercent: number;
};

export type TenantTrialResponse = {
  status: string;
  trialStart: string | null;
  trialEnd: string | null;
  trialDaysRemaining: number | null;
  trialExpired: boolean;
  subscriptionPlan: string | null;
  trialDurationDays: number;
};

export type UpdateTenantProfileInput = {
  name?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  logoUrl?: string;
  vatNumber?: string;
  profileCompletion?: Partial<ProfileCompletion>;
};

function computeProfileCompletionPercent(steps: ProfileCompletion): number {
  const completed = PROFILE_COMPLETION_KEYS.filter((key) => steps[key]).length;
  return Math.round((completed / PROFILE_COMPLETION_KEYS.length) * 100);
}

function readStoredCompletion(data: unknown): Partial<ProfileCompletion> {
  if (!data || typeof data !== "object") {
    return {};
  }

  const record = data as Record<string, unknown>;
  const completion = record.profileCompletion;
  if (!completion || typeof completion !== "object") {
    return {};
  }

  const result: Partial<ProfileCompletion> = {};
  for (const key of PROFILE_COMPLETION_KEYS) {
    if (typeof (completion as Record<string, unknown>)[key] === "boolean") {
      result[key] = (completion as Record<string, boolean>)[key];
    }
  }

  return result;
}

function mergeCompletion(
  computed: ProfileCompletion,
  stored: Partial<ProfileCompletion>,
): ProfileCompletion {
  return {
    clinicProfile: stored.clinicProfile ?? computed.clinicProfile,
    therapists: stored.therapists ?? computed.therapists,
    locations: stored.locations ?? computed.locations,
    billing: stored.billing ?? computed.billing,
    integrations: stored.integrations ?? computed.integrations,
  };
}

function getTrialDurationDays(): number {
  const parsed = Number(process.env.TRIAL_DURATION_DAYS ?? 14);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 14;
}

@Injectable()
export class TenantOnboardingService {
  constructor(private readonly database: DatabaseService) {}

  async getProfile(tenantId: string): Promise<TenantProfileResponse> {
    const tenant = await this.database.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const [branding, billing, locations, therapists, integrationsConfig, onboardingConfig] =
      await Promise.all([
        this.database.tenantBranding.findUnique({ where: { tenantId } }),
        this.database.tenantBillingSettings.findUnique({ where: { tenantId } }),
        this.database.location.findMany({ where: { tenantId }, take: 1 }),
        this.database.staff.findMany({
          where: { tenantId, role: "THERAPIST" },
          take: 1,
        }),
        this.database.tenantConfig.findUnique({
          where: { tenantId_namespace: { tenantId, namespace: "integrations" } },
        }),
        this.database.tenantConfig.findUnique({
          where: { tenantId_namespace: { tenantId, namespace: ONBOARDING_NAMESPACE } },
        }),
      ]);

    const primaryLocation = locations[0];
    const integrationData =
      integrationsConfig?.data && typeof integrationsConfig.data === "object"
        ? (integrationsConfig.data as Record<string, unknown>)
        : {};

    const computed: ProfileCompletion = {
      clinicProfile: Boolean(tenant.name?.trim() && tenant.address?.trim() && tenant.timezone),
      therapists: therapists.length > 0,
      locations: locations.length > 0,
      billing: Boolean(billing?.billingEmail && billing?.taxNumber),
      integrations: Boolean(integrationData.stripePublicKey || integrationData.stripeSecretKey),
    };

    const profileCompletion = mergeCompletion(
      computed,
      readStoredCompletion(onboardingConfig?.data),
    );

    return {
      id: tenant.id,
      name: tenant.name,
      address: tenant.address,
      city: billing?.billingCity ?? primaryLocation?.city ?? null,
      postalCode: billing?.billingPostcode ?? primaryLocation?.postalCode ?? null,
      country: billing?.billingCountry ?? primaryLocation?.country ?? null,
      timezone: tenant.timezone,
      logoUrl: branding?.logoUrl ?? null,
      vatNumber: billing?.taxNumber ?? null,
      profileCompletion,
      profileCompletionPercent: computeProfileCompletionPercent(profileCompletion),
    };
  }

  async updateProfile(
    tenantId: string,
    input: UpdateTenantProfileInput,
    updatedByUserId?: string,
  ): Promise<TenantProfileResponse> {
    const tenant = await this.database.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      throw tenantNotFoundError();
    }

    await this.database.tenant.update({
      where: { id: tenantId },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.address !== undefined ? { address: input.address } : {}),
        ...(input.timezone !== undefined ? { timezone: input.timezone } : {}),
      },
    });

    if (input.logoUrl !== undefined) {
      await this.database.tenantBranding.upsert({
        where: { tenantId },
        create: {
          tenantId,
          logoUrl: input.logoUrl === "" ? null : input.logoUrl,
        },
        update: {
          logoUrl: input.logoUrl === "" ? null : input.logoUrl,
        },
      });
    }

    const hasBillingFields =
      input.city !== undefined ||
      input.postalCode !== undefined ||
      input.country !== undefined ||
      input.vatNumber !== undefined;

    if (hasBillingFields) {
      const existing = await this.database.tenantBillingSettings.findUnique({
        where: { tenantId },
      });

      await this.database.tenantBillingSettings.upsert({
        where: { tenantId },
        create: {
          tenant: { connect: { id: tenantId } },
          billingEmail: existing?.billingEmail ?? "billing@example.com",
          billingContactName: existing?.billingContactName ?? tenant.name,
          billingAddressLine1: existing?.billingAddressLine1 ?? tenant.address ?? "TBD",
          billingCity: input.city ?? existing?.billingCity ?? "TBD",
          billingPostcode: input.postalCode ?? existing?.billingPostcode ?? "TBD",
          billingCountry: input.country ?? existing?.billingCountry ?? "GB",
          taxNumber: input.vatNumber ?? existing?.taxNumber ?? null,
          defaultCurrency: existing?.defaultCurrency ?? tenant.currency ?? "GBP",
        },
        update: {
          ...(input.city !== undefined ? { billingCity: input.city } : {}),
          ...(input.postalCode !== undefined ? { billingPostcode: input.postalCode } : {}),
          ...(input.country !== undefined ? { billingCountry: input.country } : {}),
          ...(input.vatNumber !== undefined ? { taxNumber: input.vatNumber } : {}),
        },
      });
    }

    if (input.profileCompletion && Object.keys(input.profileCompletion).length > 0) {
      const existingConfig = await this.database.tenantConfig.findUnique({
        where: { tenantId_namespace: { tenantId, namespace: ONBOARDING_NAMESPACE } },
      });
      const stored = readStoredCompletion(existingConfig?.data);
      const merged = { ...stored, ...input.profileCompletion };
      const payload = {
        profileCompletion: merged,
      } as Prisma.InputJsonValue;

      await this.database.tenantConfig.upsert({
        where: { tenantId_namespace: { tenantId, namespace: ONBOARDING_NAMESPACE } },
        create: {
          tenant: { connect: { id: tenantId } },
          namespace: ONBOARDING_NAMESPACE,
          data: payload,
          updatedByUserId: updatedByUserId ?? null,
        },
        update: {
          data: payload,
          updatedByUserId: updatedByUserId ?? null,
        },
      });
    }

    return this.getProfile(tenantId);
  }

  async getTrial(tenantId: string): Promise<TenantTrialResponse> {
    const tenant = await this.database.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const subscription = await this.database.tenantSubscription.findUnique({
      where: { tenantId },
    });

    return {
      status: tenant.status,
      trialStart: null,
      trialEnd: null,
      trialDaysRemaining: null,
      trialExpired: false,
      subscriptionPlan: subscription?.plan ?? null,
      trialDurationDays: getTrialDurationDays(),
    };
  }
}
