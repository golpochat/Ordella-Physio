"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AddressLookupVendorCatalog } from "@/components/super-admin/settings/AddressLookupVendorCatalog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { Input, Label } from "@/components/ui/input";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useAddressLookupIntegrations,
  useCreateAddressLookupIntegration,
  useDeleteAddressLookupIntegration,
  useSetActiveAddressLookupIntegration,
  useTestAddressLookupCredentials,
  useTestAddressLookupIntegration,
} from "@/hooks/useSuperAdminPortal";
import { addressLookupVendorLabel } from "@/lib/address-lookup/vendor-catalog";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { cn } from "@/lib/cn";
import type {
  AddressLookupConnectionTestResult,
  AddressLookupVendor,
} from "@/lib/super-admin-portal-types";

function ConnectionTestStatus({
  result,
}: {
  result: AddressLookupConnectionTestResult | null | undefined;
}) {
  if (!result) {
    return null;
  }

  return (
    <p
      className={cn(
        "text-sm",
        result.connected ? "text-emerald-700" : "text-red-700",
      )}
    >
      {result.connected ? "Connected" : "Not connected"} — {result.message}
      <span className="dashboard-cell-muted block text-xs">
        Tested {formatPortalDateTime(result.testedAt)}
      </span>
    </p>
  );
}

