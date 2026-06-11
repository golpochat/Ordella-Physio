"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { Input, Label } from "@/components/ui/input";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePlatformSettings,
  useUpdatePlatformProfile,
  useUpdatePlatformSettings,
} from "@/hooks/useSuperAdminPortal";

export function SettingsForm() {
  const settingsQuery = usePlatformSettings();
  const updateSettings = useUpdatePlatformSettings();
  const updateProfile = useUpdatePlatformProfile();
  const [platformName, setPlatformName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [defaultTimezone, setDefaultTimezone] = useState("UTC");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    if (settingsQuery.data) {
      setPlatformName(settingsQuery.data.platformName);
      setSupportEmail(settingsQuery.data.supportEmail);
      setDefaultTimezone(settingsQuery.data.defaultTimezone);
      setDefaultCurrency(settingsQuery.data.defaultCurrency);
      setMaintenanceMode(settingsQuery.data.maintenanceMode);
    }
  }, [settingsQuery.data]);

  if (settingsQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (settingsQuery.isError) {
    return <PageError onRetry={() => void settingsQuery.refetch()} />;
  }

  return (
    <>
      <Card>
        <p className="dashboard-section-title">Platform settings</p>
        <p className="dashboard-cell-muted">Configure global platform defaults.</p>
        <form
          className="dashboard-form-grid"
          onSubmit={(event) => {
            event.preventDefault();
            updateSettings.mutate(
              {
                platformName,
                supportEmail,
                defaultTimezone,
                defaultCurrency,
                maintenanceMode,
              },
              {
                onSuccess: () => toast.success("Platform settings saved"),
                onError: () =>
                  toast.error(
                    "Unable to save settings. The settings API may not be available yet.",
                  ),
              },
            );
          }}
        >
          <div>
            <Label className="label" htmlFor="platformName">
              Platform name
            </Label>
            <Input
              id="platformName"
              className="input"
              value={platformName}
              onChange={(event) => setPlatformName(event.target.value)}
            />
          </div>
          <div>
            <Label className="label" htmlFor="supportEmail">
              Support email
            </Label>
            <Input
              id="supportEmail"
              className="input"
              type="email"
              value={supportEmail}
              onChange={(event) => setSupportEmail(event.target.value)}
            />
          </div>
          <div>
            <Label className="label" htmlFor="defaultTimezone">
              Default timezone
            </Label>
            <Input
              id="defaultTimezone"
              className="input"
              value={defaultTimezone}
              onChange={(event) => setDefaultTimezone(event.target.value)}
            />
          </div>
          <div>
            <Label className="label" htmlFor="defaultCurrency">
              Default currency
            </Label>
            <Input
              id="defaultCurrency"
              className="input"
              value={defaultCurrency}
              onChange={(event) => setDefaultCurrency(event.target.value)}
            />
          </div>
          <label className="dashboard-cell-muted">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(event) => setMaintenanceMode(event.target.checked)}
            />{" "}
            Maintenance mode
          </label>
          <Button type="submit" className="btn-primary" disabled={updateSettings.isPending}>
            {updateSettings.isPending ? "Saving..." : "Save platform settings"}
          </Button>
        </form>
      </Card>

      <Card>
        <p className="dashboard-section-title">Super admin profile</p>
        <p className="dashboard-cell-muted">Update your account via PATCH /auth/me.</p>
        <Button
          className="btn-secondary"
          onClick={() => {
            updateProfile.mutate(
              {},
              {
                onSuccess: () => toast.success("Profile synced"),
                onError: () =>
                  toast.error("Unable to update profile. PATCH /me may not be available yet."),
              },
            );
          }}
        >
          Sync profile
        </Button>
      </Card>
    </>
  );
}
