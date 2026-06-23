"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { useState } from "react";
import { AuditLogFilters } from "@/components/ai/security/AuditLogFilters";
import { AuditLogTable } from "@/components/ai/security/AuditLogTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAuditLogs } from "@/hooks/useAiSecurity";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiSecuritySectionNav } from "@/lib/ai-admin-section-nav";
import type { AuditAction } from "@/lib/security-types";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicSecurityAuditPage() {
  const [filters, setFilters] = useState<{ action?: AuditAction; modelId?: string; piiDetected?: boolean }>({});
  const { data, isLoading, isError, refetch } = useAuditLogs(filters);

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI audit logs" subtitle="Review AI action history." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
        <AiAdminSectionNav items={aiSecuritySectionNav(clinicAiPaths)} />
        <AuditLogFilters onFilter={setFilters} />
        <AuditLogTable logs={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
