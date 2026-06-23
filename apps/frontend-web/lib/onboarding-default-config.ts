import type { OnboardingConfig } from "@/lib/auth-client";

/** Mirrors clinic-backend `getOnboardingConfig()` for microservices-only local stacks. */
export function getDefaultOnboardingConfig(): OnboardingConfig {
  return {
    trialDurationDays: Number(process.env.TRIAL_DURATION_DAYS ?? 14),
    vatCountries: [
      { code: "IE", label: "Ireland", rate: 23 },
      { code: "GB", label: "United Kingdom", rate: 20 },
      { code: "DE", label: "Germany", rate: 19 },
      { code: "FR", label: "France", rate: 20 },
      { code: "ES", label: "Spain", rate: 21 },
      { code: "IT", label: "Italy", rate: 22 },
      { code: "NL", label: "Netherlands", rate: 21 },
      { code: "BE", label: "Belgium", rate: 21 },
      { code: "AT", label: "Austria", rate: 20 },
      { code: "PT", label: "Portugal", rate: 23 },
      { code: "PL", label: "Poland", rate: 23 },
      { code: "SE", label: "Sweden", rate: 25 },
      { code: "DK", label: "Denmark", rate: 25 },
      { code: "FI", label: "Finland", rate: 24 },
      { code: "CZ", label: "Czech Republic", rate: 21 },
      { code: "RO", label: "Romania", rate: 19 },
      { code: "HU", label: "Hungary", rate: 27 },
      { code: "GR", label: "Greece", rate: 24 },
      { code: "OTHER_EU", label: "Other EU country", rate: 21 },
    ],
    plans: ["starter", "pro", "enterprise"],
  };
}
