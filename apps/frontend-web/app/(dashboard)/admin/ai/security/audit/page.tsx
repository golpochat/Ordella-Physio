import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { AuditLogFilters } from "@/components/ai/security/AuditLogFilters";
import { AuditLogTable } from "@/components/ai/security/AuditLogTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useAuditLogs } from "@/hooks/useAiSecurity";
import { useAiApi } from "@/hooks/useAI";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiSecuritySectionNav } from "@/lib/ai-admin-section-nav";
import type { AuditAction } from "@/lib/security-types";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminSecurityAuditPage() {
  const [filters, setFilters] = useState<{ action?: AuditAction; modelId?: string; piiDetected?: boolean }>({});
  const { data, isLoading, isError, refetch } = useAuditLogs(filters);
  const aiApi = useAiApi();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage title="AI audit logs" subtitle="SOC2/ISO-aligned audit trail for all AI actions." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
          <AiAdminSectionNav items={aiSecuritySectionNav(adminAiPaths)} />
          <AuditLogFilters onFilter={setFilters} />
          <div className="ai-security-actions">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                if (!aiApi) return;
                void aiApi.exportAuditLogs().then((result) => {
                  const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = "ai-audit-export.json";
                  anchor.click();
                  URL.revokeObjectURL(url);
                  toast.success(`Exported ${result.count} events.`);
                });
              }}
            >
              Export audit logs
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                if (!aiApi) return;
                void aiApi.exportComplianceReport().then((result) => {
                  const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = "ai-compliance-export.json";
                  anchor.click();
                  URL.revokeObjectURL(url);
                  toast.success("Compliance report exported.");
                });
              }}
            >
              Export compliance report
            </Button>
          </div>
          <AuditLogTable logs={data ?? []} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
