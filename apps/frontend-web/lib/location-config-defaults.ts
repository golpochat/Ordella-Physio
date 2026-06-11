import type {
  ClinicLocationBrandingConfig,
  ClinicLocationConfigNamespace,
  ClinicLocationFeaturesConfig,
  ClinicLocationIntegrationsConfig,
  ClinicLocationOperationsConfig,
  ClinicLocationOpeningHoursEntry,
} from "@/lib/clinic-portal-types";

export const LOCATION_CONFIG_NAMESPACE_OPTIONS: Array<{
  value: ClinicLocationConfigNamespace;
  label: string;
}> = [
  { value: "branding", label: "Branding" },
  { value: "operations", label: "Operations" },
  { value: "features", label: "Features" },
  { value: "integrations", label: "Integrations" },
];

export const LOCATION_WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DEFAULT_OPENING_HOURS: ClinicLocationOpeningHoursEntry[] = LOCATION_WEEKDAYS.map((day) => ({
  day,
  open: day === "saturday" || day === "sunday" ? "00:00" : "09:00",
  close: day === "saturday" || day === "sunday" ? "00:00" : "17:00",
}));

export const DEFAULT_LOCATION_BRANDING_CONFIG: ClinicLocationBrandingConfig = {
  primaryColor: "#0f766e",
  logoUrl: null,
  darkMode: false,
};

export const DEFAULT_LOCATION_OPERATIONS_CONFIG: ClinicLocationOperationsConfig = {
  openingHours: DEFAULT_OPENING_HOURS,
  maxDailyAppointments: 50,
  allowWalkIns: false,
};

export const DEFAULT_LOCATION_FEATURES_CONFIG: ClinicLocationFeaturesConfig = {
  enableKioskCheckIn: false,
  enableQueueManagement: false,
  enableInventoryTracking: false,
};

export const DEFAULT_LOCATION_INTEGRATIONS_CONFIG: ClinicLocationIntegrationsConfig = {
  posDeviceId: null,
  printerIp: null,
  iotGatewayUrl: null,
};

export const LOCATION_WEEKDAY_LABELS: Record<(typeof LOCATION_WEEKDAYS)[number], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};
