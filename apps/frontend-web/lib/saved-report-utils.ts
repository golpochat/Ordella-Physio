import type {
  AdvancedSavedReportType,
  AppointmentReportQuery,
  PatientReportQuery,
  RevenueReportQuery,
  SavedReportConfig,
  SavedReportType,
} from "@/lib/reporting-types";

const TYPE_TO_PATH: Record<SavedReportType, string> = {
  APPOINTMENT: "/clinic/reports/appointments",
  REVENUE: "/clinic/reports/revenue",
  PATIENT: "/clinic/reports/patients",
};

const PAGE_TYPE_TO_SAVED: Record<AdvancedSavedReportType, SavedReportType> = {
  appointment: "APPOINTMENT",
  revenue: "REVENUE",
  patient: "PATIENT",
};

const SAVED_TYPE_LABELS: Record<SavedReportType, string> = {
  APPOINTMENT: "Appointment",
  REVENUE: "Revenue",
  PATIENT: "Patient",
};

export function savedReportTypeLabel(type: SavedReportType): string {
  return SAVED_TYPE_LABELS[type];
}

export function pageTypeToSavedReportType(type: AdvancedSavedReportType): SavedReportType {
  return PAGE_TYPE_TO_SAVED[type];
}

export function savedReportOpenHref(type: SavedReportType, config: SavedReportConfig): string {
  const encoded = encodeURIComponent(JSON.stringify(config));
  return `${TYPE_TO_PATH[type]}?config=${encoded}`;
}

export function parseSavedReportConfigFromSearch(
  searchParams: URLSearchParams,
): SavedReportConfig | null {
  const raw = searchParams.get("config");
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as SavedReportConfig;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function buildReportConfigFromFilters(
  filters:
    | AppointmentReportQuery
    | RevenueReportQuery
    | PatientReportQuery,
): SavedReportConfig {
  const config: SavedReportConfig = { ...filters };
  if (config.rangeType !== "custom") {
    delete config.startDate;
    delete config.endDate;
  }
  return config;
}
