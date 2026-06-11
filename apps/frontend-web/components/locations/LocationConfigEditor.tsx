"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useClinicLocationConfig,
  useUpdateClinicLocationConfig,
} from "@/hooks/useClinicPortal";
import { parseLocationConfigErrors } from "@/lib/location-api-errors";
import type {
  ClinicLocationBrandingConfig,
  ClinicLocationConfigNamespace,
  ClinicLocationFeaturesConfig,
  ClinicLocationIntegrationsConfig,
  ClinicLocationOperationsConfig,
  ClinicLocationOpeningHoursEntry,
} from "@/lib/clinic-portal-types";
import {
  DEFAULT_LOCATION_BRANDING_CONFIG,
  DEFAULT_LOCATION_FEATURES_CONFIG,
  DEFAULT_LOCATION_INTEGRATIONS_CONFIG,
  DEFAULT_LOCATION_OPERATIONS_CONFIG,
  LOCATION_CONFIG_NAMESPACE_OPTIONS,
  LOCATION_WEEKDAY_LABELS,
  LOCATION_WEEKDAYS,
} from "@/lib/location-config-defaults";

type LocationConfigEditorProps = {
  locationId: string;
  locationName: string;
  onForbidden?: () => void;
  onNotFound?: () => void;
};

function asBranding(data: unknown): ClinicLocationBrandingConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicLocationBrandingConfig>;
  return {
    primaryColor: record.primaryColor ?? DEFAULT_LOCATION_BRANDING_CONFIG.primaryColor,
    logoUrl: record.logoUrl ?? DEFAULT_LOCATION_BRANDING_CONFIG.logoUrl ?? null,
    darkMode: record.darkMode ?? DEFAULT_LOCATION_BRANDING_CONFIG.darkMode,
  };
}

function asOperations(data: unknown): ClinicLocationOperationsConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicLocationOperationsConfig>;
  const openingHours = Array.isArray(record.openingHours)
    ? record.openingHours.map((entry) => ({
        day: entry.day ?? "monday",
        open: entry.open ?? "09:00",
        close: entry.close ?? "17:00",
      }))
    : DEFAULT_LOCATION_OPERATIONS_CONFIG.openingHours;

  return {
    openingHours,
    maxDailyAppointments:
      record.maxDailyAppointments ?? DEFAULT_LOCATION_OPERATIONS_CONFIG.maxDailyAppointments,
    allowWalkIns: record.allowWalkIns ?? DEFAULT_LOCATION_OPERATIONS_CONFIG.allowWalkIns,
  };
}

function asFeatures(data: unknown): ClinicLocationFeaturesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicLocationFeaturesConfig>;
  return {
    enableKioskCheckIn:
      record.enableKioskCheckIn ?? DEFAULT_LOCATION_FEATURES_CONFIG.enableKioskCheckIn,
    enableQueueManagement:
      record.enableQueueManagement ?? DEFAULT_LOCATION_FEATURES_CONFIG.enableQueueManagement,
    enableInventoryTracking:
      record.enableInventoryTracking ?? DEFAULT_LOCATION_FEATURES_CONFIG.enableInventoryTracking,
  };
}

function asIntegrations(data: unknown): ClinicLocationIntegrationsConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<ClinicLocationIntegrationsConfig>;
  return {
    posDeviceId: record.posDeviceId ?? DEFAULT_LOCATION_INTEGRATIONS_CONFIG.posDeviceId ?? null,
    printerIp: record.printerIp ?? DEFAULT_LOCATION_INTEGRATIONS_CONFIG.printerIp ?? null,
    iotGatewayUrl:
      record.iotGatewayUrl ?? DEFAULT_LOCATION_INTEGRATIONS_CONFIG.iotGatewayUrl ?? null,
  };
}

function ensureOpeningHours(
  hours: ClinicLocationOpeningHoursEntry[],
): ClinicLocationOpeningHoursEntry[] {
  return LOCATION_WEEKDAYS.map((day) => {
    const existing = hours.find((entry) => entry.day === day);
    return (
      existing ?? {
        day,
        open: day === "saturday" || day === "sunday" ? "00:00" : "09:00",
        close: day === "saturday" || day === "sunday" ? "00:00" : "17:00",
      }
    );
  });
}

