"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useEnterpriseSso, useUpsertSso } from "@/hooks/useEnterprise";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

const PROTOCOL_OPTIONS = [
  { id: "saml", label: "SAML 2.0", protocol: "SAML" as const },
  { id: "oidc", label: "OpenID Connect", protocol: "OIDC" as const },
];

export function SsoConfigPanel() {
  const ssoQuery = useEnterpriseSso();
  const upsertSso = useUpsertSso();
  const [selectedProvider, setSelectedProvider] = useState("oidc");
  const [metadataUrl, setMetadataUrl] = useState("");
  const [entityId, setEntityId] = useState("");
  const [acsUrl, setAcsUrl] = useState("");
  const [certificate, setCertificate] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [issuerUrl, setIssuerUrl] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [logoutUrl, setLogoutUrl] = useState("");
  const [jwksUrl, setJwksUrl] = useState("");
  const [roleMappingsJson, setRoleMappingsJson] = useState("{\n  \"IdPGroup:Therapists\": \"THERAPIST\"\n}");

  const selected = useMemo(
    () => PROTOCOL_OPTIONS.find((entry) => entry.id === selectedProvider) ?? PROTOCOL_OPTIONS[0],
    [selectedProvider],
  );

  if (ssoQuery.isLoading) return <PageLoading rows={3} />;
  if (ssoQuery.isError) return <PageError onRetry={() => void ssoQuery.refetch()} />;

  const configs = ssoQuery.data ?? [];
  const activeConfig = configs[0];

  async function handleSave(enabled: boolean) {
    let attributeMap: Record<string, string> | undefined;
    try {
      attributeMap = roleMappingsJson.trim() ? (JSON.parse(roleMappingsJson) as Record<string, string>) : undefined;
    } catch {
      throw new Error("Role mappings must be valid JSON.");
    }

    await upsertSso.mutateAsync({
      provider: selected.id,
      name: selected.label,
      isEnabled: enabled,
      metadataUrl: metadataUrl || undefined,
      entityId: entityId || undefined,
      ssoUrl: acsUrl || undefined,
      certificate: certificate || undefined,
      clientId: clientId || undefined,
      clientSecret: clientSecret || undefined,
      issuerUrl: issuerUrl || undefined,
      redirectUri: redirectUri || undefined,
      logoutUrl: logoutUrl || undefined,
      jwksUrl: jwksUrl || undefined,
      attributeMap,
      scopes: ["openid", "profile", "email"],
    });

    if (logoutUrl) {
      // Stored via organization SSO API on next org-admin iteration; issuerUrl carries OIDC discovery.
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {PROTOCOL_OPTIONS.map((provider) => {
          const config = configs.find((entry) => entry.provider === provider.id);
          return (
            <Card key={provider.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{provider.label}</CardTitle>
                  {config?.isEnabled || (activeConfig?.provider === provider.id && activeConfig.isEnabled) ? (
                    <Badge>Enabled</Badge>
                  ) : (
                    <Badge variant="secondary">Disabled</Badge>
                  )}
                </div>
              </CardHeader>
              <CardBody className="space-y-3 text-sm text-muted-foreground">
                <p>{config || activeConfig ? "Configured for this organization." : "Not configured yet."}</p>
                <Button variant="outline" size="sm" onClick={() => setSelectedProvider(provider.id)}>
                  Configure
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure {selected.label}</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="metadataUrl">Metadata URL</Label>
            <Input id="metadataUrl" value={metadataUrl} onChange={(e) => setMetadataUrl(e.target.value)} />
          </div>
          {selected.protocol === "SAML" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="entityId">Entity ID</Label>
                <Input id="entityId" value={entityId} onChange={(e) => setEntityId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acsUrl">ACS URL</Label>
                <Input id="acsUrl" value={acsUrl} onChange={(e) => setAcsUrl(e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="certificate">IdP certificate (PEM)</Label>
                <Input id="certificate" value={certificate} onChange={(e) => setCertificate(e.target.value)} />
              </div>
            </>
          ) : (
            <>
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
              <div className="space-y-2">
                <Label htmlFor="redirectUri">Redirect URI</Label>
                <Input id="redirectUri" value={redirectUri} onChange={(e) => setRedirectUri(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jwksUrl">JWKS URL (optional)</Label>
                <Input id="jwksUrl" value={jwksUrl} onChange={(e) => setJwksUrl(e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="logoutUrl">Logout URL (optional)</Label>
                <Input id="logoutUrl" value={logoutUrl} onChange={(e) => setLogoutUrl(e.target.value)} />
              </div>
            </>
          )}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="roleMappings">Role mappings (JSON)</Label>
            <textarea
              id="roleMappings"
              className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={roleMappingsJson}
              onChange={(e) => setRoleMappingsJson(e.target.value)}
            />
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
