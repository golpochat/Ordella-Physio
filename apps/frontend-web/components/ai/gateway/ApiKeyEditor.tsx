"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GatewayKeyRecord, GatewayScope } from "@/lib/gateway-types";

const SCOPE_OPTIONS: GatewayScope[] = ["inference", "embeddings", "training", "datasets"];

export type ApiKeyEditorProps = {
  keyRecord?: GatewayKeyRecord | null;
  isSaving?: boolean;
  onSave: (payload: { name: string; scopes: GatewayScope[] }) => void;
  createdApiKey?: string | null;
};

export function ApiKeyEditor({ keyRecord, isSaving, onSave, createdApiKey }: ApiKeyEditorProps) {
  const [name, setName] = useState(keyRecord?.name ?? "");
  const [scopes, setScopes] = useState<GatewayScope[]>(keyRecord?.scopes ?? ["inference"]);

  function toggleScope(scope: GatewayScope) {
    setScopes((current) =>
      current.includes(scope) ? current.filter((item) => item !== scope) : [...current, scope],
    );
  }

  return (
    <div className="ai-gateway-editor">
      <div className="form-grid">
        <div>
          <label className="automation-form-section-title" htmlFor="gateway-key-name">Key name</label>
          <Input id="gateway-key-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Production inference key" />
        </div>
        <div>
          <span className="automation-form-section-title">Scopes</span>
          <div className="ai-gateway-scope-list">
            {SCOPE_OPTIONS.map((scope) => (
              <label key={scope} className="ai-gateway-scope-option">
                <input type="checkbox" checked={scopes.includes(scope)} onChange={() => toggleScope(scope)} />
                <span>{scope}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {!keyRecord ? (
        <Button type="button" disabled={!name.trim() || !scopes.length || isSaving} onClick={() => onSave({ name: name.trim(), scopes })}>
          Create API key
        </Button>
      ) : null}
      {createdApiKey ? (
        <div className="ai-gateway-created-key" role="status">
          <p>Copy this key now. It will not be shown again.</p>
          <code>{createdApiKey}</code>
        </div>
      ) : null}
    </div>
  );
}
