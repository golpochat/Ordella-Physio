"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  usePlatformOrganizationConfig,
  useUpdatePlatformOrganizationConfig,
} from "@/hooks/useSuperAdminPortal";
import { parseOrganizationConfigErrors } from "@/lib/organization-api-errors";
import {
  DEFAULT_ORGANIZATION_BRANDING_CONFIG,
  DEFAULT_ORGANIZATION_FEATURES_CONFIG,
  DEFAULT_ORGANIZATION_INTEGRATIONS_CONFIG,
  DEFAULT_ORGANIZATION_PREFERENCES_CONFIG,
  ORGANIZATION_CONFIG_NAMESPACE_OPTIONS,
  ORGANIZATION_DATE_FORMAT_OPTIONS,
  ORGANIZATION_LANGUAGE_OPTIONS,
  ORGANIZATION_TIMEZONE_OPTIONS,
} from "@/lib/organization-config-defaults";
import type {
  PlatformOrganizationBrandingConfig,
  PlatformOrganizationConfigNamespace,
  PlatformOrganizationFeaturesConfig,
  PlatformOrganizationIntegrationsConfig,
  PlatformOrganizationPreferencesConfig,
} from "@/lib/super-admin-portal-types";

export type OrganizationConfigEditorProps = {
  organizationId: string;
  organizationName: string;
  onForbidden?: () => void;
  onOrgNotFound?: () => void;
};

function asBranding(data: unknown): PlatformOrganizationBrandingConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformOrganizationBrandingConfig>;
  return {
    primaryColor: record.primaryColor ?? DEFAULT_ORGANIZATION_BRANDING_CONFIG.primaryColor,
    logoUrl: record.logoUrl ?? DEFAULT_ORGANIZATION_BRANDING_CONFIG.logoUrl ?? null,
    darkMode: record.darkMode ?? DEFAULT_ORGANIZATION_BRANDING_CONFIG.darkMode,
  };
}

function asFeatures(data: unknown): PlatformOrganizationFeaturesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformOrganizationFeaturesConfig>;
  return {
    multiTenantSupport: record.multiTenantSupport ?? DEFAULT_ORGANIZATION_FEATURES_CONFIG.multiTenantSupport,
    advancedReporting: record.advancedReporting ?? DEFAULT_ORGANIZATION_FEATURES_CONFIG.advancedReporting,
    auditLogs: record.auditLogs ?? DEFAULT_ORGANIZATION_FEATURES_CONFIG.auditLogs,
  };
}

function asIntegrations(data: unknown): PlatformOrganizationIntegrationsConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformOrganizationIntegrationsConfig>;
  return {
    stripePublicKey: record.stripePublicKey ?? DEFAULT_ORGANIZATION_INTEGRATIONS_CONFIG.stripePublicKey ?? null,
    stripeSecretKey: record.stripeSecretKey ?? DEFAULT_ORGANIZATION_INTEGRATIONS_CONFIG.stripeSecretKey ?? null,
    emailProviderApiKey:
      record.emailProviderApiKey ?? DEFAULT_ORGANIZATION_INTEGRATIONS_CONFIG.emailProviderApiKey ?? null,
  };
}

function asPreferences(data: unknown): PlatformOrganizationPreferencesConfig {
  const record = (data && typeof data === "object" ? data : {}) as Partial<PlatformOrganizationPreferencesConfig>;
  return {
    timezone: record.timezone ?? DEFAULT_ORGANIZATION_PREFERENCES_CONFIG.timezone,
    language: record.language ?? DEFAULT_ORGANIZATION_PREFERENCES_CONFIG.language,
    dateFormat: record.dateFormat ?? DEFAULT_ORGANIZATION_PREFERENCES_CONFIG.dateFormat,
  };
}

