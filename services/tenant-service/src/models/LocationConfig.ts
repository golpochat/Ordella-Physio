export const LOCATION_CONFIG_NAMESPACES = [
  "branding",
  "operations",
  "features",
  "integrations",
] as const;

export type LocationConfigNamespace = (typeof LOCATION_CONFIG_NAMESPACES)[number];

export type LocationBrandingConfig = {
  primaryColor: string;
  logoUrl?: string | null;
  darkMode: boolean;
};

export type LocationOpeningHoursEntry = {
  day: string;
  open: string;
  close: string;
};

export type LocationOperationsConfig = {
  openingHours: LocationOpeningHoursEntry[];
  maxDailyAppointments: number;
  allowWalkIns: boolean;
};

export type LocationFeaturesConfig = {
  enableKioskCheckIn: boolean;
  enableQueueManagement: boolean;
  enableInventoryTracking: boolean;
};

export type LocationIntegrationsConfig = {
  posDeviceId?: string | null;
  printerIp?: string | null;
  iotGatewayUrl?: string | null;
};

export type LocationConfigData =
  | LocationBrandingConfig
  | LocationOperationsConfig
  | LocationFeaturesConfig
  | LocationIntegrationsConfig
  | Record<string, unknown>;

export type LocationConfigRecord = {
  namespace: LocationConfigNamespace;
  data: LocationConfigData;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type LocationConfigNamespaceSummary = {
  namespace: LocationConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type LocationConfigValidationFieldError = {
  field: string;
  message: string;
};

export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DEFAULT_OPENING_HOURS: LocationOpeningHoursEntry[] = WEEKDAYS.map((day) => ({
  day,
  open: day === "saturday" || day === "sunday" ? "00:00" : "09:00",
  close: day === "saturday" || day === "sunday" ? "00:00" : "17:00",
}));

export const DEFAULT_LOCATION_CONFIGS: Record<LocationConfigNamespace, LocationConfigData> = {
  branding: {
    primaryColor: "#0f766e",
    logoUrl: null,
    darkMode: false,
  },
  operations: {
    openingHours: DEFAULT_OPENING_HOURS,
    maxDailyAppointments: 50,
    allowWalkIns: false,
  },
  features: {
    enableKioskCheckIn: false,
    enableQueueManagement: false,
    enableInventoryTracking: false,
  },
  integrations: {
    posDeviceId: null,
    printerIp: null,
    iotGatewayUrl: null,
  },
};
