"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useEnterpriseSso, useUpsertSso } from "@/hooks/useEnterprise";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

const SSO_PROVIDERS = [
  { id: "saml", label: "SAML 2.0" },
  { id: "azure_ad", label: "Azure AD" },
  { id: "google_workspace", label: "Google Workspace" },
  { id: "oauth2", label: "OAuth2 (Generic)" },
] as const;

export function SsoConfigPanel() {
  const ssoQuery = useEnterpriseSso();
  const upsertSso = useUpsertSso();
  const [selectedProvider, setSelectedProvider] = useState("azure_ad");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [issuerUrl, setIssuerUrl] = useState("");

  if (ssoQuery.isLoading) return <PageLoading rows={3} />;
  if (ssoQuery.isError) return <PageError onRetry={() => void ssoQuery.refetch()} />;

  const configs = ssoQuery.data ?? [];

  async function handleSave(enabled: boolean) {
    await upsertSso.mutateAsync({
      provider: selectedProvider,
      name: SSO_PROVIDERS.find((p) => p.id === selectedProvider)?.label ?? selectedProvider,
      isEnabled: enabled,
      clientId: clientId || undefined,
      clientSecret: clientSecret || undefined,
      issuerUrl: issuerUrl || undefined,
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {SSO_PROVIDERS.map((provider) => {
          const config = configs.find((entry) => entry.provider === provider.id);
          return (
            <Card key={provider.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{provider.label}</CardTitle>
                  {config?.isEnabled ? <Badge>Enabled</Badge> : <Badge variant="secondary">Disabled</Badge>}
                </div>
              </CardHeader>
              <CardBody className="space-y-3 text-sm text-muted-foreground">
                <p>{config ? "Configured for this clinic." : "Not configured yet."}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  Configure
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure {SSO_PROVIDERS.find((p) => p.id === selectedProvider)?.label}</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input id="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientSecret">Client secret</Label>
            <Input
              id="clientSecret"
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="issuerUrl">Issuer URL</Label>
            <Input id="issuerUrl" value={issuerUrl} onChange={(e) => setIssuerUrl(e.target.value)} />
          </div>
          <div className="flex gap-3 md:col-span-2">
            <Button disabled={upsertSso.isPending} onClick={() => void handleSave(true)}>
              Save &amp; enable
            </Button>
            <Button variant="outline" disabled={upsertSso.isPending} onClick={() => void handleSave(false)}>
              Save disabled
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