export function OrganizationConfigEditor({
  organizationId,
  organizationName,
  onForbidden,
  onOrgNotFound,
}: OrganizationConfigEditorProps) {
  const [namespace, setNamespace] = useState<PlatformOrganizationConfigNamespace>("branding");
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("{}");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showEmailApiKey, setShowEmailApiKey] = useState(false);

  const [branding, setBranding] = useState<PlatformOrganizationBrandingConfig>(
    DEFAULT_ORGANIZATION_BRANDING_CONFIG,
  );
  const [features, setFeatures] = useState<PlatformOrganizationFeaturesConfig>(
    DEFAULT_ORGANIZATION_FEATURES_CONFIG,
  );
  const [integrations, setIntegrations] = useState<PlatformOrganizationIntegrationsConfig>(
    DEFAULT_ORGANIZATION_INTEGRATIONS_CONFIG,
  );
  const [preferences, setPreferences] = useState<PlatformOrganizationPreferencesConfig>(
    DEFAULT_ORGANIZATION_PREFERENCES_CONFIG,
  );

  const configQuery = usePlatformOrganizationConfig(organizationId, namespace);
  const updateConfig = useUpdatePlatformOrganizationConfig(organizationId, namespace);

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

    const parsed = parseOrganizationConfigErrors(configQuery.error);
    if (parsed.forbidden) {
      onForbidden?.();
      return;
    }

    if (parsed.orgNotFound) {
      onOrgNotFound?.();
      return;
    }

    if (parsed.invalidNamespace) {
      toast.error("Unknown configuration namespace.");
    }
  }, [configQuery.error, onForbidden, onOrgNotFound]);

  function handleNamespaceChange(nextNamespace: PlatformOrganizationConfigNamespace) {
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
        <CardTitle>Organization configuration</CardTitle>
        <CardDescription>
          Manage namespaced settings for {organizationName}. Defaults apply until you save custom values.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="tenant-config-editor">
          <div className="tenant-config-namespace-tabs" role="tablist" aria-label="Configuration sections">
            {ORGANIZATION_CONFIG_NAMESPACE_OPTIONS.map((option) => (
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
              Using default values for this section. Save to create an organization-specific override.
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
                  const parsed = parseOrganizationConfigErrors(error);
                  if (parsed.forbidden) {
                    onForbidden?.();
                    return;
                  }
                  if (parsed.orgNotFound) {
                    onOrgNotFound?.();
                    return;
                  }
                  if (parsed.invalidNamespace) {
                    toast.error("Unknown configuration namespace.");
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
                <Label htmlFor="organization-config-json">JSON configuration</Label>
                <textarea
                  id="organization-config-json"
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
                  <Label htmlFor="organization-config-primary-color">Primary color</Label>
                  <div className="tenant-config-color-field">
                    <input
                      id="organization-config-primary-color"
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
                  <Label htmlFor="organization-config-logo-url">Logo URL</Label>
                  <Input
                    id="organization-config-logo-url"
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
                  <label className="tenant-localization-number-format-option" htmlFor="organization-config-dark-mode">
                    <input
                      id="organization-config-dark-mode"
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
                    ["multiTenantSupport", "Multi-tenant support"],
                    ["advancedReporting", "Advanced reporting"],
                    ["auditLogs", "Audit logs"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className="tenant-config-checkbox-row">
                    <label className="tenant-localization-number-format-option" htmlFor={`organization-config-${key}`}>
                      <input
                        id={`organization-config-${key}`}
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
                  <Label htmlFor="organization-config-stripe-public-key">Stripe public key</Label>
                  <Input
                    id="organization-config-stripe-public-key"
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
                  <Label htmlFor="organization-config-stripe-secret-key">Stripe secret key</Label>
                  <div className="tenant-config-password-field">
                    <Input
                      id="organization-config-stripe-secret-key"
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

                <div className="tenant-create-form-field">
                  <Label htmlFor="organization-config-email-api-key">Email provider API key</Label>
                  <div className="tenant-config-password-field">
                    <Input
                      id="organization-config-email-api-key"
                      type={showEmailApiKey ? "text" : "password"}
                      value={integrations.emailProviderApiKey ?? ""}
                      disabled={isBusy}
                      className="tenant-config-password-input"
                      aria-invalid={Boolean(fieldErrors.emailProviderApiKey)}
                      onChange={(event) =>
                        setIntegrations((current) => ({
                          ...current,
                          emailProviderApiKey: event.target.value.trim() === "" ? null : event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      className="tenant-config-password-toggle"
                      disabled={isBusy}
                      aria-label={showEmailApiKey ? "Hide email API key" : "Show email API key"}
                      onClick={() => setShowEmailApiKey((current) => !current)}
                    >
                      {showEmailApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.emailProviderApiKey ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.emailProviderApiKey}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!configQuery.isLoading && !jsonMode && namespace === "preferences" ? (
              <div className="tenant-create-form-grid">
                <div className="tenant-create-form-field">
                  <Label htmlFor="organization-config-timezone">Timezone</Label>
                  <select
                    id="organization-config-timezone"
                    className="tenant-create-form-select"
                    value={preferences.timezone}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.timezone)}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, timezone: event.target.value }))
                    }
                  >
                    {ORGANIZATION_TIMEZONE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.timezone ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.timezone}</p>
                  ) : null}
                </div>

                <div className="tenant-create-form-field">
                  <Label htmlFor="organization-config-language">Language</Label>
                  <select
                    id="organization-config-language"
                    className="tenant-create-form-select"
                    value={preferences.language}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.language)}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, language: event.target.value }))
                    }
                  >
                    {ORGANIZATION_LANGUAGE_OPTIONS.map((option) => (
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
                  <Label htmlFor="organization-config-date-format">Date format</Label>
                  <select
                    id="organization-config-date-format"
                    className="tenant-create-form-select"
                    value={preferences.dateFormat}
                    disabled={isBusy}
                    aria-invalid={Boolean(fieldErrors.dateFormat)}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, dateFormat: event.target.value }))
                    }
                  >
                    {ORGANIZATION_DATE_FORMAT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.dateFormat ? (
                    <p className="tenant-create-form-field-error">{fieldErrors.dateFormat}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <Button type="submit" className="btn-primary" disabled={isBusy || configQuery.isLoading}>
              {updateConfig.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {updateConfig.isPending ? "Saving configuration..." : "Save configuration"}
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}
