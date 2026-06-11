"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityLogViewer } from "@/components/enterprise/activity-log-viewer";
import { ApiKeyManager } from "@/components/enterprise/api-key-manager";
import { AuditLogViewer } from "@/components/enterprise/audit-log-viewer";
import { RoleManagementPanel } from "@/components/enterprise/role-management-panel";
import { SsoConfigPanel } from "@/components/enterprise/sso-config-panel";
import { WebhookManager } from "@/components/enterprise/webhook-manager";

const TABS = [
  { id: "sso", label: "SSO" },
  { id: "roles", label: "Roles" },
  { id: "audit", label: "Audit logs" },
  { id: "activity", label: "Activity" },
  { id: "api-keys", label: "API keys" },
  { id: "webhooks", label: "Webhooks" },
] as const;

type EnterpriseDashboardProps = {
  globalView?: boolean;
};

export function EnterpriseDashboard({ globalView = false }: EnterpriseDashboardProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("sso");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            className={activeTab === tab.id ? "btn-primary" : "btn-secondary"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "sso" && !globalView ? <SsoConfigPanel /> : null}
      {activeTab === "roles" && !globalView ? <RoleManagementPanel /> : null}
      {activeTab === "audit" ? <AuditLogViewer global={globalView} /> : null}
      {activeTab === "activity" ? <ActivityLogViewer global={globalView} /> : null}
      {activeTab === "api-keys" && !globalView ? <ApiKeyManager /> : null}
      {activeTab === "webhooks" && !globalView ? <WebhookManager /> : null}
      {globalView && (activeTab === "sso" || activeTab === "roles" || activeTab === "api-keys" || activeTab === "webhooks") ? (
        <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
          Tenant-specific configuration is managed from the Clinic Admin enterprise portal.
        </div>
      ) : null}
    </div>
  );
}
