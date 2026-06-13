"use client";

import Link from "next/link";
import { useState } from "react";
import { PIIIncidentDetails } from "@/components/ai/security/PIIIncidentDetails";
import { PIIIncidentList } from "@/components/ai/security/PIIIncidentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePiiIncidents } from "@/hooks/useAiSecurity";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";
import type { PIIIncidentRecord } from "@/lib/security-types";

export default function ClinicSecurityPiiPage() {
  const [selected, setSelected] = useState<PIIIncidentRecord | null>(null);
  const { data, isLoading, isError, refetch } = usePiiIncidents();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="PII incidents" subtitle="Review detected PII in AI workloads." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.securityAudit} className="ai-admin-nav-link">Audit</Link>
          <Link href={clinicAiPaths.securityPolicies} className="ai-admin-nav-link">Policies</Link>
          <Link href={clinicAiPaths.securityPii} className="ai-admin-nav-link ai-admin-nav-link-active">PII</Link>
        </div>
        <PIIIncidentList incidents={data ?? []} onSelect={setSelected} />
        <PIIIncidentDetails incident={selected} />
      </ListPage>
    </WithPermission>
  );
}
