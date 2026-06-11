"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/dashboard/Badge";
import { Card } from "@/components/dashboard/Card";
import { Row } from "@/components/dashboard/Row";
import { Input, Label } from "@/components/ui/input";
import { DataTable } from "@/components/super-admin/layout/DataTable";
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
    <>
      <Card>
        <p className="dashboard-section-title">Create API key</p>
        <div className="dashboard-form-grid">
          <div>
            <Label className="label" htmlFor="keyName">
              Name
            </Label>
            <Input
              id="keyName"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label className="label" htmlFor="keyScopes">
              Scopes
            </Label>
            <Input
              id="keyScopes"
              className="input"
              value={scopes}
              onChange={(e) => setScopes(e.target.value)}
            />
          </div>
          <Button
            className="btn-primary"
            disabled={createKey.isPending || !name}
            onClick={async () => {
              const result = await createKey.mutateAsync({
                name,
                scopes: scopes
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              });
              setCreatedRawKey(result.rawKey);
              setName("");
            }}
          >
            Generate key
          </Button>
          {createdRawKey ? (
            <p className="dashboard-cell-muted">
              Copy this key now — it will not be shown again: <code>{createdRawKey}</code>
            </p>
          ) : null}
        </div>
      </Card>

      <DataTable
        columns={["Name", "Prefix", "Scopes", "Created", ""]}
        grid="default"
        emptyMessage="No API keys created yet."
        isEmpty={keys.length === 0}
      >
        {keys.map((key) => {
          const keyName = key?.name ?? "Unnamed key";
          const prefix = key?.keyPrefix ?? "N/A";
          const scopeList = Array.isArray(key?.scopes) ? (key.scopes as string[]) : [];
          const createdAt = key?.createdAt ? formatPatientDateTime(key.createdAt) : "N/A";

          return (
            <Row key={key.id}>
              <p className="dashboard-cell-primary">{keyName}</p>
              <p className="dashboard-cell-muted">{prefix}…</p>
              <div className="dashboard-actions">
                {scopeList.length > 0 ? (
                  scopeList.map((scope) => (
                    <Badge key={scope} variant="muted">
                      {scope}
                    </Badge>
                  ))
                ) : (
                  <span className="dashboard-cell-muted">N/A</span>
                )}
              </div>
              <p className="dashboard-cell-muted">{createdAt}</p>
              <Button
                className="btn-secondary"
                size="sm"
                disabled={revokeKey.isPending}
                onClick={() => void revokeKey.mutateAsync(key.id)}
              >
                Revoke
              </Button>
            </Row>
          );
        })}
      </DataTable>
    </>
  );
}
