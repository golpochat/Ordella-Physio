"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useClinicStaffConfig,
  useUpdateClinicStaffConfig,
} from "@/hooks/useClinicStaffMember";
import { parseStaffMemberConfigErrors } from "@/lib/clinic-staff-member-api-errors";
import type {
  ClinicStaffConfigNamespace,
  ClinicStaffFeaturesConfig,
  ClinicStaffPreferencesConfig,
  ClinicStaffRestrictionsConfig,
  ClinicStaffWorkingHoursConfig,
} from "@/lib/clinic-staff-member-types";
import {
  DEFAULT_STAFF_FEATURES_CONFIG,
  DEFAULT_STAFF_PREFERENCES_CONFIG,
  DEFAULT_STAFF_RESTRICTIONS_CONFIG,
  DEFAULT_STAFF_WORKING_HOURS_CONFIG,
  ensureBreakTimes,
  ensureWeeklySchedule,
  STAFF_CONFIG_NAMESPACE_OPTIONS,
  STAFF_LANGUAGE_OPTIONS,
  STAFF_TIMEZONE_OPTIONS,
  STAFF_WEEKDAY_LABELS,
} from "@/lib/staff-config-defaults";

export type StaffConfigEditorProps = {
  staffId: string;
  staffName: string;
  onForbidden?: () => void;
  onNotFound?: () => void;
};

function asPreferences(data: unknown): ClinicStaffPreferencesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicStaffPreferencesConfig>;
  const notifications =
    record.notifications && typeof record.notifications === "object"
      ? record.notifications
      : DEFAULT_STAFF_PREFERENCES_CONFIG.notifications;

  return {
    language: record.language ?? DEFAULT_STAFF_PREFERENCES_CONFIG.language,
    timezone: record.timezone ?? DEFAULT_STAFF_PREFERENCES_CONFIG.timezone,
    notifications: {
      email: notifications.email ?? DEFAULT_STAFF_PREFERENCES_CONFIG.notifications.email,
      sms: notifications.sms ?? DEFAULT_STAFF_PREFERENCES_CONFIG.notifications.sms,
      push: notifications.push ?? DEFAULT_STAFF_PREFERENCES_CONFIG.notifications.push,
    },
  };
}

function asWorkingHours(data: unknown): ClinicStaffWorkingHoursConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicStaffWorkingHoursConfig>;
  const weeklySchedule = Array.isArray(record.weeklySchedule)
    ? record.weeklySchedule.map((entry) => ({
        day: entry.day ?? "monday",
        start: entry.start ?? "09:00",
        end: entry.end ?? "17:00",
      }))
    : DEFAULT_STAFF_WORKING_HOURS_CONFIG.weeklySchedule;

  const breakTimes = Array.isArray(record.breakTimes)
    ? record.breakTimes.map((entry) => ({
        start: entry.start ?? "12:00",
        end: entry.end ?? "13:00",
      }))
    : DEFAULT_STAFF_WORKING_HOURS_CONFIG.breakTimes;

  return {
    weeklySchedule,
    breakTimes,
  };
}

function asFeatures(data: unknown): ClinicStaffFeaturesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicStaffFeaturesConfig>;
  return {
    enableTelehealth: record.enableTelehealth ?? DEFAULT_STAFF_FEATURES_CONFIG.enableTelehealth,
    enableOverbooking: record.enableOverbooking ?? DEFAULT_STAFF_FEATURES_CONFIG.enableOverbooking,
    enableAutoAssign: record.enableAutoAssign ?? DEFAULT_STAFF_FEATURES_CONFIG.enableAutoAssign,
  };
}

function asRestrictions(data: unknown): ClinicStaffRestrictionsConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicStaffRestrictionsConfig>;
  return {
    maxDailyAppointments:
      record.maxDailyAppointments ?? DEFAULT_STAFF_RESTRICTIONS_CONFIG.maxDailyAppointments,
    allowWalkIns: record.allowWalkIns ?? DEFAULT_STAFF_RESTRICTIONS_CONFIG.allowWalkIns,
    blockedDates: Array.isArray(record.blockedDates)
      ? record.blockedDates.filter((value): value is string => typeof value === "string")
      : DEFAULT_STAFF_RESTRICTIONS_CONFIG.blockedDates,
  };
}

