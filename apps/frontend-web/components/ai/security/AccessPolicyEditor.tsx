"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ROLE_OPTIONS = ["admin", "analyst", "developer", "api"];

export type AccessPolicyEditorProps = {
  isSaving?: boolean;
  onSave: (payload: { modelId: string; allowedRoles: string[]; allowedUsers?: string[] }) => void;
};

export function AccessPolicyEditor({ isSaving, onSave }: AccessPolicyEditorProps) {
  const [modelId, setModelId] = useState("");
  const [roles, setRoles] = useState<string[]>(["admin", "developer"]);
  const [users, setUsers] = useState("");

  function toggleRole(role: string) {
    setRoles((current) => (current.includes(role) ? current.filter((r) => r !== role) : [...current, role]));
  }

  return (
    <div className="ai-gateway-editor">
      <div className="form-grid">
        <div>
          <label className="automation-form-section-title" htmlFor="policy-model">Model ID</label>
          <Input id="policy-model" value={modelId} onChange={(e) => setModelId(e.target.value)} placeholder="gpt-4o" />
        </div>
        <div>
          <span className="automation-form-section-title">Allowed roles</span>
          <div className="ai-gateway-scope-list">
            {ROLE_OPTIONS.map((role) => (
              <label key={role} className="ai-gateway-scope-option">
                <input type="checkbox" checked={roles.includes(role)} onChange={() => toggleRole(role)} />
                <span>{role}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="policy-users">Allowed users (comma-separated)</label>
          <Input id="policy-users" value={users} onChange={(e) => setUsers(e.target.value)} placeholder="user-id-1, user-id-2" />
        </div>
      </div>
      <Button
        type="button"
        disabled={!modelId.trim() || !roles.length || isSaving}
        onClick={() =>
          onSave({
            modelId: modelId.trim(),
            allowedRoles: roles,
            allowedUsers: users ? users.split(",").map((u) => u.trim()).filter(Boolean) : undefined,
          })
        }
      >
        Save policy
      </Button>
    </div>
  );
}