export function LocationConfigEditor({
  locationId,
  locationName,
  onForbidden,
  onNotFound,
}: LocationConfigEditorProps) {
  const [namespace, setNamespace] = useState<ClinicLocationConfigNamespace>("branding");
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("{}");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [branding, setBranding] = useState<ClinicLocationBrandingConfig>(
    DEFAULT_LOCATION_BRANDING_CONFIG,
  );
  const [operations, setOperations] = useState<ClinicLocationOperationsConfig>(
    DEFAULT_LOCATION_OPERATIONS_CONFIG,
  );
  const [features, setFeatures] = useState<ClinicLocationFeaturesConfig>(
    DEFAULT_LOCATION_FEATURES_CONFIG,
  );
  const [integrations, setIntegrations] = useState<ClinicLocationIntegrationsConfig>(
    DEFAULT_LOCATION_INTEGRATIONS_CONFIG,
  );

  const configQuery = useClinicLocationConfig(locationId, namespace);
  const updateConfig = useUpdateClinicLocationConfig(locationId, namespace);

  const isBusy = configQuery.isLoading || configQuery.isFetching || updateConfig.isPending;

  useEffect(() => {
    if (!configQuery.data) {
      return;
    }

    const { data } = configQuery.data;
    setBranding(asBranding(data));
    setOperations(asOperations(data));
    setFeatures(asFeatures(data));
    setIntegrations(asIntegrations(data));
    setJsonText(JSON.stringify(data, null, 2));
    setFieldErrors({});
    setGeneralError(null);
    setJsonError(null);
  }, [configQuery.data]);

  useEffect(() => {
    if (!configQuery.error) {
      return;
    }

    const parsed = parseLocationConfigErrors(configQuery.error);
    if (parsed.forbidden || parsed.tenantMismatch) {
      onForbidden?.();
      return;
    }

    if (parsed.notFound) {
      onNotFound?.();
      return;
    }

    if (parsed.invalidNamespace) {
      toast.error("Invalid configuration section.");
    }
  }, [configQuery.error, onForbidden, onNotFound]);

  function handleNamespaceChange(nextNamespace: ClinicLocationConfigNamespace) {
    if (isBusy) {
      return;
    }

    setNamespace(nextNamespace);
    setJsonMode(false);
    setFieldErrors({});
    setGeneralError(null);
    setJsonError(null);
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
      case "branding":
        return { ...branding };
      case "operations":
        return {
          ...operations,
          openingHours: ensureOpeningHours(operations.openingHours),
        };
      case "features":
        return { ...features };
      case "integrations":
        return { ...integrations };
      default:
        return null;
    }
  }

  function updateOpeningHours(
    day: string,
    field: "open" | "close",
    value: string,
  ) {
    setOperations((current) => ({
      ...current,
      openingHours: ensureOpeningHours(current.openingHours).map((entry) =>
        entry.day === day ? { ...entry, [field]: value } : entry,
      ),
    }));
  }

  function currentNamespaceData(): Record<string, unknown> {
    switch (namespace) {
      case "branding":
        return { ...branding };
      case "operations":
        return { ...operations, openingHours: ensureOpeningHours(operations.openingHours) };
      case "features":
        return { ...features };
      case "integrations":
        return { ...integrations };
      default:
        return {};
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location configuration</CardTitle>
        <CardDescription>
          Manage namespaced settings for {locationName}. Defaults apply until you save custom
          values.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="tenant-config-editor">
          <div className="tenant-config-namespace-tabs" role="tablist" aria-label="Configuration sections">
            {LOCATION_CONFIG_NAMESPACE_OPTIONS.map((option) => (
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
              Using default values for this section. Save to create a location-specific override.
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
                  const parsed = parseLocationConfigErrors(error);
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
                <Label htmlFor="location-config-json">JSON configuration</Label>
                <textarea
                  id="location-config-json"
                  className="tenant-config-json-editor"
                  value={jsonText}
                  disabled={isBusy}
                  onChange={(event) => setJsonText(event.target.value)}
                  rows={12}
                />
                {jsonError ? <p className="tenant-create-form-field-error">{jsonError}</p> : null}
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "branding" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="location-config-primary-color">Primary color</Label>
                  <div className="tenant-config-color-field">
                    <input
                      id="location-config-primary-color"
                      type="color"
                      className="tenant-config-color-input"
                      value={branding.primaryColor}
                      disabled={isBusy}
                      onChange={(event) =>
                        setBranding((current) => ({ ...current, primaryColor: event.target.value }))
                      }
                    />
                    <Input
                      value={branding.primaryColor}
                      disabled={isBusy}
                      aria-invalid={Boolean(fieldErrors.primaryColor)}
                      onChange={(event) =>
                        setBranding((current) => ({ ...current, primaryColor: event.target.value }))
                      }
                    />
                  </div>
                  {fieldErrors.primaryColor ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.primaryColor}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="location-config-logo-url">Logo URL</Label>
                  <Input
                    id="location-config-logo-url"
                    value={branding.logoUrl ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.logoUrl)}
                    onChange={(event) =>
                      setBranding((current) => ({
                        ...current,
                        logoUrl: event.target.value || null,
                      }))
                    }
                  />
                  {fieldErrors.logoUrl ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.logoUrl}</p>
                  ) : null}
                </div>

                <div className="tenant-config-checkbox-row">
                  <input
                    id="location-config-dark-mode"
                    type="checkbox"
                    checked={branding.darkMode}
                    disabled={isBusy}
                    onChange={(event) =>
                      setBranding((current) => ({ ...current, darkMode: event.target.checked }))
                    }
                  />
                  <Label htmlFor="location-config-dark-mode">Enable dark mode</Label>
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "operations" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="location-config-max-appointments">Max daily appointments</Label>
                  <Input
                    id="location-config-max-appointments"
                    type="number"
                    min={0}
                    value={operations.maxDailyAppointments}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.maxDailyAppointments)}
                    onChange={(event) =>
                      setOperations((current) => ({
                        ...current,
                        maxDailyAppointments: Number(event.target.value),
                      }))
                    }
                  />
                  {fieldErrors.maxDailyAppointments ? (
                    <p className="tenant-create-form-field-error">
                      {fieldErrors.maxDailyAppointments}
                    </p>
                  ) : null}
                </div>

                <div className="tenant-config-checkbox-row">
                  <input
                    id="location-config-walk-ins"
                    type="checkbox"
                    checked={operations.allowWalkIns}
                    disabled={isBusy}
                    onChange={(event) =>
                      setOperations((current) => ({
                        ...current,
                        allowWalkIns: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="location-config-walk-ins">Allow walk-ins</Label>
                </div>

                <div className="tenant-create-form-field location-config-opening-hours">
                  <Label>Opening hours</Label>
                  {ensureOpeningHours(operations.openingHours).map((entry, index) => (
                    <div key={entry.day} className="location-config-opening-hours-row">
                      <span className="location-config-opening-hours-day">
                        {LOCATION_WEEKDAY_LABELS[entry.day as keyof typeof LOCATION_WEEKDAY_LABELS] ??
                          entry.day}
                      </span>
                      <Input
                        type="time"
                        value={entry.open}
                        disabled={isBusy}
                        aria-invalid={Boolean(fieldErrors[`openingHours.${index}.open`])}
                        onChange={(event) => updateOpeningHours(entry.day, "open", event.target.value)}
                      />
                      <span className="location-config-opening-hours-separator">to</span>
                      <Input
                        type="time"
                        value={entry.close}
                        disabled={isBusy}
                        aria-invalid={Boolean(fieldErrors[`openingHours.${index}.close`])}
                        onChange={(event) => updateOpeningHours(entry.day, "close", event.target.value)}
                      />
                    </div>
                  ))}
                  {fieldErrors.openingHours ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.openingHours}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "features" ? (
              <div className="tenant-config-feature-toggles">
                <div className="tenant-config-checkbox-row">
                  <input
                    id="location-config-kiosk"
                    type="checkbox"
                    checked={features.enableKioskCheckIn}
                    disabled={isBusy}
                    onChange={(event) =>
                      setFeatures((current) => ({
                        ...current,
                        enableKioskCheckIn: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="location-config-kiosk">Enable kiosk check-in</Label>
                </div>
                <div className="tenant-config-checkbox-row">
                  <input
                    id="location-config-queue"
                    type="checkbox"
                    checked={features.enableQueueManagement}
                    disabled={isBusy}
                    onChange={(event) =>
                      setFeatures((current) => ({
                        ...current,
                        enableQueueManagement: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="location-config-queue">Enable queue management</Label>
                </div>
                <div className="tenant-config-checkbox-row">
                  <input
                    id="location-config-inventory"
                    type="checkbox"
                    checked={features.enableInventoryTracking}
                    disabled={isBusy}
                    onChange={(event) =>
                      setFeatures((current) => ({
                        ...current,
                        enableInventoryTracking: event.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="location-config-inventory">Enable inventory tracking</Label>
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "integrations" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="location-config-pos-id">POS device ID</Label>
                  <Input
                    id="location-config-pos-id"
                    value={integrations.posDeviceId ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.posDeviceId)}
                    onChange={(event) =>
                      setIntegrations((current) => ({
                        ...current,
                        posDeviceId: event.target.value || null,
                      }))
                    }
                  />
                  {fieldErrors.posDeviceId ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.posDeviceId}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="location-config-printer-ip">Printer IP</Label>
                  <Input
                    id="location-config-printer-ip"
                    value={integrations.printerIp ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.printerIp)}
                    onChange={(event) =>
                      setIntegrations((current) => ({
                        ...current,
                        printerIp: event.target.value || null,
                      }))
                    }
                  />
                  {fieldErrors.printerIp ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.printerIp}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="location-config-iot-url">IoT gateway URL</Label>
                  <Input
                    id="location-config-iot-url"
                    value={integrations.iotGatewayUrl ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.iotGatewayUrl)}
                    onChange={(event) =>
                      setIntegrations((current) => ({
                        ...current,
                        iotGatewayUrl: event.target.value || null,
                      }))
                    }
                  />
                  {fieldErrors.iotGatewayUrl ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.iotGatewayUrl}</p>
                  ) : null}
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
