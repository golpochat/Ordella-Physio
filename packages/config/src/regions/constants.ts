export const ORDELLA_REGION_CODES = ["eu-west", "us-east", "apac"] as const;

export type OrdellaRegionCode = (typeof ORDELLA_REGION_CODES)[number];

export type OrdellaRegionDefinition = {
  code: OrdellaRegionCode;
  label: string;
  role: "primary" | "secondary" | "optional";
  timezone: string;
  defaultForTenants: boolean;
};

export const ORDELLA_REGIONS: Record<OrdellaRegionCode, OrdellaRegionDefinition> = {
  "eu-west": {
    code: "eu-west",
    label: "EU West",
    role: "primary",
    timezone: "Europe/London",
    defaultForTenants: true,
  },
  "us-east": {
    code: "us-east",
    label: "US East",
    role: "secondary",
    timezone: "America/New_York",
    defaultForTenants: false,
  },
  apac: {
    code: "apac",
    label: "Asia-Pacific",
    role: "optional",
    timezone: "Asia/Singapore",
    defaultForTenants: false,
  },
};

export const DEFAULT_ORDELLA_REGION: OrdellaRegionCode = "eu-west";

export const REGION_HEADER = "x-ordella-region";
export const TARGET_REGION_HEADER = "x-target-region";

export function isOrdellaRegionCode(value: string): value is OrdellaRegionCode {
  return (ORDELLA_REGION_CODES as readonly string[]).includes(value);
}

export function resolveRegionEndpoint(
  region: OrdellaRegionCode,
  endpoints: Partial<Record<OrdellaRegionCode, string>>,
): string | undefined {
  return endpoints[region];
}
