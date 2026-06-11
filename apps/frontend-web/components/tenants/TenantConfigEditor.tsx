"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  usePlatformTenantConfig,
  useUpdatePlatformTenantConfig,
} from "@/hooks/useSuperAdminPortal";
import type {
  PlatformTenantBrandingConfig,
  PlatformTenantConfigNamespace,
  PlatformTenantFeaturesConfig,
  PlatformTenantIntegrationsConfig,
  PlatformTenantPreferencesConfig,
} from "@/lib/super-admin-portal-types";
import { parseTenantConfigErrors } from "@/lib/tenant-api-errors";
import {
  DEFAULT_BRANDING_CONFIG,
  DEFAULT_FEATURES_CONFIG,
  DEFAULT_INTEGRATIONS_CONFIG,
  DEFAULT_PREFERENCES_CONFIG,
  TENANT_CONFIG_NAMESPACE_OPTIONS,
  TENANT_LANGUAGE_OPTIONS,
} from "@/lib/tenant-config-defaults";
import {
  TENANT_DATE_FORMAT_OPTIONS,
  TENANT_TIME_FORMAT_OPTIONS,
} from "@/lib/tenant-localization-form-options";

type TenantConfigEditorProps = {
  tenantId: string;
  tenantName: string;
  onForbidden?: () => void;
};

function asBranding(data: unknown): PlatformTenantBrandingConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformTenantBrandingConfig>;
  return {
    primaryColor: record.primaryColor ?? DEFAULT_BRANDING_CONFIG.primaryColor,
    logoUrl: record.logoUrl ?? DEFAULT_BRANDING_CONFIG.logoUrl ?? null,
    darkMode: record.darkMode ?? DEFAULT_BRANDING_CONFIG.darkMode,
  };
}

function asFeatures(data: unknown): PlatformTenantFeaturesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformTenantFeaturesConfig>;
  return {
    appointmentModule: record.appointmentModule ?? DEFAULT_FEATURES_CONFIG.appointmentModule,
    billingModule: record.billingModule ?? DEFAULT_FEATURES_CONFIG.billingModule,
    pharmacyModule: record.pharmacyModule ?? DEFAULT_FEATURES_CONFIG.pharmacyModule,
  };
}

function asIntegrations(data: unknown): PlatformTenantIntegrationsConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformTenantIntegrationsConfig>;
  return {
    stripePublicKey: record.stripePublicKey ?? DEFAULT_INTEGRATIONS_CONFIG.stripePublicKey ?? null,
    stripeSecretKey: record.stripeSecretKey ?? DEFAULT_INTEGRATIONS_CONFIG.stripeSecretKey ?? null,
  };
}

function asPreferences(data: unknown): PlatformTenantPreferencesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformTenantPreferencesConfig>;
  return {
    language: record.language ?? DEFAULT_PREFERENCES_CONFIG.language,
    dateFormat: record.dateFormat ?? DEFAULT_PREFERENCES_CONFIG.dateFormat,
    timeFormat: record.timeFormat ?? DEFAULT_PREFERENCES_CONFIG.timeFormat,
  };
}