export function StaffConfigEditor({
  staffId,
  staffName,
  onForbidden,
  onNotFound,
}: StaffConfigEditorProps) {
  const [namespace, setNamespace] = useState<ClinicStaffConfigNamespace>("preferences");
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("{}");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [newBlockedDate, setNewBlockedDate] = useState("");

  const [preferences, setPreferences] = useState<ClinicStaffPreferencesConfig>(
    DEFAULT_STAFF_PREFERENCES_CONFIG,
  );
  const [workingHours, setWorkingHours] = useState<ClinicStaffWorkingHoursConfig>(
    DEFAULT_STAFF_WORKING_HOURS_CONFIG,
  );
  const [features, setFeatures] = useState<ClinicStaffFeaturesConfig>(DEFAULT_STAFF_FEATURES_CONFIG);
  const [restrictions, setRestrictions] = useState<ClinicStaffRestrictionsConfig>(
    DEFAULT_STAFF_RESTRICTIONS_CONFIG,
  );

  const configQuery = useClinicStaffConfig(staffId, namespace);
  const updateConfig = useUpdateClinicStaffConfig(staffId, namespace);

  const isBusy = configQuery.isLoading || configQuery.isFetching || updateConfig.isPending;

  useEffect(() => {
    if (!configQuery.data) {
      return;
    }

    const { data } = configQuery.data;
    setPreferences(asPreferences(data));
    setWorkingHours(asWorkingHours(data));
    setFeatures(asFeatures(data));
    setRestrictions(asRestrictions(data));
    setJsonText(JSON.stringify(data, null, 2));
    setFieldErrors({});
    setGeneralError(null);
    setJsonError(null);
  }, [configQuery.data]);

  useEffect(() => {
    if (!configQuery.error) {
      return;
    }

    const parsed = parseStaffMemberConfigErrors(configQuery.error);
    if (parsed.forbidden || parsed.tenantMismatch) {
      onForbidden?.();
      return;
    }

    if (parsed.notFound) {
      onNotFound?.();
      return;
    }

    if (parsed.invalidNamespace) {
      toast.error("Unknown configuration namespace.");
    }
  }, [configQuery.error, onForbidden, onNotFound]);

  function handleNamespaceChange(nextNamespace: ClinicStaffConfigNamespace) {
    if (isBusy) {
      return;
    }

    setNamespace(nextNamespace);
    setJsonMode(false);
    setFieldErrors({});
    setGeneralError(null);
    setJsonError(null);
  }

  function updateWeeklySchedule(
    day: string,
    field: "start" | "end",
    value: string,
  ) {
    setWorkingHours((current) => ({
      ...current,
      weeklySchedule: ensureWeeklySchedule(current.weeklySchedule).map((entry) =>
        entry.day === day ? { ...entry, [field]: value } : entry,
      ),
    }));
  }

  function updateBreakTime(index: number, field: "start" | "end", value: string) {
    setWorkingHours((current) => ({
      ...current,
      breakTimes: current.breakTimes.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry,
      ),
    }));
  }

  function addBreakTime() {
    setWorkingHours((current) => ({
      ...current,
      breakTimes: [...ensureBreakTimes(current.breakTimes), { start: "12:00", end: "13:00" }],
    }));
  }

  function removeBreakTime(index: number) {
    setWorkingHours((current) => ({
      ...current,
      breakTimes: current.breakTimes.filter((_, entryIndex) => entryIndex !== index),
    }));
  }

  function addBlockedDate() {
    const value = newBlockedDate.trim();
    if (!value) {
      return;
    }

    setRestrictions((current) => ({
      ...current,
      blockedDates: current.blockedDates.includes(value)
        ? current.blockedDates
        : [...current.blockedDates, value],
    }));
    setNewBlockedDate("");
  }

  function removeBlockedDate(value: string) {
    setRestrictions((current) => ({
      ...current,
      blockedDates: current.blockedDates.filter((entry) => entry !== value),
    }));
  }

  function currentNamespaceData(): Record<string, unknown> {
    switch (namespace) {
      case "preferences":
        return { ...preferences };
      case "workingHours":
        return {
          ...workingHours,
          weeklySchedule: ensureWeeklySchedule(workingHours.weeklySchedule),
          breakTimes: ensureBreakTimes(workingHours.breakTimes),
        };
      case "features":
        return { ...features };
      case "restrictions":
        return { ...restrictions };
      default:
        return {};
    }
  }

  function buildPayload(): Record<string, unknown> | null {
    if (jsonMode) {
      try {
        const parsed = JSON.parse(jsonText) as unknown;
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          setJsonError("Configuration data must be a JSON object.");
          return null;
        }

        setJsonError(null);
        return parsed as Record<string, unknown>;
      } catch {
        setJsonError("Invalid JSON. Check syntax and try again.");
        return null;
      }
    }

    switch (namespace) {
      case "preferences":
        return { ...preferences };
      case "workingHours":
        return {
          ...workingHours,
          weeklySchedule: ensureWeeklySchedule(workingHours.weeklySchedule),
          breakTimes: ensureBreakTimes(workingHours.breakTimes),
        };
      case "features":
        return { ...features };
      case "restrictions":
        return { ...restrictions };
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff configuration</CardTitle>
        <CardDescription>
          Manage namespaced settings for {staffName}. Defaults apply until you save custom values.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="tenant-config-editor">
          <div className="tenant-config-namespace-tabs" role="tablist" aria-label="Configuration sections">
            {STAFF_CONFIG_NAMESPACE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={namespace === option.value}
                className={
                  namespace === option.value
                    ? "tenant-config-namespace-tab tenant-config-namespace-tab-active"
                    : "tenant-config-namespace-tab"
                }
                disabled={isBusy}
                onClick={() => handleNamespaceChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {configQuery.data?.isDefault ? (
            <p className="tenant-config-default-note">
              Using default values for this section. Save to create a staff-specific override.
            </p>
          ) : null}

          <form
            className="tenant-create-form"
            onSubmit={(event) => {
              event.preventDefault();
              setGeneralError(null);
              setFieldErrors({});

              const payload = buildPayload();
              if (!payload) {
                return;
              }

              updateConfig.mutate(payload, {
                onSuccess: (response) => {
                  toast.success(response.message ?? "Configuration updated successfully.");
                },
                onError: (error) => {
                  const parsed = parseStaffMemberConfigErrors(error);
                  if (parsed.forbidden || parsed.tenantMismatch) {
                    onForbidden?.();
                    return;
                  }
                  if (parsed.notFound) {
                    onNotFound?.();
                    return;
                  }
                  if (parsed.invalidNamespace) {
                    toast.error(parsed.generalError ?? "Unknown configuration namespace.");
                    return;
                  }
                  setFieldErrors(parsed.fieldErrors);
                  setGeneralError(parsed.generalError);
                },
              });
            }}
          >
            {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

            <div className="tenant-config-mode-toggle">
              <button
                type="button"
                className={
                  jsonMode
                    ? "tenant-config-mode-button"
                    : "tenant-config-mode-button tenant-config-mode-button-active"
                }
                disabled={isBusy}
                onClick={() => {
                  setJsonMode(false);
                  setJsonError(null);
                }}
              >
                Form editor
              </button>
              <button
                type="button"
                className={
                  jsonMode
                    ? "tenant-config-mode-button tenant-config-mode-button-active"
                    : "tenant-config-mode-button"
                }
                disabled={isBusy}
                onClick={() => {
                  setJsonMode(true);
                  setJsonText(JSON.stringify(currentNamespaceData(), null, 2));
                  setJsonError(null);
                }}
              >
                JSON editor
              </button>
            </div>

            {configQuery.isLoading ? (
              <p className="tenant-config-loading">Loading configuration...</p>
            ) : null}

            {!configQuery.isLoading && jsonMode ? (
              <div className="tenant-create-form-field">
                <Label htmlFor="staff-config-json">JSON configuration</Label>
                <textarea
                  id="staff-config-json"
                  className="tenant-config-json-editor"
                  value={jsonText}
                  disabled={isBusy}
                  onChange={(event) => setJsonText(event.target.value)}
                  rows={12}
                />
                {jsonError ? <p className="tenant-create-form-field-error">{jsonError}</p> : null}
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "preferences" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="staff-config-language">Language</Label>
                  <select
                    id="staff-config-language"
                    className="tenant-create-form-select"
                    value={preferences.language ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.language)}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        language: event.target.value || undefined,
                      }))
                    }
                  >
                    <option value="">Default</option>
                    {STAFF_LANGUAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.language ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.language}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="staff-config-timezone">Timezone</Label>
                  <select
                    id="staff-config-timezone"
                    className="tenant-create-form-select"
                    value={preferences.timezone ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.timezone)}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        timezone: event.target.value || undefined,
                      }))
                    }
                  >
                    <option value="">Default</option>
                    {STAFF_TIMEZONE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.timezone ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.timezone}</p>
                  ) : null}
                </div>

                <div className="tenant-config-feature-toggles">
                  <p className="font-medium">Notifications</p>
                  <div className="tenant-config-checkbox-row">
                    <input
                      id="staff-config-notify-email"
                      type="checkbox"
                      checked={preferences.notifications.email}
                      disabled={isBusy}
                      onChange={(event) =>
                        setPreferences((current) => ({
                          ...current,
                          notifications: { ...current.notifications, email: event.target.checked },
                        }))
                      }
                    />
                    <Label htmlFor="staff-config-notify-email">Email notifications</Label>
                  </div>
                  <div className="tenant-config-checkbox-row">
                    <input
                      id="staff-config-notify-sms"
                      type="checkbox"
                      checked={preferences.notifications.sms}
                      disabled={isBusy}
                      onChange={(event) =>
                        setPreferences((current) => ({
                          ...current,
                          notifications: { ...current.notifications, sms: event.target.checked },
                        }))
                      }
                    />
                    <Label htmlFor="staff-config-notify-sms">SMS notifications</Label>
                  </div>
                  <div className="tenant-config-checkbox-row">
                    <input
                      id="staff-config-notify-push"
                      type="checkbox"
                      checked={preferences.notifications.push}
                      disabled={isBusy}
                      onChange={(event) =>
                        setPreferences((current) => ({
                          ...current,
                          notifications: { ...current.notifications, push: event.target.checked },
                        }))
                      }
                    />
                    <Label htmlFor="staff-config-notify-push">Push notifications</Label>
                  </div>
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "workingHours" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field location-config-opening-hours">
                  <Label>Weekly schedule</Label>
                  {ensureWeeklySchedule(workingHours.weeklySchedule).map((entry, index) => (
                    <div key={entry.day} className="location-config-opening-hours-row">
                      <span className="location-config-opening-hours-day">
                        {STAFF_WEEKDAY_LABELS[entry.day as keyof typeof STAFF_WEEKDAY_LABELS] ??
                          entry.day}
                      </span>
                      <Input
                        type="time"
                        value={entry.start}
                        disabled={isBusy}
                        aria-invalid={Boolean(fieldErrors[`weeklySchedule.${index}.start`])}
                        onChange={(event) => updateWeeklySchedule(entry.day, "start", event.target.value)}
                      />
                      <span className="location-config-opening-hours-separator">to</span>
                      <Input
                        type="time"
                        value={entry.end}
                        disabled={isBusy}
                        aria-invalid={Boolean(fieldErrors[`weeklySchedule.${index}.end`])}
                        onChange={(event) => updateWeeklySchedule(entry.day, "end", event.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="tenant-create-form-field">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label>Break times</Label>
                    <Button type="button" variant="ghost" size="sm" disabled={isBusy} onClick={addBreakTime}>
                      Add break
                    </Button>
                  </div>
                  {workingHours.breakTimes.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No break times configured.</p>
                  ) : (
                    workingHours.breakTimes.map((entry, index) => (
                      <div key={`break-${index}`} className="location-config-opening-hours-row">
                        <Input
                          type="time"
                          value={entry.start}
                          disabled={isBusy}
                          aria-invalid={Boolean(fieldErrors[`breakTimes.${index}.start`])}
                          onChange={(event) => updateBreakTime(index, "start", event.target.value)}
                        />
                        <span className="location-config-opening-hours-separator">to</span>
                        <Input
                          type="time"
                          value={entry.end}
                          disabled={isBusy}
                          aria-invalid={Boolean(fieldErrors[`breakTimes.${index}.end`])}
                          onChange={(event) => updateBreakTime(index, "end", event.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={isBusy}
                          onClick={() => removeBreakTime(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "features" ? (
              <div className="tenant-config-feature-toggles">
                <div className="tenant-config-checkbox-row">
                  <input
                    id="staff-config-telehealth"
                    type="checkbox"
                    checked={features.enableTelehealth}
                    disabled={isBusy}
                    onChange={(event) =>
                      setFeatures((current) => ({
                        ...current,
                        enableTelehealth: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="staff-config-telehealth">Enable telehealth</Label>
                </div>
                <div className="tenant-config-checkbox-row">
                  <input
                    id="staff-config-overbooking"
                    type="checkbox"
                    checked={features.enableOverbooking}
                    disabled={isBusy}
                    onChange={(event) =>
                      setFeatures((current) => ({
                        ...current,
                        enableOverbooking: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="staff-config-overbooking">Enable overbooking</Label>
                </div>
                <div className="tenant-config-checkbox-row">
                  <input
                    id="staff-config-auto-assign"
                    type="checkbox"
                    checked={features.enableAutoAssign}
                    disabled={isBusy}
                    onChange={(event) =>
                      setFeatures((current) => ({
                        ...current,
                        enableAutoAssign: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="staff-config-auto-assign">Enable auto-assign</Label>
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "restrictions" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="staff-config-max-appointments">Max daily appointments</Label>
                  <Input
                    id="staff-config-max-appointments"
                    type="number"
                    min={0}
                    value={restrictions.maxDailyAppointments}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.maxDailyAppointments)}
                    onChange={(event) =>
                      setRestrictions((current) => ({
                        ...current,
                        maxDailyAppointments: Number(event.target.value),
                      }))
                    }
                  />
                  {fieldErrors.maxDailyAppointments ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.maxDailyAppointments}</p>
                  ) : null}
                </div>

                <div className="tenant-config-checkbox-row">
                  <input
                    id="staff-config-walk-ins"
                    type="checkbox"
                    checked={restrictions.allowWalkIns}
                    disabled={isBusy}
                    onChange={(event) =>
                      setRestrictions((current) => ({
                        ...current,
                        allowWalkIns: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="staff-config-walk-ins">Allow walk-ins</Label>
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="staff-config-blocked-date">Blocked dates</Label>
                  <div className="location-config-opening-hours-row">
                    <Input
                      id="staff-config-blocked-date"
                      type="date"
                      value={newBlockedDate}
                      disabled={isBusy}
                      onChange={(event) => setNewBlockedDate(event.target.value)}
                    />
                    <Button type="button" variant="ghost" size="sm" disabled={isBusy} onClick={addBlockedDate}>
                      Add date
                    </Button>
                  </div>
                  {restrictions.blockedDates.length > 0 ? (
                    <ul className="staff-config-blocked-dates-list">
                      {restrictions.blockedDates.map((date) => (
                        <li key={date} className="staff-config-blocked-dates-item">
                          <span>{date}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isBusy}
                            onClick={() => removeBlockedDate(date)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">No blocked dates configured.</p>
                  )}
                </div>
              </div>
            ) : null}

            <div className="tenant-create-form-actions">
              <Button type="submit" disabled={isBusy || configQuery.isLoading}>
                {updateConfig.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {updateConfig.isPending ? "Saving..." : "Save configuration"}
              </Button>
            </div>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}
