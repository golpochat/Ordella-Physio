export const STAFF_CONFIG_NAMESPACES = [
  "preferences",
  "workingHours",
  "features",
  "restrictions",
] as const;

export type StaffConfigNamespace = (typeof STAFF_CONFIG_NAMESPACES)[number];

export const STAFF_CONFIG_WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type StaffConfigWeekday = (typeof STAFF_CONFIG_WEEKDAYS)[number];

export type StaffNotificationsConfig = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

export type StaffPreferencesConfig = {
  language?: string;
  timezone?: string;
  notifications: StaffNotificationsConfig;
};

export type StaffWeeklyScheduleEntry = {
  day: StaffConfigWeekday;
  start: string;
  end: string;
};

export type StaffBreakTimeEntry = {
  start: string;
  end: string;
};

export type StaffWorkingHoursConfig = {
  weeklySchedule: StaffWeeklyScheduleEntry[];
  breakTimes: StaffBreakTimeEntry[];
};

export type StaffFeaturesConfig = {
  enableTelehealth: boolean;
  enableOverbooking: boolean;
  enableAutoAssign: boolean;
};

export type StaffRestrictionsConfig = {
  maxDailyAppointments: number;
  allowWalkIns: boolean;
  blockedDates: string[];
};

export type StaffConfigData =
  | StaffPreferencesConfig
  | StaffWorkingHoursConfig
  | StaffFeaturesConfig
  | StaffRestrictionsConfig
  | Record<string, unknown>;

export type StaffConfigRecord = {
  namespace: StaffConfigNamespace;
  data: StaffConfigData;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type StaffConfigNamespaceSummary = {
  namespace: StaffConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type StaffConfigValidationFieldError = {
  field: string;
  message: string;
};

const DEFAULT_WEEKLY_SCHEDULE: StaffWeeklyScheduleEntry[] = STAFF_CONFIG_WEEKDAYS.map((day) => ({
  day,
  start: day === "saturday" || day === "sunday" ? "00:00" : "09:00",
  end: day === "saturday" || day === "sunday" ? "00:00" : "17:00",
}));

export const DEFAULT_STAFF_CONFIGS: Record<StaffConfigNamespace, StaffConfigData> = {
  preferences: {
    language: "en",
    timezone: "UTC",
    notifications: {
      email: true,
      sms: false,
      push: false,
    },
  },
  workingHours: {
    weeklySchedule: DEFAULT_WEEKLY_SCHEDULE,
    breakTimes: [],
  },
  features: {
    enableTelehealth: false,
    enableOverbooking: false,
    enableAutoAssign: false,
  },
  restrictions: {
    maxDailyAppointments: 20,
    allowWalkIns: false,
    blockedDates: [],
  },
};