export function TenantConfigEditor({ tenantId, tenantName, onForbidden }: TenantConfigEditorProps) {
  const [namespace, setNamespace] = useState<PlatformTenantConfigNamespace>("branding");
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("{}");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showStripeSecret, setShowStripeSecret] = useState(false);

  const [branding, setBranding] = useState<PlatformTenantBrandingConfig>(DEFAULT_BRANDING_CONFIG);
  const [features, setFeatures] = useState<PlatformTenantFeaturesConfig>(DEFAULT_FEATURES_CONFIG);
  const [integrations, setIntegrations] =
    useState<PlatformTenantIntegrationsConfig>(DEFAULT_INTEGRATIONS_CONFIG);
  const [preferences, setPreferences] =
    useState<PlatformTenantPreferencesConfig>(DEFAULT_PREFERENCES_CONFIG);

  const configQuery = usePlatformTenantConfig(tenantId, namespace);
  const updateConfig = useUpdatePlatformTenantConfig(tenantId, namespace);

  const isBusy = configQuery.isLoading || configQuery.isFetching || updateConfig.isPending;

  useEffect(() => {
    if (!configQuery.data) {
      return;
    }

    const { data } = configQuery.data;
    setBranding(asBranding(data));
    setFeatures(asFeatures(data));
    setIntegrations(asIntegrations(data));
    setPreferences(asPreferences(data));
    setJsonText(JSON.stringify(data, null, 2));
    setFieldErrors({});
    setGeneralError(null);
    setJsonError(null);
  }, [configQuery.data]);

  useEffect(() => {
    if (!configQuery.error) {
      return;
    }

    const parsed = parseTenantConfigErrors(configQuery.error);
    if (parsed.tenantMismatch) {
      onForbidden?.();
      return;
    }

    if (parsed.invalidNamespace) {
      toast.error("Invalid configuration section.");
    }
  }, [configQuery.error, onForbidden]);

  function handleNamespaceChange(nextNamespace: PlatformTenantConfigNamespace) {
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
      case "features":
        return { ...features };
      case "integrations":
        return { ...integrations };
      case "preferences":
        return { ...preferences };
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant configuration</CardTitle>
        <CardDescription>
          Manage namespaced settings for {tenantName}. Defaults apply until you save custom values.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="tenant-config-editor">
          <div className="tenant-config-namespace-tabs" role="tablist" aria-label="Configuration sections">
            {TENANT_CONFIG_NAMESPACE_OPTIONS.map((option) => (
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
              Using default values for this section. Save to create a tenant-specific override.
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
                onSuccess: () => {
                  toast.success("Configuration updated successfully.");
                },
                onError: (error) => {
                  const parsed = parseTenantConfigErrors(error);
                  if (parsed.tenantMismatch) {
                    onForbidden?.();
                    return;
                  }
                  if (parsed.invalidNamespace) {
                    toast.error("Invalid configuration section.");
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
                className={jsonMode ? "tenant-config-mode-button" : "tenant-config-mode-button tenant-config-mode-button-active"}
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
                className={jsonMode ? "tenant-config-mode-button tenant-config-mode-button-active" : "tenant-config-mode-button"}
                disabled={isBusy}
                onClick={() => {
                  setJsonMode(true);
                  setJsonText(
                    JSON.stringify(
                      namespace === "branding"
                        ? branding
                        : namespace === "features"
                          ? features
                          : namespace === "integrations"
                            ? integrations
                            : preferences,
                      null,
                      2,
                    ),
                  );
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
                <Label htmlFor="tenant-config-json">JSON configuration</Label>
                <textarea
                  id="tenant-config-json"
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
                  <Label htmlFor="tenant-config-primary-color">Primary color</Label>
                  <div className="tenant-config-color-field">
                    <input
                      id="tenant-config-primary-color"
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
                  <Label htmlFor="tenant-config-logo-url">Logo URL</Label>
                  <Input
                    id="tenant-config-logo-url"
                    value={branding.logoUrl ?? ""}
                    disabled={isBusy}
                    placeholder="https://example.com/logo.png"
                    aria-invalid={Boolean(fieldErrors.logoUrl)}
                    onChange={(event) =>
                      setBranding((current) => ({
                        ...current,
                        logoUrl: event.target.value.trim() === "" ? null : event.target.value,
                      }))
                    }
                  />
                  {fieldErrors.logoUrl ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.logoUrl}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field tenant-config-checkbox-row">
                  <label className="tenant-localization-number-format-option" htmlFor="tenant-config-dark-mode">
                    <input
                      id="tenant-config-dark-mode"
                      type="checkbox"
                      checked={branding.darkMode}
                      disabled={isBusy}
                      onChange={(event) =>
                        setBranding((current) => ({ ...current, darkMode: event.target.checked }))
                      }
                    />
                    <span>Enable dark mode by default</span>
                  </label>
                  {fieldErrors.darkMode ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.darkMode}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "features" ? (
              <div className="tenant-config-feature-toggles">
                {(
                  [
                    ["appointmentModule", "Appointment module"],
                    ["billingModule", "Billing module"],
                    ["pharmacyModule", "Pharmacy module"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className="tenant-config-checkbox-row">
                    <label className="tenant-localization-number-format-option" htmlFor={`tenant-config-${key}`}>
                      <input
                        id={`tenant-config-${key}`}
                        type="checkbox"
                        checked={features[key]}
                        disabled={isBusy}
                        onChange={(event) =>
                          setFeatures((current) => ({ ...current, [key]: event.target.checked }))
                        }
                      />
                      <span>{label}</span>
                    </label>
                    {fieldErrors[key] ? (
                      <p className="tenant-create-form-field-error">{fieldErrors[key]}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "integrations" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-config-stripe-public-key">Stripe public key</Label>
                  <Input
                    id="tenant-config-stripe-public-key"
                    value={integrations.stripePublicKey ?? ""}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.stripePublicKey)}
                    onChange={(event) =>
                      setIntegrations((current) => ({
                        ...current,
                        stripePublicKey: event.target.value.trim() === "" ? null : event.target.value,
                      }))
                    }
                  />
                  {fieldErrors.stripePublicKey ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.stripePublicKey}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-config-stripe-secret-key">Stripe secret key</Label>
                  <div className="tenant-config-password-field">
                    <Input
                      id="tenant-config-stripe-secret-key"
                      type={showStripeSecret ? "text" : "password"}
                      value={integrations.stripeSecretKey ?? ""}
                      disabled={isBusy}
                      className="tenant-config-password-input"
                      aria-invalid={Boolean(fieldErrors.stripeSecretKey)}
                      onChange={(event) =>
                        setIntegrations((current) => ({
                          ...current,
                          stripeSecretKey: event.target.value.trim() === "" ? null : event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      className="tenant-config-password-toggle"
                      disabled={isBusy}
                      aria-label={showStripeSecret ? "Hide Stripe secret key" : "Show Stripe secret key"}
                      onClick={() => setShowStripeSecret((current) => !current)}
                    >
                      {showStripeSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.stripeSecretKey ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.stripeSecretKey}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "preferences" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-config-language">Language</Label>
                  <select
                    id="tenant-config-language"
                    className="tenant-create-form-select"
                    value={preferences.language}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.language)}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, language: event.target.value }))
                    }
                  >
                    {TENANT_LANGUAGE_OPTIONS.map((option) => (
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
                  <Label htmlFor="tenant-config-date-format">Date format</Label>
                  <select
                    id="tenant-config-date-format"
                    className="tenant-create-form-select"
                    value={preferences.dateFormat}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.dateFormat)}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, dateFormat: event.target.value }))
                    }
                  >
                    {TENANT_DATE_FORMAT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.dateFormat ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.dateFormat}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="tenant-config-time-format">Time format</Label>
                  <select
                    id="tenant-config-time-format"
                    className="tenant-create-form-select"
                    value={preferences.timeFormat}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.timeFormat)}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, timeFormat: event.target.value }))
                    }
                  >
                    {TENANT_TIME_FORMAT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.timeFormat ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.timeFormat}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <Button type="submit" className="btn-primary" disabled={isBusy || configQuery.isLoading}>
              {updateConfig.isPending ? "Saving configuration..." : "Save configuration"}
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}
