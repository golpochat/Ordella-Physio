"use client";

import Link from "next/link";
import { useState } from "react";
import { AuditLogFilters } from "@/components/ai/security/AuditLogFilters";
import { AuditLogTable } from "@/components/ai/security/AuditLogTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAuditLogs } from "@/hooks/useAiSecurity";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import type { AuditAction } from "@/lib/security-types";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicSecurityAuditPage() {
  const [filters, setFilters] = useState<{ action?: AuditAction; modelId?: string; piiDetected?: boolean }>({});
  const { data, isLoading, isError, refetch } = useAuditLogs(filters);

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI audit logs" subtitle="Review AI action history." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.securityAudit} className="ai-admin-nav-link ai-admin-nav-link-active">Audit</Link>
          <Link href={clinicAiPaths.securityPolicies} className="ai-admin-nav-link">Policies</Link>
          <Link href={clinicAiPaths.securityPii} className="ai-admin-nav-link">PII</Link>
        </div>
        <AuditLogFilters onFilter={setFilters} />
        <AuditLogTable logs={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
