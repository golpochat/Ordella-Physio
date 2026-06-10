"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateApiKey, useEnterpriseApiKeys, useRevokeApiKey } from "@/hooks/useEnterprise";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

export function ApiKeyManager() {
  const keysQuery = useEnterpriseApiKeys();
  const createKey = useCreateApiKey();
  const revokeKey = useRevokeApiKey();
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState("patient.read,appointment.read");
  const [createdRawKey, setCreatedRawKey] = useState<string | null>(null);

  if (keysQuery.isLoading) return <PageLoading rows={4} />;
  if (keysQuery.isError) return <PageError onRetry={() => void keysQuery.refetch()} />;

  const keys = keysQuery.data ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create API key</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="keyName">Name</Label>
            <Input id="keyName" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyScopes">Scopes</Label>
            <Input id="keyScopes" value={scopes} onChange={(e) => setScopes(e.target.value)} />
          </div>
          <Button
            disabled={createKey.isPending || !name}
            onClick={async () => {
              const result = await createKey.mutateAsync({
                name,
                scopes: scopes.split(",").map((s) => s.trim()).filter(Boolean),
              });
              setCreatedRawKey(result.rawKey);
              setName("");
            }}
          >
            Generate key
          </Button>
          {createdRawKey ? (
            <p className="text-sm text-muted-foreground md:col-span-2">
              Copy this key now — it will not be shown again: <code>{createdRawKey}</code>
            </p>
          ) : null}
        </CardBody>
      </Card>

      <div className="space-y-3">
        {keys.map((key) => (
          <Card key={key.id}>
            <CardBody className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div>
                <p className="font-medium">{key.name}</p>
                <p className="text-xs text-muted-foreground">
                  {key.keyPrefix}… · Created {formatPatientDateTime(key.createdAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(key.scopes as string[]).map((scope) => (
                  <Badge key={scope} variant="outline">
                    {scope}
                  </Badge>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={revokeKey.isPending}
                  onClick={() => void revokeKey.mutateAsync(key.id)}
                >
                  Revoke
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
