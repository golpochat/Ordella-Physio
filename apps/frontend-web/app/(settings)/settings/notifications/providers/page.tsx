"use client";



import Link from "next/link";
import { useState } from "react";

import { toast } from "sonner";

import { ProviderConfigForm } from "@/components/notifications/ProviderConfigForm";

import { TestDeliveryModal } from "@/components/notifications/TestDeliveryModal";

import { Button } from "@/components/ui/button";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

import { PageLoading } from "@/components/patient-portal/page-state";

import {

  useCreateProviderConfig,

  useProviderConfigs,

  useUpdateProviderConfig,

} from "@/hooks/useNotificationProviders";

import { WithAllPermissions } from "@/lib/auth/withPermission";

import type { ProviderConfigRecord } from "@/lib/notification-provider-types";



export default function NotificationProvidersSettingsPage() {

  const configsQuery = useProviderConfigs();

  const createMutation = useCreateProviderConfig();

  const updateMutation = useUpdateProviderConfig();

  const [editing, setEditing] = useState<ProviderConfigRecord | null>(null);

  const [showCreate, setShowCreate] = useState(false);

  const [testOpen, setTestOpen] = useState(false);



  const configs = configsQuery.data?.data ?? [];



  async function handleCreate(values: {

    channel: ProviderConfigRecord["channel"];

    provider: ProviderConfigRecord["provider"];

    credentials: Record<string, unknown>;

    priority: number;

    isActive: boolean;

  }) {

    try {

      const result = await createMutation.mutateAsync(values);

      toast.success(result.message ?? "Provider added.");

      setShowCreate(false);

    } catch (error) {

      toast.error(error instanceof Error ? error.message : "Unable to create provider.");

    }

  }



  async function handleUpdate(values: {

    channel: ProviderConfigRecord["channel"];

    provider: ProviderConfigRecord["provider"];

    credentials: Record<string, unknown>;

    priority: number;

    isActive: boolean;

  }) {

    if (!editing) {

      return;

    }



    try {

      const result = await updateMutation.mutateAsync({

        id: editing.id,

        input: values,

      });

      toast.success(result.message ?? "Provider updated.");

      setEditing(null);

    } catch (error) {

      toast.error(error instanceof Error ? error.message : "Unable to update provider.");

    }

  }



  async function toggleActive(config: ProviderConfigRecord) {

    try {

      await updateMutation.mutateAsync({

        id: config.id,

        input: { isActive: !config.isActive },

      });

      toast.success(config.isActive ? "Provider deactivated." : "Provider activated.");

    } catch (error) {

      toast.error(error instanceof Error ? error.message : "Unable to update provider.");

    }

  }



  return (

    <WithAllPermissions permissions={["notification.providers.view"]}>

      <div className="space-y-6">

        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <h1 className="text-2xl font-semibold">Notification providers</h1>

            <p className="text-muted-foreground">

              Configure tenant delivery providers, priorities, and credentials.

            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Button asChild variant="outline">
              <Link href="/settings/notifications/logs">Delivery logs</Link>
            </Button>
            <WithAllPermissions permissions={["notification.analytics.view"]}>
              <Button asChild variant="outline">
                <Link href="/settings/notifications/analytics">Analytics</Link>
              </Button>
            </WithAllPermissions>

            <WithAllPermissions permissions={["notification.send"]}>

              <Button type="button" variant="outline" onClick={() => setTestOpen(true)}>

                Send test message

              </Button>

            </WithAllPermissions>

            <WithAllPermissions permissions={["notification.providers.manage"]}>

              <Button type="button" onClick={() => setShowCreate((value) => !value)}>

                {showCreate ? "Close form" : "Add provider"}

              </Button>

            </WithAllPermissions>

          </div>

        </div>



        {showCreate ? (

          <Card>

            <CardHeader>

              <CardTitle>Add provider configuration</CardTitle>

            </CardHeader>

            <CardBody>

              <ProviderConfigForm

                isSubmitting={createMutation.isPending}

                onSubmit={handleCreate}

                onCancel={() => setShowCreate(false)}

              />

            </CardBody>

          </Card>

        ) : null}



        {editing ? (

          <Card>

            <CardHeader>

              <CardTitle>Edit provider — {editing.channel}</CardTitle>

            </CardHeader>

            <CardBody>

              <ProviderConfigForm

                initial={editing}

                isSubmitting={updateMutation.isPending}

                onSubmit={handleUpdate}

                onCancel={() => setEditing(null)}

              />

            </CardBody>

          </Card>

        ) : null}



        <Card>

          <CardHeader>

            <CardTitle>Configured providers</CardTitle>

          </CardHeader>

          <CardBody>

            {configsQuery.isLoading ? <PageLoading rows={4} /> : null}



            {!configsQuery.isLoading && configs.length === 0 ? (

              <p className="text-sm text-muted-foreground">No providers configured yet.</p>

            ) : null}



            <div className="space-y-3">

              {configs.map((config) => (

                <article

                  key={config.id}

                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-4"

                >

                  <div className="space-y-1">

                    <p className="font-medium">

                      {config.channel} · {config.provider}

                    </p>

                    <p className="text-sm text-muted-foreground">

                      Priority {config.priority} · {config.isActive ? "Active" : "Inactive"}

                    </p>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <WithAllPermissions permissions={["notification.providers.manage"]}>

                      <Button type="button" variant="outline" size="sm" onClick={() => setEditing(config)}>

                        Edit

                      </Button>

                      <Button

                        type="button"

                        variant="outline"

                        size="sm"

                        onClick={() => void toggleActive(config)}

                        disabled={updateMutation.isPending}

                      >

                        {config.isActive ? "Deactivate" : "Activate"}

                      </Button>

                    </WithAllPermissions>

                  </div>

                </article>

              ))}

            </div>

          </CardBody>

        </Card>



        <TestDeliveryModal open={testOpen} onOpenChange={setTestOpen} />

      </div>

    </WithAllPermissions>

  );

}


