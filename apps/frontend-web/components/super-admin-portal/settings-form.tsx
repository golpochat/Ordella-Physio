"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePlatformSettings,
  useUpdatePlatformProfile,
  useUpdatePlatformSettings,
} from "@/hooks/useSuperAdminPortal";

export function PlatformSettingsForm() {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform settings</CardTitle>
          <CardDescription>Configure global platform defaults.</CardDescription>
        </CardHeader>
        <CardBody>
          <form
            className="space-y-4"
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform name</Label>
                <Input
                  id="platformName"
                  value={platformName}
                  onChange={(event) => setPlatformName(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={supportEmail}
                  onChange={(event) => setSupportEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultTimezone">Default timezone</Label>
                <Input
                  id="defaultTimezone"
                  value={defaultTimezone}
                  onChange={(event) => setDefaultTimezone(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Default currency</Label>
                <Input
                  id="defaultCurrency"
                  value={defaultCurrency}
                  onChange={(event) => setDefaultCurrency(event.target.value)}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(event) => setMaintenanceMode(event.target.checked)}
              />
              Maintenance mode
            </label>
            <Button type="submit" disabled={updateSettings.isPending}>
              {updateSettings.isPending ? "Saving..." : "Save platform settings"}
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Super admin profile</CardTitle>
          <CardDescription>Update your account via PATCH /auth/me.</CardDescription>
        </CardHeader>
        <CardBody>
          <Button
            variant="outline"
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
        </CardBody>
      </Card>
    </div>
  );
}