export function AddressLookupIntegrationsPanel() {
  const integrationsQuery = useAddressLookupIntegrations();
  const createIntegration = useCreateAddressLookupIntegration();
  const deleteIntegration = useDeleteAddressLookupIntegration();
  const setActiveIntegration = useSetActiveAddressLookupIntegration();
  const testIntegration = useTestAddressLookupIntegration();
  const testCredentials = useTestAddressLookupCredentials();

  const [label, setLabel] = useState("");
  const [vendor, setVendor] = useState<AddressLookupVendor>("ideal_postcodes");
  const [apiKey, setApiKey] = useState("");
  const [profileTestResults, setProfileTestResults] = useState<
    Record<string, AddressLookupConnectionTestResult>
  >({});
  const [draftTestResult, setDraftTestResult] = useState<AddressLookupConnectionTestResult | null>(
    null,
  );

  if (integrationsQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (integrationsQuery.isError) {
    return <PageError onRetry={() => void integrationsQuery.refetch()} />;
  }

  const integrations = integrationsQuery.data ?? [];
  const activeIntegration = integrations.find((item) => item.isActive) ?? null;
  const testingProfileId =
    testIntegration.isPending && testIntegration.variables ? testIntegration.variables : null;

  return (
    <div className="space-y-6">
      <Card>
        <p className="dashboard-section-title">Address lookup vendors</p>
        <p className="dashboard-cell-muted">
          Platform-wide address autocomplete credentials. Only super admins can manage these settings.
          When no vendor is active, all address forms use manual entry only.
        </p>
        <p className="dashboard-cell-muted">
          <Link href="/super-admin/settings" className="text-primary underline-offset-2 hover:underline">
            Back to platform settings
          </Link>
        </p>

        <div className="mt-4 rounded-md border border-dashed p-4">
          <p className="text-sm font-medium">Active vendor</p>
          <p className="dashboard-cell-muted">
            {activeIntegration
              ? `${activeIntegration.label} (${addressLookupVendorLabel(activeIntegration.vendor)})`
              : "None — manual address entry across the platform"}
          </p>
          {activeIntegration ? (
            <Button
              type="button"
              className="btn-secondary mt-3"
              disabled={setActiveIntegration.isPending}
              onClick={() => {
                setActiveIntegration.mutate(null, {
                  onSuccess: () => toast.success("Address lookup disabled — manual entry only"),
                  onError: () => toast.error("Unable to deactivate address lookup"),
                });
              }}
            >
              Disable lookup (manual entry)
            </Button>
          ) : null}
        </div>

        {integrations.length > 0 ? (
          <div className="mt-6 space-y-3">
            {integrations.map((integration) => (
              <div key={integration.id} className="rounded-md border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{integration.label}</p>
                    <p className="dashboard-cell-muted text-sm">
                      {addressLookupVendorLabel(integration.vendor)}
                      {integration.apiKeyLast4 ? ` · key ending ${integration.apiKeyLast4}` : ""}
                      {integration.isActive ? " · Active" : ""}
                    </p>
                    <ConnectionTestStatus result={profileTestResults[integration.id]} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      className="btn-secondary"
                      disabled={testIntegration.isPending}
                      onClick={() => {
                        testIntegration.mutate(integration.id, {
                          onSuccess: (result) => {
                            setProfileTestResults((current) => ({
                              ...current,
                              [integration.id]: result,
                            }));
                            if (result.connected) {
                              toast.success(result.message);
                            } else {
                              toast.error(result.message);
                            }
                          },
                          onError: () => toast.error("Unable to test vendor connection"),
                        });
                      }}
                    >
                      {testingProfileId === integration.id ? "Testing..." : "Test connection"}
                    </Button>
                    {!integration.isActive ? (
                      <Button
                        type="button"
                        className="btn-primary"
                        disabled={setActiveIntegration.isPending}
                        onClick={() => {
                          setActiveIntegration.mutate(integration.id, {
                            onSuccess: () => toast.success(`${integration.label} is now active`),
                            onError: () => toast.error("Unable to activate vendor"),
                          });
                        }}
                      >
                        Activate
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      className="btn-secondary"
                      disabled={deleteIntegration.isPending || integration.isActive}
                      onClick={() => {
                        deleteIntegration.mutate(integration.id, {
                          onSuccess: () => {
                            setProfileTestResults((current) => {
                              const next = { ...current };
                              delete next[integration.id];
                              return next;
                            });
                            toast.success("Vendor profile removed");
                          },
                          onError: () =>
                            toast.error(
                              "Unable to delete vendor. Deactivate it first if it is active.",
                            ),
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="dashboard-cell-muted mt-4">No vendor profiles configured yet.</p>
        )}
      </Card>

      <Card>
        <p className="dashboard-section-title">Add vendor profile</p>
        <p className="dashboard-cell-muted">
          Store credentials securely. API keys are encrypted at rest and never shown again after save.
          Use a profile name to distinguish environments (for example production vs staging).
        </p>

        <form
          className="mt-4 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            createIntegration.mutate(
              { label, vendor, apiKey },
              {
                onSuccess: () => {
                  toast.success("Vendor profile saved");
                  setLabel("");
                  setApiKey("");
                  setDraftTestResult(null);
                },
                onError: () => toast.error("Unable to save vendor profile"),
              },
            );
          }}
        >
          <AddressLookupVendorCatalog selectedVendor={vendor} onSelect={setVendor} />

          <div className="dashboard-form-grid">
            <div>
              <Label className="label" htmlFor="integration-label">
                Profile name (internal)
              </Label>
              <Input
                id="integration-label"
                className="input"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="Production Ireland lookup"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="label" htmlFor="integration-api-key">
                API key
              </Label>
              <Input
                id="integration-api-key"
                className="input"
                type="password"
                autoComplete="off"
                value={apiKey}
                onChange={(event) => {
                  setApiKey(event.target.value);
                  setDraftTestResult(null);
                }}
                required
              />
            </div>
          </div>

          <ConnectionTestStatus result={draftTestResult} />

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className="btn-secondary"
              disabled={!apiKey.trim() || testCredentials.isPending}
              onClick={() => {
                testCredentials.mutate(
                  { vendor, apiKey },
                  {
                    onSuccess: (result) => {
                      setDraftTestResult(result);
                      if (result.connected) {
                        toast.success(result.message);
                      } else {
                        toast.error(result.message);
                      }
                    },
                    onError: () => toast.error("Unable to test vendor connection"),
                  },
                );
              }}
            >
              {testCredentials.isPending ? "Testing..." : "Test key before save"}
            </Button>
            <Button type="submit" className="btn-primary" disabled={createIntegration.isPending}>
              {createIntegration.isPending ? "Saving..." : "Save vendor profile"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
