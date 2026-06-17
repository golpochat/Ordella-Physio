export const PROVISIONING_FAIL_HEADER = "x-provisioning-fail-at";

export type ProvisioningFailStage = "org" | "tenant" | "owner" | "billing";

const STAGE_ALIASES: Record<string, ProvisioningFailStage> = {
  org: "org",
  organization: "org",
  tenant: "tenant",
  owner: "owner",
  billing: "billing",
};

export function normalizeProvisioningFailStage(
  value: string | undefined | null,
): ProvisioningFailStage | null {
  if (!value?.trim()) {
    return null;
  }

  return STAGE_ALIASES[value.trim().toLowerCase()] ?? null;
}

export function resolveProvisioningFailStage(input?: {
  headerValue?: string | null;
  envValue?: string | null;
}): ProvisioningFailStage | null {
  return (
    normalizeProvisioningFailStage(input?.headerValue) ??
    normalizeProvisioningFailStage(input?.envValue ?? process.env.PROVISIONING_FAIL_AT)
  );
}

export function isProvisioningFailStage(
  stage: ProvisioningFailStage,
  failAt: ProvisioningFailStage | null | undefined,
): boolean {
  return failAt === stage;
}

export function provisioningFailureMessage(stage: ProvisioningFailStage): string {
  return `Provisioning failure injected at ${stage}`;
}
