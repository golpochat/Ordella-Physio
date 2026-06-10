"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateWebhook, useEnterpriseWebhooks } from "@/hooks/useEnterprise";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

const EVENT_TYPES = [
  "appointment.created",
  "appointment.updated",
  "note.created",
  "invoice.generated",
  "message.created",
  "user.created",
];

export function WebhookManager() {
  const webhooksQuery = useEnterpriseWebhooks();
  const createWebhook = useCreateWebhook();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [eventTypes, setEventTypes] = useState("appointment.created,note.created");

  if (webhooksQuery.isLoading) return <PageLoading rows={4} />;
  if (webhooksQuery.isError) return <PageError onRetry={() => void webhooksQuery.refetch()} />;

  const webhooks = webhooksQuery.data ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add webhook</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="webhookName">Name</Label>
            <Input id="webhookName" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">URL</Label>
            <Input id="webhookUrl" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="webhookSecret">Signing secret</Label>
            <Input
              id="webhookSecret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="webhookEvents">Event types (comma-separated)</Label>
            <Input
              id="webhookEvents"
              value={eventTypes}
              onChange={(e) => setEventTypes(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Supported: {EVENT_TYPES.join(", ")}</p>
          </div>
          <Button
            disabled={createWebhook.isPending || !name || !url || !secret}
            onClick={() =>
              void createWebhook.mutateAsync({
                name,
                url,
                secret,
                eventTypes: eventTypes.split(",").map((e) => e.trim()).filter(Boolean),
              })
            }
          >
            Create webhook
          </Button>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {webhooks.map((webhook) => (
          <Card key={webhook.id}>
            <CardBody className="space-y-2 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{webhook.name}</p>
                {webhook.isEnabled ? <Badge>Active</Badge> : <Badge variant="secondary">Disabled</Badge>}
              </div>
              <p className="text-muted-foreground">{webhook.url}</p>
              <div className="flex flex-wrap gap-2">
                {(webhook.eventTypes as string[]).map((eventType) => (
                  <Badge key={eventType} variant="outline">
                    {eventType}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
