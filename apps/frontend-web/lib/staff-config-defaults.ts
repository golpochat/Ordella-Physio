import type {
  ClinicStaffBreakTimeEntry,
  ClinicStaffConfigNamespace,
  ClinicStaffFeaturesConfig,
  ClinicStaffPreferencesConfig,
  ClinicStaffRestrictionsConfig,
  ClinicStaffWeeklyScheduleEntry,
  ClinicStaffWorkingHoursConfig,
} from "@/lib/clinic-staff-member-types";
import { TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";

export const STAFF_CONFIG_NAMESPACE_OPTIONS: Array<{
  value: ClinicStaffConfigNamespace;
  label: string;
}> = [
  { value: "preferences", label: "Preferences" },
  { value: "workingHours", label: "Working hours" },
  { value: "features", label: "Features" },
  { value: "restrictions", label: "Restrictions" },
];

export const STAFF_CONFIG_WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DEFAULT_WEEKLY_SCHEDULE: ClinicStaffWeeklyScheduleEntry[] = STAFF_CONFIG_WEEKDAYS.map(
  (day) => ({
    day,
    start: day === "saturday" || day === "sunday" ? "00:00" : "09:00",
    end: day === "saturday" || day === "sunday" ? "00:00" : "17:00",
  }),
);

export const DEFAULT_STAFF_PREFERENCES_CONFIG: ClinicStaffPreferencesConfig = {
  language: "en",
  timezone: "UTC",
  notifications: {
    email: true,
    sms: false,
    push: false,
  },
};

export const DEFAULT_STAFF_WORKING_HOURS_CONFIG: ClinicStaffWorkingHoursConfig = {
  weeklySchedule: DEFAULT_WEEKLY_SCHEDULE,
  breakTimes: [],
};

export const DEFAULT_STAFF_FEATURES_CONFIG: ClinicStaffFeaturesConfig = {
  enableTelehealth: false,
  enableOverbooking: false,
  enableAutoAssign: false,
};

export const DEFAULT_STAFF_RESTRICTIONS_CONFIG: ClinicStaffRestrictionsConfig = {
  maxDailyAppointments: 20,
  allowWalkIns: false,
  blockedDates: [],
};

export const STAFF_LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "en-GB", label: "English (UK)" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
] as const;

export const STAFF_TIMEZONE_OPTIONS = TENANT_TIMEZONE_OPTIONS.map((timezone) => ({
  value: timezone,
  label: timezone,
}));

export const STAFF_WEEKDAY_LABELS: Record<(typeof STAFF_CONFIG_WEEKDAYS)[number], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function ensureWeeklySchedule(
  schedule: ClinicStaffWeeklyScheduleEntry[],
): ClinicStaffWeeklyScheduleEntry[] {
  return STAFF_CONFIG_WEEKDAYS.map((day) => {
    const existing = schedule.find((entry) => entry.day === day);
    return (
      existing ?? {
        day,
        start: day === "saturday" || day === "sunday" ? "00:00" : "09:00",
        end: day === "saturday" || day === "sunday" ? "00:00" : "17:00",
      }
    );
  });
}

export function ensureBreakTimes(breakTimes: ClinicStaffBreakTimeEntry[]): ClinicStaffBreakTimeEntry[] {
  return breakTimes.length > 0 ? breakTimes : [];
}
