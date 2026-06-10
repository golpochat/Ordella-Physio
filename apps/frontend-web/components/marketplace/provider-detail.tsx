"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { IntegrationStatusBadge } from "@/components/marketplace/integration-status-badge";
import { UsageLogsTable } from "@/components/marketplace/usage-logs-table";
import {
  useConnectIntegration,
  useDisconnectIntegration,
} from "@/hooks/useMarketplace";
import type { IntegrationProvider, TenantIntegration } from "@/lib/marketplace-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

type ProviderDetailProps = {
  provider: IntegrationProvider;
  integration?: TenantIntegration;
  allowConnect?: boolean;
};

export function ProviderDetail({
  provider,
  integration,
  allowConnect = true,
}: ProviderDetailProps) {
  const connect = useConnectIntegration();
  const disconnect = useDisconnectIntegration();
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isConnected = integration?.status === "connected";

  async function handleConnect() {
    setError(null);

    try {
      const result = await connect.mutateAsync({
        providerId: provider.id,
        ...(provider.authType === "apiKey"
          ? { apiKey, apiSecret: apiSecret || undefined }
          : {}),
      });

      if (result.type === "oauth" && result.authUrl) {
        window.location.href = result.authUrl;
        return;
      }
    } catch (connectError) {
      setError(
        connectError instanceof Error ? connectError.message : "Failed to connect integration",
      );
    }
  }

  async function handleDisconnect() {
    if (!integration) return;
    setError(null);

    try {
      await disconnect.mutateAsync(integration.id);
    } catch (disconnectError) {
      setError(
        disconnectError instanceof Error
          ? disconnectError.message
          : "Failed to disconnect integration",
      );
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <CardTitle>{provider.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{provider.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{provider.category}</Badge>
              <Badge variant="outline">{provider.authType}</Badge>
              {integration ? <IntegrationStatusBadge status={integration.status} /> : null}
            </div>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {integration ? (
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Connected since</dt>
                <dd className="font-medium">{formatPatientDateTime(integration.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Last updated</dt>
                <dd className="font-medium">{formatPatientDateTime(integration.updatedAt)}</dd>
              </div>
              {integration.apiKeyMasked ? (
                <div>
                  <dt className="text-muted-foreground">API key</dt>
                  <dd className="font-medium">{integration.apiKeyMasked}</dd>
                </div>
              ) : null}
              {integration.expiresAt ? (
                <div>
                  <dt className="text-muted-foreground">Token expires</dt>
                  <dd className="font-medium">{formatPatientDateTime(integration.expiresAt)}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">
              This integration is not connected for your clinic yet.
            </p>
          )}

          {allowConnect && provider.authType === "apiKey" && !isConnected ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API key</Label>
                <Input
                  id="apiKey"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  placeholder="Enter provider API key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiSecret">API secret (optional)</Label>
                <Input
                  id="apiSecret"
                  type="password"
                  value={apiSecret}
                  onChange={(event) => setApiSecret(event.target.value)}
                  placeholder="Enter provider secret if required"
                />
              </div>
            </div>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          {allowConnect ? (
            <div className="flex flex-wrap gap-3">
              {!isConnected ? (
                <Button
                  disabled={connect.isPending || (provider.authType === "apiKey" && !apiKey)}
                  onClick={() => void handleConnect()}
                >
                  {connect.isPending ? "Connecting..." : "Connect"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled={disconnect.isPending}
                  onClick={() => void handleDisconnect()}
                >
                  {disconnect.isPending ? "Disconnecting..." : "Disconnect"}
                </Button>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Clinic admins connect integrations from the Clinic Admin marketplace.
            </p>
          )}
        </CardBody>
      </Card>

      {integration ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Usage logs</h2>
          <UsageLogsTable integrationId={integration.id} />
        </section>
      ) : null}
    </div>
  );
}
